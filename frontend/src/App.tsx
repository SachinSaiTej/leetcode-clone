import './App.css'
// import { Landing } from './components/Landing'

import { initializeApp } from "firebase/app";
import { Signin } from './components/Signin';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { userAtom } from './store/atoms/user';
import { Topbar } from './components/Topbar';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Landing } from './components/Landing';
import { About } from './components/About';
import { Submissions } from './components/Submissions';
import { ProblemList } from './components/ProblemList';
import { Leaderboard } from './components/Leaderboard';
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

  return <RecoilRoot>
    <StoreApp />
  </RecoilRoot>
}

function StoreApp() {
  const [user, setUser] = useRecoilState(userAtom);

  const problemList = [
    { id: "1", problemName: "Two Sum", tags: ["Array", "Hash Table"] },
    { id: "2", problemName: "Reverse String", tags: ["String"] },
    { id: "3", problemName: "Palindrome Check", tags: ["String"] },
    { id: "4", problemName: "Merge Intervals", tags: ["Array", "Sorting"] },
  ];

  useEffect(() => {
    onAuthStateChanged(auth, function (user) {
      if (user && user.email) {
        setUser({
          loading: false,
          user: {
            email: user.email,
          },
        });
        console.log("User : ", user);
      } else {
        setUser({
          loading: false,
        });
        console.log("There is no logged in user");
      }
    });
  }, [])

  if (user.loading) {
    return <div>Loading...</div>
  }

  if (!user.user) {
    return <div>
      <Signin />
    </div>
  }

  return (
    <div className="place-items-center grid">
      <div className="max-w-screen-lg w-full">
        <BrowserRouter>
          <Topbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/activity" element={<Submissions />} />
            <Route path="/problems" element={<ProblemList problemList={problemList} />} />
          </Routes>
          {/* <Leaderboard /> */}
          {/* <Leaderboard leaderboard={leaderboardData} /> */}
        </BrowserRouter>
      </div>
    </div >
  )
}

export default App
