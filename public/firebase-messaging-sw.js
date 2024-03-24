// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyCZJryhAlbPjd8fuqUuy6aacVpiQ-RWjAg",
    authDomain: "before-thunder.firebaseapp.com",
    projectId: "before-thunder",
    storageBucket: "before-thunder.appspot.com",
    messagingSenderId: "944534823938",
    appId: "1:944534823938:web:ec0b9243333277c0bcf31b",
    measurementId: "G-FW9C0QQVPQ"
};
  
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './logo.png',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});