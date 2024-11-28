<script lang="ts" setup>
import { useCurrentUser, useFirebaseAuth } from 'vuefire'

const error = ref<Error | null>(null)
const user = useCurrentUser()
const auth = useFirebaseAuth()!

auth.useDeviceLanguage()

function signinRedirect() {
	signInProvider(auth, 'google').then(a => console.dir(a)).catch((reason) => {
		console.error('Failed signinRedirect', reason)
		error.value = reason
	})
}

onMounted(() => {
	getRedirectResult(auth).then(a => console.dir(a)).catch((reason) => {
		console.error('Failed redirect result', reason)
		error.value = reason
	})
})
</script>

<template>
	<main>
		<p>
			{{ error?.message }}
		</p>
		<div v-if="$route.query.redirect" class="message-box">
			<p>
				Please login to access <code>{{ $route.query.redirect }}</code>.
			</p>
		</div>
		<template v-if="user">
			<div>
				You are currently logged in as:
				<br>
				<img v-if="user.photoURL" class="avatar" :src="user.photoURL" referrerpolicy="no-referrer">
				<br>
				<strong>{{ user.isAnonymous ? '🥸' : '' }} {{ user.displayName }}.</strong>
			</div>

			<button @click="signOut(auth)">
				Logout
			</button>
		</template>
		<template v-else>
			<button @click="signinRedirect()">
				SignIn with Google (redirect)
			</button>
			<br>
		</template>
	</main>
</template>
