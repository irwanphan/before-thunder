'use client'

import { Welcome } from '../components/Welcome/Welcome';
import { initializeApp } from "firebase/app"
import { getMessaging, getToken, onMessage } from "firebase/messaging"
import { useEffect } from 'react';

export default function HomePage() {

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyCZJryhAlbPjd8fuqUuy6aacVpiQ-RWjAg",
      authDomain: "before-thunder.firebaseapp.com",
      projectId: "before-thunder",
      storageBucket: "before-thunder.appspot.com",
      messagingSenderId: "944534823938",
      appId: "1:944534823938:web:ec0b9243333277c0bcf31b",
      measurementId: "G-FW9C0QQVPQ"
    }

    const firebaseApp = initializeApp(firebaseConfig)
    const messaging = getMessaging(firebaseApp)

    const generateToken = async () => {
      const permission = await Notification.requestPermission()
      console.log(permission)

      if (permission == "granted") {
        const token = await getToken(messaging, {
          vapidKey:
            "BGYdpbyTSoXtdA50qjc81aDzQ4IYxEnRiTdgVSeA1DN0eNp71lv9IHghZw0ki9tS3x2zBeOZSk1riGqYn5FYBb4",
        })
        console.log(token)
      }
    }
    generateToken()
    onMessage(messaging, (payload) => {
         console.log(payload)
    })
  }, [])
  return (
    <>
      <Welcome />
    </>
  );
}
