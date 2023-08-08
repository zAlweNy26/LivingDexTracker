<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { loginAccount, loginGoogle, createAccount, loginTwitter, writeUserData, getUserData } from '@/firebase'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { OAuthCredential, type User } from 'firebase/auth'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@stores/userStore'

const { userInfo, userData } = storeToRefs(useUserStore())
const router = useRouter()

const emailInput = ref(''), passwordInput = ref(''), nickInput = ref(''),
	showPassword = ref(false), saveDetails = ref(false), readTerms = ref(false),
	swapAuth = ref(false), isRightLong = ref(false), isUpper = ref(false), isLower = ref(false),
	isNumber = ref(false), isSpecial = ref(false)

const validatePassword = () => {
	isLower.value = /[a-z]/g.test(passwordInput.value)
	isUpper.value = /[A-Z]/g.test(passwordInput.value)
	isNumber.value = /[0-9]/g.test(passwordInput.value)
	isSpecial.value = /[@#$!%*?^&]/g.test(passwordInput.value)
	isRightLong.value = passwordInput.value.length >= 8 && passwordInput.value.length <= 24
}

const successLogin = async (user: User) => {
	const userEntry = await getUserData(user.uid)
	userInfo.value = {
		uid: user.uid,
		name: userEntry.username,
		email: userEntry.email
	}
	userData.value = {
		catchedNormal: userEntry.data?.catchedNormal ?? [],
		catchedShiny: userEntry.data?.catchedShiny ?? []
	}
	router.push({ name: "settings" })
}

const signUp = async () => {
	const user = await createAccount(saveDetails.value, emailInput.value, passwordInput.value)
	if (user instanceof Error) console.log(user.message)
	else {
		writeUserData(user.uid, nickInput.value, user.email ?? "")
		successLogin(user)
	}
}

const signIn = async () => {
	const user = await loginAccount(saveDetails.value, emailInput.value, passwordInput.value)
	if (user instanceof Error) console.log(user.message)
	else successLogin(user)
}

const signInGoogle = async () => {
	const user = await loginGoogle()
	if (user instanceof Error) console.log(user.message)
	else if (user instanceof OAuthCredential) console.log(user.idToken, user.accessToken)
	else if (user != null) successLogin(user)
	else console.log("Can't login with Google")
}

const signInTwitter = async () => {
	const user = await loginTwitter()
	if (user instanceof Error) console.log(user.message)
	else if (user instanceof OAuthCredential) console.log(user.idToken, user.accessToken)
	else if (user != null) successLogin(user)
	else console.log("Can't login with Twitter")
}
</script>

<template>
	<div class="flex w-full items-center justify-center">
		<div class="relative flex w-full overflow-hidden rounded-2xl bg-base-200 shadow-xl md:w-4/5 lg:w-65p">
			<section
				:class="[swapAuth ? 'absolute translate-x-full opacity-0 sm:!static' : 'z-20 translate-x-0 opacity-100', 'flex w-full flex-col items-center justify-center gap-2 px-4 py-8 transition !duration-500 ease-in-out sm:w-1/2']">
				<h1 class="text-center text-3xl font-bold">
					Welcome back !
				</h1>
				<h3 class="text-center text-xs sm:hidden">
					Need an account?
					<span class="cursor-pointer font-medium text-primary" @click="swapAuth = !swapAuth">Sign up
						now!</span>
				</h3>
				<div class="my-4 flex flex-col gap-2">
					<button
						class="btn btn-ghost btn-sm gap-1 rounded-full border-2 border-primary bg-transparent normal-case"
						@click="signInGoogle">
						<Icon icon="bxl:google" class="h-6 w-6" color="#DB4A39" />
						<span>Login with Google</span>
					</button>
					<button
						class="btn btn-ghost btn-sm gap-1 rounded-full border-2 border-primary bg-transparent normal-case"
						@click="signInTwitter">
						<Icon icon="bxl:twitter" class="h-6 w-6" color="#1DA1F2" />
						<span>Login with Twitter</span>
					</button>
				</div>
				<form autocomplete="on" method="get" action="/api/login"
					class="flex w-full flex-col items-center justify-center gap-8 bg-base-200" @submit.prevent="signIn">
					<span class="text-center text-sm">or use your account details</span>
					<div class="flex w-full flex-col gap-4 md:w-4/5 xl:w-65p">
						<div class="w-full">
							<label for="inUserEmail" class="sr-only">Email Address</label>
							<div class="relative">
								<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
									<Icon class="h-6 w-6 text-primary" icon="eva:at-fill" />
								</div>
								<input id="inUserEmail" v-model="emailInput" name="email" type="email" required
									placeholder="Enter your email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
									class="add-border block w-full rounded-xl bg-base-100 pl-9 text-sm text-neutral">
							</div>
						</div>
						<div class="w-full">
							<label for="inUserPassword" class="sr-only">Password</label>
							<div class="relative">
								<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
									<Icon class="h-6 w-6 text-primary" icon="eva:lock-fill" />
								</div>
								<input id="inUserPassword" v-model="passwordInput" name="password" required
									:type="showPassword ? 'text' : 'password'" placeholder="Enter your password"
									minlength="8" maxlength="24"
									class="add-border block w-full rounded-xl bg-base-100 px-9 text-sm text-neutral">
								<label class="swap absolute inset-y-0 right-0 cursor-pointer pr-2">
									<input type="checkbox" class="modal-toggle" @click="showPassword = !showPassword">
									<Icon class="swap-off h-6 w-6 text-primary" icon="eva:eye-off-outline" />
									<Icon class="swap-on h-6 w-6 text-primary" icon="eva:eye-outline" />
								</label>
							</div>
						</div>
						<div class="flex flex-col gap-2">
							<div class="flex cursor-pointer items-center gap-2">
								<input id="inSaveDetails" v-model="saveDetails" type="checkbox"
									class="!checkbox-primary checkbox !checkbox-sm bg-base-100">
								<label for="inSaveDetails" class="cursor-pointer text-xs font-medium">Remember
									me</label>
							</div>
							<a href="/auth/forgot" class="self-end text-xs font-medium text-primary">Forgot your
								password?</a>
						</div>
					</div>
					<input type="submit" class="btn btn-primary text-lg" value="Sign In">
				</form>
			</section>
			<section
				:class="[swapAuth ? 'z-20 translate-x-0 opacity-100' : 'absolute -translate-x-full opacity-0 sm:!static', 'flex w-full flex-col items-center justify-center gap-2 px-4 py-8 transition !duration-500 ease-in-out sm:w-1/2']">
				<h1 class="text-center text-3xl font-bold">
					Create an account
				</h1>
				<h3 class="text-center text-xs sm:hidden">
					Already have an account?
					<span class="cursor-pointer font-medium text-primary" @click="swapAuth = !swapAuth">Sign in!</span>
				</h3>
				<div class="my-4 flex flex-col gap-2">
					<button
						class="btn btn-ghost btn-sm gap-1 rounded-full border-2 border-primary bg-transparent normal-case"
						@click="signInGoogle">
						<Icon icon="bxl:google" class="h-6 w-6" color="#DB4A39" />
						<span>Login with Google</span>
					</button>
					<button
						class="btn btn-ghost btn-sm gap-1 rounded-full border-2 border-primary bg-transparent normal-case"
						@click="signInTwitter">
						<Icon icon="bxl:twitter" class="h-6 w-6" color="#1DA1F2" />
						<span>Login with Twitter</span>
					</button>
				</div>
				<form autocomplete="on" method="post" action="/api/register"
					class="flex w-full flex-col items-center justify-center gap-8 bg-base-200" @submit.prevent="signUp">
					<span class="text-center text-sm">or use your email and nickname</span>
					<div class="flex w-full flex-col gap-4 md:w-4/5 xl:w-65p">
						<div class="w-full">
							<label for="upUserNick" class="sr-only">Nickname</label>
							<div class="relative">
								<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
									<Icon class="h-6 w-6 text-primary" icon="eva:person-fill" />
								</div>
								<input id="upUserNick" v-model="nickInput" name="nickname" type="text" required
									placeholder="Enter your nickname" pattern="[a-zA-Z0-9]+" minlength="2" maxlength="24"
									class="add-border block w-full rounded-xl bg-base-100 pl-9 text-sm text-neutral">
							</div>
						</div>
						<div class="w-full">
							<label for="upUserEmail" class="sr-only">Email Address</label>
							<div class="relative">
								<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
									<Icon class="h-6 w-6 text-primary" icon="eva:at-fill" />
								</div>
								<input id="upUserEmail" v-model="emailInput" name="email" type="email" required
									placeholder="Enter your email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
									class="add-border block w-full rounded-xl bg-base-100 pl-9 text-sm text-neutral">
							</div>
						</div>
						<div class="w-full">
							<label for="upUserPassword" class="sr-only">Password</label>
							<div class="relative">
								<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
									<Icon class="h-6 w-6 text-primary" icon="eva:lock-fill" />
								</div>
								<input id="upUserPassword" v-model="passwordInput" name="password" required
									:type="showPassword ? 'text' : 'password'"
									pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$!%*?^&])[A-Za-z\d@#$!%*?^&]{8,24}"
									placeholder="Enter your password" minlength="8" maxlength="24"
									class="add-border block w-full rounded-xl bg-base-100 px-9 text-sm text-neutral"
									@keyup="validatePassword">
								<label class="swap absolute inset-y-0 right-0 cursor-pointer pr-2">
									<input type="checkbox" class="modal-toggle" @click="showPassword = !showPassword">
									<Icon class="swap-off h-6 w-6 text-primary" icon="eva:eye-off-outline" />
									<Icon class="swap-on h-6 w-6 text-primary" icon="eva:eye-outline" />
								</label>
							</div>
						</div>
						<div class="flex flex-col gap-2">
							<p class="text-xs">
								The password <span class="font-semibold">must be between </span>
								<span :class="[isRightLong ? 'text-success' : 'text-error', 'font-semibold']">8-24
									characters long</span>
								with <span class="font-semibold">at least </span>
								<span :class="[isUpper ? 'text-success' : 'text-error', 'font-semibold']">one uppercase
									letter</span>,
								<span :class="[isLower ? 'text-success' : 'text-error', 'font-semibold']">one lowercase
									letter</span>,
								<span :class="[isNumber ? 'text-success' : 'text-error', 'font-semibold']">one number</span>
								and
								<span :class="[isSpecial ? 'text-success' : 'text-error', 'font-semibold']">one special
									character</span>
								<span class="font-semibold"> (@#\$!%*?^&)</span>
							</p>
							<div class="flex cursor-pointer items-center gap-2">
								<input id="upSaveDetails" v-model="saveDetails" type="checkbox" name="remember"
									class="!checkbox-primary checkbox !checkbox-sm bg-base-100 focus:!outline-none">
								<label for="upSaveDetails" class="cursor-pointer text-xs font-medium">Remember
									me</label>
							</div>
							<div class="flex cursor-pointer items-center gap-2">
								<input id="readTerms" v-model="readTerms" type="checkbox" name="terms"
									class="!checkbox-primary checkbox !checkbox-sm bg-base-100" required>
								<label for="readTerms" class="cursor-pointer text-xs font-medium">
									I have read the
									<a href="/terms" class="text-primary">Terms & Conditions</a>
								</label>
							</div>
						</div>
					</div>
					<input type="submit" class="btn btn-primary text-lg" value="Sign Up">
				</form>
			</section>
			<div class="absolute left-0 top-0 z-30 hidden h-full flex-col items-center justify-center bg-primary p-4 text-base-100 transition-all !duration-500 ease-in-out sm:!flex sm:w-1/2"
				:class="{ 'translate-x-full': !swapAuth }">
				<div class="absolute flex h-full w-full flex-col items-center justify-center gap-4 transition-fadetransform !duration-500 ease-in-out md:w-4/5 lg:w-65p"
					:class="[swapAuth ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0']">
					<h1 class="text-center text-3xl font-bold">
						Welcome back!
					</h1>
					<p class="text-center">
						To keep connected with us please login with your personal info
					</p>
					<button class="btn btn-secondary btn-outline text-lg !text-base-100" @click="swapAuth = !swapAuth">
						Sign In
					</button>
				</div>
				<div class="absolute flex h-full w-full flex-col items-center justify-center gap-4 transition-fadetransform !duration-500 ease-in-out md:w-4/5 lg:w-65p"
					:class="[swapAuth ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100']">
					<h1 class="text-center text-3xl font-bold">
						Hello, friend!
					</h1>
					<p class="text-center">
						Enter your personal details and start journey with us
					</p>
					<button class="btn btn-secondary btn-outline text-lg !text-base-100" @click="swapAuth = !swapAuth">
						Sign Up
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
