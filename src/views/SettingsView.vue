<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { deleteUserData, updateUserData } from '@/firebase'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@stores/userStore'

const { userInfo } = storeToRefs(useUserStore())
const router = useRouter()

const profileImage = "https://via.placeholder.com/144x144.png"

const passwordInput = ref(""), 
  emailInput = ref(userInfo.value?.email ?? ""), 
  nickInput = ref(userInfo.value?.name ?? "")
const changeDetails = ref(false), showPassword = ref(false)

const saveDetails = () =>  {
  if (userInfo.value) {
    userInfo.value = {
      uid: userInfo.value.uid,
      email: emailInput.value,
      name: nickInput.value
    }
    updateUserData(userInfo.value.uid, {
      email: emailInput.value,
      username: nickInput.value
    })
    changeDetails.value = false
  }
}

const deleteUser = async () => {
  await deleteUserData()
  userInfo.value = undefined
  router.push({ name: "home" })
}

const changeImage = () => {
  console.log("changed")
}
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-8 grow">
    <form class="w-full shadow-xl bg-base-200 rounded-xl" @submit.prevent="saveDetails">
      <div class="relative flex flex-col items-center gap-4 p-4 md:flex-row md:gap-8">
        <div class="absolute tooltip tooltip-left tooltip-error top-4 right-4" data-tip="Delete your account">
          <label for="deleteModal" class="btn btn-error btn-square text-base-100 btn-sm">
            <Icon class="w-6 h-6" icon="eva:trash-2-outline" />
          </label>
        </div>
        <div class="relative">
          <img :src="profileImage" alt="Profile image" class="object-cover rounded-full" />
          <div class="absolute top-0 left-0 hidden rounded-full bg-black/25">
            <label for="imageInputBox" class="flex justify-center p-4 text-sm transition border-2 border-dashed rounded-full cursor-pointer border-neutral hover:border-neutral-focus focus:border-primary focus:ring-primary disabled:bg-neutral-content h-36 w-36 focus:border-solid focus:ring-1 disabled:cursor-not-allowed disabled:opacity-75">
              <div class="flex flex-col items-center justify-center">
                <Icon icon="eva:cloud-upload-outline" class="w-8 h-8 text-primary" />
                <span class="text-xs font-medium text-center">
                  Drop an image<br>or
                  <span class="link text-primary">browse it</span>
                </span>
              </div>
              <input @change="changeImage" id="imageInputBox" type="file" class="sr-only" accept=".png, .jpeg, .jpg, .svg" />
            </label>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold leading-6">Account Informations</h3>
          <p class="max-w-2xl text-sm text-neutral-focus">Your personal details you can change anytime.</p>
        </div>
      </div>
      <div class="relative flex items-center p-4 -mt-4">
        <div class="border-t border-neutral grow"></div>
        <span class="mx-4 text-neutral shrink">Details</span>
        <div class="border-t border-neutral grow"></div>
      </div>
      <div class="flex flex-col items-center gap-4 px-4 py-2 bg-neutral-focus/10 sm:grid sm:grid-cols-3 md:flex-row">
        <p class="flex items-center gap-4 text-sm font-medium text-neutral-focus">
          <Icon class="w-6 h-6 text-primary" icon="eva:person-fill" />
          Your nickname
        </p>
        <input type="text" v-model="nickInput" placeholder="Enter your nickname" 
          minlength="2" maxlength="24" pattern="[a-zA-Z0-9]+" :disabled="!changeDetails" required
          class="w-full text-sm enabled:text-neutral enabled:bg-base-100 enabled:add-border rounded-xl disabled:border-0 disabled:bg-transparent sm:col-span-2" />
      </div>
      <div class="flex flex-col items-center gap-4 px-4 py-2 sm:grid sm:grid-cols-3 md:flex-row">
        <p class="flex items-center gap-4 text-sm font-medium text-neutral-focus">
          <Icon class="w-6 h-6 text-primary" icon="eva:at-fill" />
          Your email address
        </p>
        <input type="email" v-model="emailInput" placeholder="Enter your email address" 
          required pattern="[^@\s]+@[^@\s]+\.[^@\s]+" :disabled="!changeDetails"
          class="w-full text-sm enabled:text-neutral enabled:bg-base-100 enabled:add-border rounded-xl disabled:border-0 disabled:bg-transparent sm:col-span-2" />
      </div>
      <div class="flex flex-col items-center gap-4 px-4 py-2 bg-neutral-focus/10 sm:grid sm:grid-cols-3 md:flex-row">
        <p class="flex items-center gap-4 text-sm font-medium text-neutral-focus">
          <Icon class="w-6 h-6 text-primary" icon="eva:lock-fill" />
          Your password
        </p>
        <div class="relative flex w-full sm:col-span-2">
          <input :type="showPassword ? 'text' : 'password'" v-model="passwordInput" placeholder="Enter your password" required
            minlength="8" maxlength="24" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}" :disabled="!changeDetails" 
            class="box-border w-full pr-10 text-sm truncate enabled:text-neutral enabled:bg-base-100 enabled:add-border rounded-xl disabled:border-0 disabled:bg-transparent" />
          <label class="absolute inset-y-0 right-0 pr-2 cursor-pointer swap">
            <input type="checkbox" class="modal-toggle" v-model="showPassword">
            <Icon class="w-6 h-6 swap-off text-primary" icon="eva:eye-off-outline" />
            <Icon class="w-6 h-6 swap-on text-primary" icon="eva:eye-outline" />
          </label>
        </div>
      </div>
      <div class="flex justify-between gap-4 p-4">
        <button :disabled="changeDetails" class="btn btn-primary btn-sm" @click="changeDetails = !changeDetails">Change details</button>
        <button type="submit" :disabled="!changeDetails" class="btn btn-success text-base-100 btn-sm">Save</button>
      </div>
    </form>
    <input type="checkbox" id="deleteModal" class="modal-toggle" />
    <label for="deleteModal" class="cursor-pointer modal">
      <label class="relative flex flex-col items-center justify-center p-4 modal-box" for="">
        <h3 class="text-lg font-bold text-center">Are you sure you want to delete this account?</h3>
        <p class="py-4 text-center">We're sorry to see you go, but if you're sure you'd like to delete your account you can do so by clicking the button below.</p>
        <p class="mb-2 text-sm text-error">This action cannot be undone.</p>
        <label for="deleteModal" @click="deleteUser" class="btn btn-error btn-sm">Delete!</label>
      </label>
    </label>
  </div>
</template>
