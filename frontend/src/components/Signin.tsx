import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { useEffect, useState } from "react";
// import { auth } from "../App";


const provider = new GoogleAuthProvider();
const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'http://localhost:5173/',
    // This must be true.
    handleCodeInApp: true,
};

export const Signin = () => {
    const auth = getAuth();
    // const [email, setEmail] = useState("");


    async function onSignIn() {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                if (!credential) {
                    return;
                }
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch(() => {
                alert("erorr while signing in");
            });
    }



    return <div>
        {/* <input type="text" placeholder="email" onChange={(e) => {
            setEmail(e.target.value);
        }} /> */}
        <button onClick={() => {
            onSignIn()
        }}>
            Login with google
        </button>
    </div>
}