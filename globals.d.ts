import { ImportMeta, ImportMetaEnv } from 'vite/types/importMeta'

interface ImportMetaEnvCustom extends Readonly<Record<string, string>> {
    readonly PUBLIC_FIREBASE_API_KEY: string
    readonly PUBLIC_AUTH_DOMAIN: string
    readonly PUBLIC_DB_URL: string
    readonly PUBLIC_PROJECT_ID: string
    readonly PUBLIC_STORAGE_BUCKET: string
    readonly PUBLIC_MESSAGING_SENDER_ID: string
    readonly PUBLIC_APP_ID: string
    readonly PUBLIC_CAPTCHA_KEY: string
}

interface ImportMeta extends ImportMeta {
    readonly env: ImportMetaEnvCustom & ImportMetaEnv
}