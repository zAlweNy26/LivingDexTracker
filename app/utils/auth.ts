import { type Auth, createUserWithEmailAndPassword, GoogleAuthProvider, setPersistence, signInWithEmailAndPassword, signInWithRedirect } from 'firebase/auth'

const providers = {
	google: new GoogleAuthProvider(),
}

export function signInWithLocal(auth: Auth, email: string, password: string, remember = true) {
	setPersistence(auth, { type: remember ? 'LOCAL' : 'SESSION' })
	return createUserWithEmailAndPassword(auth, email, password)
}

export function logInWithLocal(auth: Auth, email: string, password: string, remember = true) {
	setPersistence(auth, { type: remember ? 'LOCAL' : 'SESSION' })
	return signInWithEmailAndPassword(auth, email, password)
}

export function signInProvider(auth: Auth, provider: 'google', remember = true) {
	setPersistence(auth, { type: remember ? 'LOCAL' : 'SESSION' })
	return signInWithRedirect(auth, providers[provider])
}

export { getRedirectResult, signOut } from 'firebase/auth'
