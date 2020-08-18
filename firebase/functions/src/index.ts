import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const sendContact = functions.https.onRequest(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(204);
    return;
  }

  if (req.method === 'POST') {
    admin.initializeApp();
    const firestore = admin.firestore();

    const data = {
      name: req.body.name,
      email: req.body.email,
      content: req.body.content
    };

    if (Object.values(data).some(v => v === null || v === undefined)) {
      res.status(400);
      res.send({message: 'Bad request'});
      res.end();
      return;
    }

    const collectionRef = firestore.collection('site_contact')

    try {
      await collectionRef.add({
        ...data,
        ipAddress: req.ip,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });
    } catch (e) {
      console.error(e);
      res.status(500);
      res.send({message: 'Internal server error'});
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

export const newContactHandler = functions.firestore.document('site_contact/{contactId}').onCreate((snapshot, context) => {
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
        type: "section",
        text: {
          type: "mrkdwn",
          text: "<!channel>\n\n:new: 新しい問合せがあります。"
        }
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: formattedContent
        }
      },
      {
        type: "divider"
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*:name_badge: Name:*\n${data.name}`
          },
          {
            type: "mrkdwn",
            text: `*:e-mail: Email Address:*\n${data.email}`
          },
          {
            type: "mrkdwn",
            text: `*:earth_asia: IP Address:*\n${data.ipAddress}`
          },
          {
            type: "mrkdwn",
            text: `*:clock1: Timestamp:*\n<!date^${timestamp}^{date_num} {time_secs}|${timestamp}>`
          }
        ]
      }
    ]
  })
});
