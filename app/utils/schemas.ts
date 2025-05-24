import { z } from 'zod'

export const signUpSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(32),
  password: z.string().min(8).max(32),
  passwordConfirmation: z.string().min(8).max(32),
}).refine(data => data.password === data.passwordConfirmation, {
  path: ['passwordConfirmation'],
  params: {
    i18n: 'errors.auth.notMatch',
  },
})

export type SignUpSchema = z.infer<typeof signUpSchema>

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
  rememberMe: z.boolean().default(false),
})

export type SignInSchema = z.infer<typeof signInSchema>
