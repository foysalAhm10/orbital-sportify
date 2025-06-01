import { createContext, useContext, useEffect, useState, } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    console.log("got user:", user);
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            console.log("onAuthStateChanged user:", user);
            if (user) {
                setUser(user);
                setIsAuthenticated(true);
                updateUserData(user.uid);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        });
        return unsub;
    }, []);

    const updateUserData = async (userId) => {
        const docRef = doc(db, "users", user);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let data = docSnap.data();
            setUser({...user, username: data.username, userId: data.userId});
        } else {
            console.log("No such document!");
        }
    }


    const login = async(email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            return { success: true};

        } catch (e) {
            let msg = e.message;
            if(msg.includes("(auth/invalid-email)")) msg = "Invalid email address";
            if(msg.includes("(auth/invalid-credential)")) msg = "Invalid credentials";
            return { success: false, msg };
        }
    }

        const logout = async() => {
            try {
                await signOut(auth);
                return { success: true };
            } catch (e) {
                return { success: false, msg: e.message, error : e };
        }
        }

    const register = async(email, password, username) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log("response.user :", response?.user);

            //setUser(response?.user);
            //setIsAuthenticated(true);

            await setDoc(doc(db, "users", response?.user?.uid), {
                username,
                userId: response?.user?.uid,
            });
            return { success: true, data: response?.user };
        } catch (e) {
            let msg = e.message;
            if(msg.includes("(auth/invalid-email)")) msg = "Invalid email address";
            if(msg.includes("(auth/email-already-in-use)")) msg = "Email already in use";
            return { success: false, msg };
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error("useAuth must be used within an AuthContextProvider");
    }
    return value;
};

