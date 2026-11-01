// Firebase Secure Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnO9DWlcOnh-04Tlb4R-aFE84jIHO6-6g",
  authDomain: "pixelpulse-ai.firebaseapp.com",
  projectId: "pixelpulse-ai",
  storageBucket: "pixelpulse-ai.firebasestorage.app",
  messagingSenderId: "846490204910",
  appId: "1:846490204910:web:a4a70b0278c54c000e91ff",
  measurementId: "G-GVL45SVJGW"
};

// Initialize Firebase safely
firebase.initializeApp(firebaseConfig);
firebase.analytics();
