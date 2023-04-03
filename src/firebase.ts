import { FirebaseError, initializeApp } from 'firebase/app'
import { useDatabaseList, useDatabaseObject } from 'vuefire'
import { getDatabase, ref, set, child, get, update, remove, onValue } from 'firebase/database'
import { getAuth, signOut, GoogleAuthProvider, signInWithPopup, TwitterAuthProvider,
    browserLocalPersistence, browserSessionPersistence, setPersistence,
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    deleteUser } from "firebase/auth"
import { ReCaptchaV3Provider, initializeAppCheck } from 'firebase/app-check'

interface DataEntry {
    catchedNormal: boolean[],
    catchedShiny: boolean[]
}

interface UserEntry {
    username: string,
    email: string,
    picture: string,
    createdAt: number,
    data: DataEntry
}

const firebaseApp = initializeApp({
    apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
    authDomain: import.meta.env.PUBLIC_AUTH_DOMAIN,
    databaseURL: import.meta.env.PUBLIC_DB_URL,
    projectId: import.meta.env.PUBLIC_PROJECT_ID,
    storageBucket: import.meta.env.PUBLIC_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.PUBLIC_MESSAGING_SENDER_ID,
    appId: import.meta.env.PUBLIC_APP_ID
})

initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaV3Provider(import.meta.env.PUBLIC_CAPTCHA_KEY),
    isTokenAutoRefreshEnabled: true
})

const db = getDatabase(firebaseApp)

const writeUserData = (userId: string, name: string, email: string, imageUrl: string = "") => {
    set(ref(db, `users/${userId}`), {
        username: name,
        email: email,
        picture: imageUrl,
        createdAt: Date.now(),
        data: {
            catchedNormal: [],
            catchedShiny: []
        }
    } satisfies UserEntry)
}

const updateUserData = async (userId: string, entry: Partial<UserEntry>, path: string = "") => {
    update(ref(db, `users/${path}${userId}`), entry)
}

const getUserData = async (userId: string) => {
    const snapshot = await get(child(ref(db), `users/${userId}`))
    if (snapshot.exists()) return snapshot.val() as UserEntry
    else throw new Error("No data available")
}

const listenForValue = <T>(userId: string, callback: (result: T) => void) => {
    onValue(ref(db, `users/${userId}`), (snapshot) => {
        callback(snapshot.val())
    })
}

const deleteUserData = async () => {
    if (auth.currentUser) {
        await remove(ref(db, `users/${auth.currentUser.uid}`))
        await deleteUser(auth.currentUser)
    }
}

const getDataObject = async <T>(path: string) => useDatabaseObject<T>(ref(db, path))
const getDataList = async <T>(path: string) => useDatabaseList<T>(ref(db, path))

const auth = getAuth()
auth.useDeviceLanguage()

const googleProvider = new GoogleAuthProvider()
const twitterProvider = new TwitterAuthProvider()

const createAccount = async (remember: boolean, email: string, password: string) => {
    try {
        await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence)
        const account = await createUserWithEmailAndPassword(auth, email, password)
        return account.user
    } catch (error) {
        if (error instanceof FirebaseError) return new Error(error.code)
        return new Error("Generic error") 
    }
}

const loginAccount = async (remember: boolean, email: string, password: string) => {
    try {
        await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence)
        const account = await signInWithEmailAndPassword(auth, email, password)
        return account.user
    } catch (error) {
        if (error instanceof FirebaseError) return new Error(error.code)
        return new Error("Generic error") 
    }
}

const logoutAccount = async () => {
    try {
        await signOut(auth)
    } catch (error) {
        if (error instanceof FirebaseError) return new Error(error.code)
        return new Error("Generic error") 
    }
}

const loginGoogle = async () => {
    try {
        await setPersistence(auth, browserLocalPersistence)
        const account = await signInWithPopup(auth, googleProvider)
        return account.user
    } catch (error) {
        if (error instanceof FirebaseError) {
            const account = GoogleAuthProvider.credentialFromError(error)
            return account
        }
        return new Error("Generic error")
    }
}

const loginTwitter = async () => {
    try {
        await setPersistence(auth, browserLocalPersistence)
        const account = await signInWithPopup(auth, twitterProvider)
        return account.user
    } catch (error) {
        if (error instanceof FirebaseError) {
            const account = TwitterAuthProvider.credentialFromError(error)
            return account
        }
        return new Error("Generic error")
    }
}

export {
    firebaseApp, db, auth, writeUserData, getUserData, getDataObject, getDataList,
    createAccount, loginAccount, logoutAccount, loginGoogle, loginTwitter,
    deleteUserData, updateUserData, UserEntry, listenForValue
}