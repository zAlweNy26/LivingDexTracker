import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  schema: ['./server/database/auth-schema.ts', './server/database/schema.ts'],
  out: './server/database/migrations',
  dbCredentials: {
    url: process.env.NUXT_DATABASE_URL!,
  },
})
