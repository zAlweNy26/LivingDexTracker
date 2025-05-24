import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { tables as schema, useDrizzle } from './drizzle'

let _auth: ReturnType<typeof betterAuth>

export function serverAuth() {
  if (!_auth) {
    _auth = betterAuth({
      database: drizzleAdapter(useDrizzle(), { provider: 'sqlite', schema, usePlural: true }),
      secondaryStorage: {
        get: key => hubKV().getItemRaw(`_auth:${key}`),
        set: (key, value, ttl) => {
          return hubKV().set(`_auth:${key}`, value, { ttl })
        },
        delete: key => hubKV().del(`_auth:${key}`),
      },
      baseURL: process.env.BETTER_AUTH_URL!,
      session: {
        cookieCache: {
          enabled: true,
          maxAge: 5 * 60, // Cache duration in seconds
        },
      },
      emailAndPassword: {
        enabled: true,
        minPasswordLength: 8,
        maxPasswordLength: 32,
        requireEmailVerification: false,
        async sendResetPassword(data, request) {
          // Implement sending reset password email
          console.log(`Sending reset password email to ${data}`)
          console.log(`Request: ${request}`)
        },
      },
      account: {
        accountLinking: {
          enabled: true,
          trustedProviders: ['google', 'facebook', 'microsoft'],
        },
      },
      socialProviders: {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          prompt: 'select_account',
        },
        facebook: {
          clientId: process.env.FACEBOOK_CLIENT_ID!,
          clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        },
        microsoft: {
          clientId: process.env.MICROSOFT_CLIENT_ID!,
          clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
          requireSelectAccount: true,
        },
      },
    }) as unknown as typeof _auth
  }
  return _auth
}
