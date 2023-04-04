import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export interface UserInfo {
    uid: string,
    name: string,
    email: string
}

export interface UserData {
    catchedNormal: number[],
    catchedShiny: number[]
}

export const useUserStore = defineStore('user', () => {
    const userInfo = ref<UserInfo>()
    const userData = ref<UserData>({
        catchedNormal: [],
        catchedShiny: []
    })

    return {
        userInfo, userData
    }
}, { persist: true })

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}