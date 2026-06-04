import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1BFZ8DZqLx_iimasn9CHgYPKTBhfNfb0",
  authDomain: "modu-6b2b5.firebaseapp.com",
  projectId: "modu-6b2b5",
  storageBucket: "modu-6b2b5.firebasestorage.app",
  messagingSenderId: "139925953689",
  appId: "1:139925953689:web:6f55990a882e4d652bac08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const dbCloud = getFirestore(app);

export { dbCloud };