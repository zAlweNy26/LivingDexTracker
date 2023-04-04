<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { loginAccount, loginGoogle, createAccount, loginTwitter, writeUserData, getUserData } from '@/firebase'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { OAuthCredential, User } from 'firebase/auth'
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

const signUp = async () =>  {
  const user = await createAccount(saveDetails.value, emailInput.value, passwordInput.value)
  if (user instanceof Error) console.log(user.message)
  else {
    writeUserData(user.uid, nickInput.value, user.email ?? "")
    successLogin(user)
  }
}

const signIn = async () =>  {
  const user = await loginAccount(saveDetails.value, emailInput.value, passwordInput.value)
  if (user instanceof Error) console.log(user.message)
  else successLogin(user)
}

const signInGoogle = async () =>  {
  const user = await loginGoogle()
  if (user instanceof Error) console.log(user.message)
  else if (user instanceof OAuthCredential) console.log(user.idToken, user.accessToken)
  else if (user != null) successLogin(user)
  else console.log("Can't login with Google")
}

const signInTwitter = async () =>  {
  const user = await loginTwitter()
  if (user instanceof Error) console.log(user.message)
  else if (user instanceof OAuthCredential) console.log(user.idToken, user.accessToken)
  else if (user != null) successLogin(user)
  else console.log("Can't login with Twitter")
}
</script>

