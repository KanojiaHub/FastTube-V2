// SignUpPage.js
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const auth = getAuth();
const db = getFirestore();

const handleSignUp = async (email, password, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update the user's profile with the username
    await updateProfile(user, { displayName: username });

    // Optionally store additional user data in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      username: username,
      email: email,
    });

    // Redirect or show success message
  } catch (error) {
    console.error('Error signing up:', error);
  }
};
