import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';
import * as crypt from 'crypto';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const initFirebaseApp = () => {
  if (!admin.apps.length) {
    admin.initializeApp();
  }
};

export const sendContact = functions.https.onRequest(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(204);
    return;
  }

  if (req.method === 'POST') {
    initFirebaseApp();
    const firestore = admin.firestore();

    const data = {
      name: req.body.name,
      email: req.body.email,
      content: req.body.content,
    };

    if (Object.values(data).some((v) => v === null || v === undefined)) {
      res.status(400);
      res.send({ message: 'Bad request' });
      res.end();
      return;
    }

    const collectionRef = firestore.collection('site_contact');

    try {
      await collectionRef.add({
        ...data,
        ipAddress: req.ip,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
    } catch (e) {
      console.error(e);
      res.status(500);
      res.send({ message: 'Internal server error' });
      res.end();
      return;
    }

    res.sendStatus(204);
    res.end();
    return;
  }

  res.sendStatus(405);
  res.end();
  return;
});

export const newContactHandler = functions.firestore
  .document('site_contact/{contactId}')
  .onCreate((snapshot, context) => {
    const webhookUrl = functions.config().slack.webhook as unknown;
    if (typeof webhookUrl !== 'string') {
      throw new Error('Could not get webhook url.');
    }

    const data = snapshot.data();
    const formattedContent = ('>' + data.content).split('\n').join('\n>');
    const timestamp = data.timestamp.seconds;

    return axios.post(webhookUrl, {
      text: '新しい問合せがあります',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '<!channel>\n\n:new: 新しい問合せがあります。',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: formattedContent,
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*:name_badge: Name:*\n${data.name}`,
            },
            {
              type: 'mrkdwn',
              text: `*:e-mail: Email Address:*\n${data.email}`,
            },
            {
              type: 'mrkdwn',
              text: `*:earth_asia: IP Address:*\n${data.ipAddress}`,
            },
            {
              type: 'mrkdwn',
              text: `*:clock1: Timestamp:*\n<!date^${timestamp}^{date_num} {time_secs}|${timestamp}>`,
            },
          ],
        },
      ],
    });
  });

export const checkUpdateRssFeeds = functions.pubsub
  .schedule('every 15 minutes')
  .onRun(async () => {
    initFirebaseApp();

    const md5 = (str: string) => {
      const md5 = crypt.createHash('md5');
      return md5.update(str).digest('hex');
    };

    const firestore = admin.firestore();
    const batch = firestore.batch();

    const feeds = [
      { media: 'blog', url: 'https://yurufuwa-tech.hatenablog.com/rss' },
      { media: 'note', url: 'https://note.com/uutarou/rss' },
      { media: 'qiita', url: 'https://qiita.com/mogamin3/feed.atom' },
    ];

    const results = await Promise.all(
      feeds.map((feed) =>
        axios
          .get<string>(feed.url)
          .then((res) => ({ media: feed.media, data: res.data }))
      )
    );

    const collectionRef = firestore.collection('site_feed_hash');

    results.forEach((result) => {
      // TODO: noteのRSSが毎回生成日時を突っ込んでくるのでいったん雑に取り除く処理を入れた。なんかいい解決策を考えることにする。
      batch.update(collectionRef.doc(result.media), {
        hash: md5(
          result.data.replace(/<lastBuildDate>(.+)<\/lastBuildDate>/, '')
        ),
      });
    });

    await batch.commit();
  });

export const kickDeployHook = functions.firestore
  .document('site_feed_hash/{media}')
  .onUpdate(async () => {
    const deployHookUrl = functions.config().vercel.deployhook as unknown;
    const webhookUrl = functions.config().slack.webhook as unknown;

    if (typeof deployHookUrl !== 'string' || typeof webhookUrl !== 'string') {
      throw new Error('invalid config');
    }

    await axios.post(deployHookUrl);
    await axios.post(webhookUrl, { text: ':rocket:デプロイが開始されました' });
  });
