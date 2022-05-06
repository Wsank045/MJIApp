const functions = require("firebase-functions");

const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();
require("dotenv").config();

const {SENDER_EMAIL, SENDER_PASSWORD} = process.env;

exports.sendEmailNotification = functions.firestore.document("AddingAgent/{ID}")
    .onCreate((snap, ctx) => {
      const data = snap.data();

      const authData = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: SENDER_EMAIL,
          pass: SENDER_PASSWORD,
        },
      });
      const id = data.addingId;

      authData.sendMail({
        from: "mjiintegration@gmail.com",
        to: `${data.email}`,
        subject: "Intégration du ministère des jeunes d'Impact",
        text: "Vous avez été ajouté à la liste des agents" +
              "d'intégration du ministère des jeunes d'Impact" +
              "de Gatineau Ottawa. Veuillez créer" +
              "un compte dans l'application MJIApp." +
              "\nVoici votre id de confirmation : " + id,
      }).then(console.log("Email sent successfully"))
          .catch((err) => console.log(err)).catch((e) => console.log(e));
    });


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
