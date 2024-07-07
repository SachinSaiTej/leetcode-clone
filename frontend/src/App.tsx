import './App.css'
// import { Landing } from './components/Landing'

import { initializeApp } from "firebase/app";
import { Signin } from './components/Signin';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDOb4QWMc8PmSgrjma-MgxZb2GEVPhHGlc",
  authDomain: "leetcode-clone-da47e.firebaseapp.com",
  projectId: "leetcode-clone-da47e",
  storageBucket: "leetcode-clone-da47e.appspot.com",
  messagingSenderId: "737948768596",
  appId: "1:737948768596:web:c29d825a3c3f1c1e8d50c1",
  measurementId: "G-QEJ9S7RWKL"
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
function App() {
  useEffect(() => {
    onAuthStateChanged(auth, function (user) {
      if (user && user.email) {
        // setUser({
        //     loading: false,
        //     user: {
        //         email: user.email,
        //     },
        // });
        console.log("User : ", user);
      } else {
        // setUser({
        //     loading: false,
        // });
        // No user is signed in.
        console.log("There is no logged in user");
      }
    });
  }, [])
  return (
    <>
      <div>
        <Signin />
        {/* <Landing /> */}
      </div>
    </>
  )
}

export default App
