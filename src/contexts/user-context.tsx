import { auth, db } from "@/firebase/firebaseConfig";
import IChildren from "@/lib/types/children";
import { User } from "@/lib/types/user";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const UserContext = createContext<User | null>(null);

export default function UserContextProvider({children} : IChildren) {

    const [user, setUser] = useState<User | null>(null);
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser : any) => {

            if(currentUser) {
                const docSnap = await getDoc(doc(db, "users", currentUser.uid));
                if (docSnap.exists()) { 
                    currentUser["firstName"] = docSnap.data()["firstName"];
                    currentUser["lastName"] = docSnap.data()["lastName"];
                }
            }

            //@ts-ignore
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [location])

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext);
}