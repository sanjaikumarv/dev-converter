import { auth, firestore } from "@/src/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

// Custom hook to read  auth record and user profile doc
export default function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      const ref = doc(firestore, "users", user.uid);
      unsubscribe = onSnapshot(ref, (doc: any) => {
        setUsername(doc.data()?.username);
      });
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
}
