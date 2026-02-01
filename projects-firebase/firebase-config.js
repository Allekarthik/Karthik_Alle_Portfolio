// firebase-config.js
// Firebase Configuration for Portfolio Skills Management

// YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyD6A96Xdm15h4ttff6peM6dBHREcqKCyuI",
  authDomain: "portfolio-skills-4ed81.firebaseapp.com",
  databaseURL: "https://portfolio-skills-4ed81-default-rtdb.firebaseio.com",
  projectId: "portfolio-skills-4ed81",
  storageBucket: "portfolio-skills-4ed81.firebasestorage.app",
  messagingSenderId: "458829704064",
  appId: "1:458829704064:web:b197ae619430a77ad0ef65",
  measurementId: "G-W058WMT35P"
};

// Initialize Firebase (compat mode)
try {
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  console.log('🔥 Firebase initialized successfully!');
  console.log('📊 Database URL:', firebaseConfig.databaseURL);
  
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  console.error('Please check your firebase-config.js file');
}