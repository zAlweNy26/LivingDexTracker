import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export interface UserInfo {
    uid: string,
    name: string,
    email: string
}

export const useUserStore = defineStore('user', () => {
    const userInfo = ref<UserInfo>()

    return {
        userInfo
    }
}, { persist: true })

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}