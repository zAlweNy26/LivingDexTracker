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

const saveDetails = () => {
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
	<div class="flex grow flex-wrap items-center justify-center gap-8">
		<form class="w-full rounded-xl bg-base-200 shadow-xl" @submit.prevent="saveDetails">
			<div class="relative flex flex-col items-center gap-4 p-4 md:flex-row md:gap-8">
				<div class="tooltip tooltip-error tooltip-left absolute right-4 top-4" data-tip="Delete your account">
					<label for="deleteModal" class="btn btn-square btn-error btn-sm text-base-100">
						<Icon class="h-6 w-6" icon="eva:trash-2-outline" />
					</label>
				</div>
				<div class="relative">
					<img :src="profileImage" alt="Profile image" class="rounded-full object-cover">
					<div class="absolute left-0 top-0 hidden rounded-full bg-black/25">
						<label for="imageInputBox"
							class="flex h-36 w-36 cursor-pointer justify-center rounded-full border-2 border-dashed border-neutral p-4 text-sm transition hover:border-neutral-focus focus:border-solid focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:bg-neutral-content disabled:opacity-75">
							<div class="flex flex-col items-center justify-center">
								<Icon icon="eva:cloud-upload-outline" class="h-8 w-8 text-primary" />
								<span class="text-center text-xs font-medium">
									Drop an image<br>or
									<span class="link text-primary">browse it</span>
								</span>
							</div>
							<input id="imageInputBox" type="file" class="sr-only" accept=".png, .jpeg, .jpg, .svg"
								@change="changeImage">
						</label>
					</div>
				</div>
				<div>
					<h3 class="text-lg font-semibold leading-6">
						Account Informations
					</h3>
					<p class="max-w-2xl text-sm text-neutral-focus">
						Your personal details you can change anytime.
					</p>
				</div>
			</div>
			<div class="relative -mt-4 flex items-center p-4">
				<div class="grow border-t border-neutral" />
				<span class="mx-4 shrink text-neutral">Details</span>
				<div class="grow border-t border-neutral" />
			</div>
			<div class="flex flex-col items-center gap-4 bg-neutral-focus/10 px-4 py-2 sm:grid sm:grid-cols-3 md:flex-row">
				<p class="flex items-center gap-4 text-sm font-medium text-neutral-focus">
					<Icon class="h-6 w-6 text-primary" icon="eva:person-fill" />
					Your nickname
				</p>
				<input v-model="nickInput" type="text" placeholder="Enter your nickname" minlength="2" maxlength="24"
					pattern="[a-zA-Z0-9]+" :disabled="!changeDetails" required
					class="enabled:add-border w-full rounded-xl text-sm enabled:bg-base-100 enabled:text-neutral disabled:border-0 disabled:bg-transparent sm:col-span-2">
			</div>
			<div class="flex flex-col items-center gap-4 px-4 py-2 sm:grid sm:grid-cols-3 md:flex-row">
				<p class="flex items-center gap-4 text-sm font-medium text-neutral-focus">
					<Icon class="h-6 w-6 text-primary" icon="eva:at-fill" />
					Your email address
				</p>
				<input v-model="emailInput" type="email" placeholder="Enter your email address" required
					pattern="[^@\s]+@[^@\s]+\.[^@\s]+" :disabled="!changeDetails"
					class="enabled:add-border w-full rounded-xl text-sm enabled:bg-base-100 enabled:text-neutral disabled:border-0 disabled:bg-transparent sm:col-span-2">
			</div>
			<div class="flex flex-col items-center gap-4 bg-neutral-focus/10 px-4 py-2 sm:grid sm:grid-cols-3 md:flex-row">
				<p class="flex items-center gap-4 text-sm font-medium text-neutral-focus">
					<Icon class="h-6 w-6 text-primary" icon="eva:lock-fill" />
					Your password
				</p>
				<div class="relative flex w-full sm:col-span-2">
					<input v-model="passwordInput" :type="showPassword ? 'text' : 'password'"
						placeholder="Enter your password" required minlength="8" maxlength="24"
						pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}"
						:disabled="!changeDetails"
						class="enabled:add-border box-border w-full truncate rounded-xl pr-10 text-sm enabled:bg-base-100 enabled:text-neutral disabled:border-0 disabled:bg-transparent">
					<label class="swap absolute inset-y-0 right-0 cursor-pointer pr-2">
						<input v-model="showPassword" type="checkbox" class="modal-toggle">
						<Icon class="swap-off h-6 w-6 text-primary" icon="eva:eye-off-outline" />
						<Icon class="swap-on h-6 w-6 text-primary" icon="eva:eye-outline" />
					</label>
				</div>
			</div>
			<div class="flex justify-between gap-4 p-4">
				<button :disabled="changeDetails" class="btn btn-primary btn-sm" @click="changeDetails = !changeDetails">
					Change details
				</button>
				<button type="submit" :disabled="!changeDetails" class="btn btn-success btn-sm text-base-100">
					Save
				</button>
			</div>
		</form>
		<input id="deleteModal" type="checkbox" class="modal-toggle">
		<label for="deleteModal" class="modal cursor-pointer">
			<label class="modal-box relative flex flex-col items-center justify-center p-4" for="">
				<h3 class="text-center text-lg font-bold">Are you sure you want to delete this account?</h3>
				<p class="py-4 text-center">We're sorry to see you go, but if you're sure you'd like to delete your account
					you can do so by clicking the button below.</p>
				<p class="mb-2 text-sm text-error">This action cannot be undone.</p>
				<label for="deleteModal" class="btn btn-error btn-sm" @click="deleteUser">Delete!</label>
			</label>
		</label>
	</div>
</template>