<template>
  <div class="flex items-center justify-center w-full">
    <div class="relative flex w-full overflow-hidden shadow-xl lg:w-65p bg-base-200 rounded-2xl md:w-4/5">
      <section
        :class="[swapAuth ? 'absolute translate-x-full opacity-0 sm:!static' : 'z-20 translate-x-0 opacity-100', 'flex w-full flex-col items-center justify-center gap-2 px-4 py-8 transition !duration-500 ease-in-out sm:w-1/2']">
        <h1 class="text-3xl font-bold text-center">
          Welcome back !
        </h1>
        <h3 class="text-xs text-center sm:hidden">
          Need an account?
          <span class="font-medium cursor-pointer text-primary" @click="swapAuth = !swapAuth">Sign up
            now!</span>
        </h3>
        <div class="flex flex-col gap-2 my-4">
          <button class="gap-1 normal-case bg-transparent border-2 rounded-full btn btn-sm btn-ghost border-primary" @click="signInGoogle">
            <Icon icon="bxl:google" class="w-6 h-6" color="#DB4A39" />
            <span>Login with Google</span>
          </button>
          <button class="gap-1 normal-case bg-transparent border-2 rounded-full btn btn-sm btn-ghost border-primary" @click="signInTwitter">
            <Icon icon="bxl:twitter" class="w-6 h-6" color="#1DA1F2" />
            <span>Login with Twitter</span>
          </button>
        </div>
        <form autocomplete="on" method="get" action="/api/login"
          class="flex flex-col items-center justify-center w-full gap-8 bg-base-200" @submit.prevent="signIn">
          <span class="text-sm text-center">or use your account details</span>
          <div class="flex flex-col w-full gap-4 xl:w-65p md:w-4/5">
            <div class="w-full">
              <label for="inUserEmail" class="sr-only">Email Address</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <Icon class="w-6 h-6 text-primary" icon="eva:at-fill" />
                </div>
                <input id="inUserEmail" v-model="emailInput" name="email" type="email" required
                  placeholder="Enter your email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                  class="block w-full text-sm text-neutral bg-base-100 add-border rounded-xl pl-9">
              </div>
            </div>
            <div class="w-full">
              <label for="inUserPassword" class="sr-only">Password</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <Icon class="w-6 h-6 text-primary" icon="eva:lock-fill" />
                </div>
                <input id="inUserPassword" v-model="passwordInput" name="password" required
                  :type="showPassword ? 'text' : 'password'" placeholder="Enter your password" minlength="8"
                  maxlength="24" class="block w-full text-sm text-neutral bg-base-100 add-border rounded-xl px-9">
                <label class="absolute inset-y-0 right-0 pr-2 cursor-pointer swap">
                  <input type="checkbox" class="modal-toggle" @click="showPassword = !showPassword">
                  <Icon class="w-6 h-6 swap-off text-primary" icon="eva:eye-off-outline" />
                  <Icon class="w-6 h-6 swap-on text-primary" icon="eva:eye-outline" />
                </label>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-2 cursor-pointer">
                <input id="inSaveDetails" v-model="saveDetails" type="checkbox"
                  class="checkbox !checkbox-primary !checkbox-sm bg-base-100">
                <label for="inSaveDetails" class="text-xs font-medium cursor-pointer">Remember
                  me</label>
              </div>
              <a href="/auth/forgot" class="self-end text-xs font-medium text-primary">Forgot your
                password?</a>
            </div>
          </div>
          <input type="submit" class="text-lg btn btn-primary" value="Sign In">
        </form>
      </section>
      <section
        :class="[swapAuth ? 'z-20 translate-x-0 opacity-100' : 'absolute -translate-x-full opacity-0 sm:!static', 'flex w-full flex-col items-center justify-center gap-2 px-4 py-8 transition !duration-500 ease-in-out sm:w-1/2']">
        <h1 class="text-3xl font-bold text-center">
          Create an account
        </h1>
        <h3 class="text-xs text-center sm:hidden">
          Already have an account?
          <span class="font-medium cursor-pointer text-primary" @click="swapAuth = !swapAuth">Sign in!</span>
        </h3>
        <div class="flex flex-col gap-2 my-4">
          <button class="gap-1 normal-case bg-transparent border-2 rounded-full btn btn-sm btn-ghost border-primary" @click="signInGoogle">
            <Icon icon="bxl:google" class="w-6 h-6" color="#DB4A39" />
            <span>Login with Google</span>
          </button>
          <button class="gap-1 normal-case bg-transparent border-2 rounded-full btn btn-sm btn-ghost border-primary" @click="signInTwitter">
            <Icon icon="bxl:twitter" class="w-6 h-6" color="#1DA1F2" />
            <span>Login with Twitter</span>
          </button>
        </div>
        <form autocomplete="on" method="post" action="/api/register"
          class="flex flex-col items-center justify-center w-full gap-8 bg-base-200" @submit.prevent="signUp">
          <span class="text-sm text-center">or use your email and nickname</span>
          <div class="flex flex-col w-full gap-4 xl:w-65p md:w-4/5">
            <div class="w-full">
              <label for="upUserNick" class="sr-only">Nickname</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <Icon class="w-6 h-6 text-primary" icon="eva:person-fill" />
                </div>
                <input id="upUserNick" v-model="nickInput" name="nickname" type="text" required
                  placeholder="Enter your nickname" pattern="[a-zA-Z0-9]+" minlength="2" maxlength="24"
                  class="block w-full text-sm text-neutral bg-base-100 add-border rounded-xl pl-9">
              </div>
            </div>
            <div class="w-full">
              <label for="upUserEmail" class="sr-only">Email Address</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <Icon class="w-6 h-6 text-primary" icon="eva:at-fill" />
                </div>
                <input id="upUserEmail" v-model="emailInput" name="email" type="email" required
                  placeholder="Enter your email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                  class="block w-full text-sm text-neutral bg-base-100 add-border rounded-xl pl-9">
              </div>
            </div>
            <div class="w-full">
              <label for="upUserPassword" class="sr-only">Password</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <Icon class="w-6 h-6 text-primary" icon="eva:lock-fill" />
                </div>
                <input id="upUserPassword" v-model="passwordInput" name="password" required
                  :type="showPassword ? 'text' : 'password'"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$!%*?^&])[A-Za-z\d@#$!%*?^&]{8,24}"
                  placeholder="Enter your password" minlength="8" maxlength="24"
                  class="block w-full text-sm text-neutral bg-base-100 add-border rounded-xl px-9"
                  @keyup="validatePassword">
                <label class="absolute inset-y-0 right-0 pr-2 cursor-pointer swap">
                  <input type="checkbox" class="modal-toggle" @click="showPassword = !showPassword">
                  <Icon class="w-6 h-6 swap-off text-primary" icon="eva:eye-off-outline" />
                  <Icon class="w-6 h-6 swap-on text-primary" icon="eva:eye-outline" />
                </label>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <p class="text-xs">
                The password <span class="font-semibold">must be between </span>
                <span :class="[isRightLong ? 'text-success' : 'text-error', 'font-semibold']">8-24 characters long</span>
                with <span class="font-semibold">at least </span>
                <span :class="[isUpper ? 'text-success' : 'text-error', 'font-semibold']">one uppercase letter</span>,
                <span :class="[isLower ? 'text-success' : 'text-error', 'font-semibold']">one lowercase letter</span>,
                <span :class="[isNumber ? 'text-success' : 'text-error', 'font-semibold']">one number</span> and
                <span :class="[isSpecial ? 'text-success' : 'text-error', 'font-semibold']">one special character</span>
                <span class="font-semibold"> (@#\$!%*?^&)</span>
              </p>
              <div class="flex items-center gap-2 cursor-pointer">
                <input id="upSaveDetails" v-model="saveDetails" type="checkbox" name="remember"
                  class="checkbox !checkbox-primary !checkbox-sm bg-base-100 focus:!outline-none">
                <label for="upSaveDetails" class="text-xs font-medium cursor-pointer">Remember
                  me</label>
              </div>
              <div class="flex items-center gap-2 cursor-pointer">
                <input id="readTerms" v-model="readTerms" type="checkbox" name="terms"
                  class="checkbox !checkbox-primary !checkbox-sm bg-base-100" required>
                <label for="readTerms" class="text-xs font-medium cursor-pointer">
                  I have read the
                  <a href="/terms" class="text-primary">Terms & Conditions</a>
                </label>
              </div>
            </div>
          </div>
          <input type="submit" class="text-lg btn btn-primary" value="Sign Up">
        </form>
      </section>
      <div
        class="bg-primary text-base-100 absolute left-0 top-0 z-30 hidden h-full flex-col items-center justify-center p-4 transition-all !duration-500 ease-in-out sm:!flex sm:w-1/2"
        :class="{ 'translate-x-full': !swapAuth }">
        <div
          class="lg:w-65p transition-fadetransform absolute flex h-full w-full flex-col items-center justify-center gap-4 !duration-500 ease-in-out md:w-4/5"
          :class="[swapAuth ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0']">
          <h1 class="text-3xl font-bold text-center">
            Welcome back!
          </h1>
          <p class="text-center">
            To keep connected with us please login with your personal info
          </p>
          <button class="btn btn-outline btn-secondary !text-base-100 text-lg" @click="swapAuth = !swapAuth">
            Sign In
          </button>
        </div>
        <div
          class="lg:w-65p transition-fadetransform absolute flex h-full w-full flex-col items-center justify-center gap-4 !duration-500 ease-in-out md:w-4/5"
          :class="[swapAuth ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100']">
          <h1 class="text-3xl font-bold text-center">
            Hello, friend!
          </h1>
          <p class="text-center">
            Enter your personal details and start journey with us
          </p>
          <button class="btn btn-outline btn-secondary !text-base-100 text-lg" @click="swapAuth = !swapAuth">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
