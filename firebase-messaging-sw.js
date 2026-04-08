// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/12.11.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyCePnTRSWFX-R0n4iIMLHIr0PZjk-WcHco",
  authDomain: "msesalert-b972d.firebaseapp.com",
  databaseURL: "https://msesalert-b972d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "msesalert-b972d",
  storageBucket: "msesalert-b972d.firebasestorage.app",
  messagingSenderId: "992963491194",
  appId: "1:992963491194:web:f0d0b95343114e067e52c3"
});

const messaging = firebase.messaging();

// Optional: background message handler
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = { body: payload.notification.body };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
