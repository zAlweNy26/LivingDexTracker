<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  auth: {
    only: 'guest',
  },
})

const { t } = useI18n()
const { signUp, signIn } = useAuth()
const { title } = useAppConfig()
const upState = reactive<Partial<SignUpSchema>>({})
const inState = reactive<Partial<SignInSchema>>({})
const swapAuth = ref(true)
const upForm = useTemplateRef('upForm')
const inForm = useTemplateRef('inForm')

function checkStrength(str: string) {
  const requirements = [
    { regex: /.{8,}/, text: t('auth.signup.fields.password.requirements.length') },
    { regex: /\d/, text: t('auth.signup.fields.password.requirements.number') },
    { regex: /[a-z]/, text: t('auth.signup.fields.password.requirements.lowercase') },
    { regex: /[A-Z]/, text: t('auth.signup.fields.password.requirements.uppercase') },
    { regex: /[!@#$%^&*(),.?":{}|<>]/, text: t('auth.signup.fields.password.requirements.special') },
  ]

  return requirements.map(req => ({ met: req.regex.test(str), text: req.text }))
}

const passwordStrength = computed(() => checkStrength(upState.password || ''))
const passwordScore = computed(() => passwordStrength.value.filter(req => req.met).length)

const passwordColor = computed(() => {
  if (passwordScore.value === 0) return 'neutral'
  if (passwordScore.value <= 2) return 'error'
  if (passwordScore.value <= 4) return 'warning'
  return 'success'
})

const passwordText = computed(() => {
  if (passwordScore.value === 0) return t('auth.signup.fields.password.scores.empty')
  if (passwordScore.value <= 2) return t('auth.signup.fields.password.scores.weak')
  if (passwordScore.value <= 4) return t('auth.signup.fields.password.scores.medium')
  return t('auth.signup.fields.password.scores.strong')
})

function switchAuth() {
  swapAuth.value = !swapAuth.value
  if (swapAuth.value) inForm.value?.clear()
  else upForm.value?.clear()
}

async function signSocial(provider: 'google' | 'microsoft' | 'facebook') {
  await signIn.social({
    provider,
    callbackURL: '/dashboard',
  })
}

async function signUpUser(event: FormSubmitEvent<SignUpSchema>) {
  const data = event.data
  await signUp.email({
    email: data.email,
    name: data.username,
    password: data.password,
    callbackURL: '/dashboard',
  }, {
    async onSuccess() {
      await navigateTo('/dashboard')
    },
  })
}

async function signInUser(event: FormSubmitEvent<SignInSchema>) {
  const data = event.data
  await signIn.email({
    email: data.email,
    password: data.password,
    rememberMe: data.rememberMe,
    callbackURL: '/dashboard',
  })
}
</script>

<template>
  <main class="grow flex flex-col items-stretch md:items-center justify-center gap-4 p-2 md:p-4">
    <UContainer>
      <UCard variant="soft" class="relative overflow-hidden" :ui="{ body: 'flex w-full' }">
        <UContainer as="section" class="flex flex-col items-center justify-center gap-4 transition duration-500 ease-in-out md:w-1/2"
                    :class="[swapAuth ? 'absolute translate-x-full pointer-events-none opacity-0 md:!static' : 'translate-x-0 opacity-100']">
          <h1 class="text-2xl md:text-3xl font-bold text-center">
            {{ $t('auth.signin.title') }}
          </h1>
          <p class="text-sm text-center md:hidden">
            <span>{{ $t('auth.signin.help') }}</span>
            <br>
            <span class="font-semibold cursor-pointer text-primary-500 hover:text-primary-400 hover:dark:text-primary-600"
                  @click="switchAuth()">{{ $t('auth.signin.now') }}</span>
          </p>
          <div class="flex gap-4">
            <UButton icon="i-logo-google" square size="lg" variant="soft" loadingAuto class="rounded-full p-3" @click="signSocial('google')" />
            <UButton icon="i-logo-microsoft" square size="lg" variant="soft" loadingAuto class="rounded-full p-3" @click="signSocial('microsoft')" />
            <UButton icon="i-logo-facebook" square size="lg" variant="soft" loadingAuto class="rounded-full p-3" @click="signSocial('facebook')" />
          </div>
          <span class="text-xs">{{ $t('auth.signin.info') }}</span>
          <UForm ref="inForm" class="flex flex-col items-stretch gap-2 w-full" :state="inState"
                 :validateOn="['blur']" :schema="signInSchema" @submit.prevent="signInUser">
            <UFormField name="email" required :label="$t('auth.signin.fields.email.label')">
              <UInput v-model="inState.email" :placeholder="$t('auth.signin.fields.email.placeholder')" class="w-full" />
            </UFormField>
            <UFormField name="password" required :label="$t('auth.signin.fields.password.label')">
              <InputPassword v-model="inState.password" :maxlength="32" :placeholder="$t('auth.signin.fields.password.placeholder')" class="w-full" />
            </UFormField>
            <UCheckbox v-model="inState.rememberMe" :label="$t('auth.signin.fields.rememberMe')" />
            <UButton variant="link" color="neutral" class="text-xs ml-auto" to="/forgot">
              {{ $t('auth.signin.forgot') }}
            </UButton>
            <UButton type="submit" class="mt-2 mx-auto" size="xl" :label="$t('auth.signin.submit')" />
          </UForm>
        </UContainer>
        <UContainer as="section" class="flex flex-col items-center justify-center gap-4 transition duration-500 ease-in-out md:w-1/2"
                    :class="[swapAuth ? 'translate-x-0 opacity-100' : 'absolute -translate-x-full opacity-0 pointer-events-none md:!static']">
          <h1 class="text-2xl md:text-3xl font-bold text-center">
            {{ $t('auth.signup.title') }}
          </h1>
          <p class="text-sm text-center md:hidden">
            <span>{{ $t('auth.signup.help') }}</span>
            <br>
            <span class="font-semibold cursor-pointer text-primary-500 hover:text-primary-400 hover:dark:text-primary-600"
                  @click="switchAuth()">{{ $t('auth.signup.now') }}</span>
          </p>
          <div class="flex gap-4">
            <UButton icon="i-logo-google" square size="lg" variant="soft" loadingAuto class="rounded-full p-3" @click="signSocial('google')" />
            <UButton icon="i-logo-microsoft" square size="lg" variant="soft" loadingAuto class="rounded-full p-3" @click="signSocial('microsoft')" />
            <UButton icon="i-logo-facebook" square size="lg" variant="soft" loadingAuto class="rounded-full p-3" @click="signSocial('facebook')" />
          </div>
          <span class="text-xs">{{ $t('auth.signup.info') }}</span>
          <UForm ref="upForm" class="flex flex-col items-stretch gap-2 w-full" :state="upState"
                 :validateOn="['blur']" :schema="signUpSchema" @submit.prevent="signUpUser">
            <UFormField name="email" required :label="$t('auth.signup.fields.email.label')">
              <UInput v-model="upState.email" :placeholder="$t('auth.signup.fields.email.placeholder')" class="w-full" />
            </UFormField>
            <UFormField name="password" required :label="$t('auth.signup.fields.password.label')" :ui="{ container: 'space-y-2' }">
              <InputPassword v-model="upState.password" :placeholder="$t('auth.signup.fields.password.placeholder')"
                             :maxlength="32" :aria-invalid="passwordScore < 5" aria-describedby="password-strength" class="w-full" />
              <UProgress :color="passwordColor" :indicator="passwordText" :model-value="passwordScore" :max="5" size="sm" />
              <p id="password-strength" class="text-sm font-medium">
                {{ $t('auth.signup.fields.password.mustContain', [passwordText]) }}
              </p>
              <ul class="space-y-1" aria-label="Password requirements">
                <li v-for="(req, index) in passwordStrength" :key="index"
                    class="flex items-center gap-0.5" :class="req.met ? 'text-(--ui-success)' : 'text-(--ui-text-muted)'">
                  <UIcon :name="req.met ? 'i-tabler-circle-check' : 'i-tabler-circle-x'" class="size-4 shrink-0" />
                  <span class="text-xs font-light">
                    {{ req.text }}
                    <span class="sr-only">
                      {{ $t('auth.signup.fields.password.matched', Number(req.met)) }}
                    </span>
                  </span>
                </li>
              </ul>
            </UFormField>
            <UFormField name="passwordConfirmation" required :label="$t('auth.signup.fields.confirmation.label')">
              <InputPassword v-model="upState.passwordConfirmation" :placeholder="$t('auth.signup.fields.confirmation.placeholder')" class="w-full" />
            </UFormField>
            <UButton type="submit" class="mt-2 mx-auto" size="xl" :label="$t('auth.signup.submit')" />
          </UForm>
        </UContainer>
        <UContainer class="bg-primary-500 text-(--ui-bg) absolute left-0 top-0 z-10 hidden h-full flex-col items-center justify-center transition-all duration-500 ease-in-out md:flex md:w-1/2"
                    :class="{ 'translate-x-full': !swapAuth }">
          <Motion v-if="swapAuth" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" class="flex flex-col items-center justify-center gap-4">
            <h3 class="text-3xl font-bold text-center">
              {{ $t('auth.signin.title') }}
            </h3>
            <p class="text-center">
              {{ $t('auth.signin.description', [title]) }}
            </p>
            <UButton :label="$t('auth.signin.submit')" size="xl" color="neutral" variant="subtle" @click="switchAuth()" />
          </Motion>
          <Motion v-else :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" class="flex flex-col items-center justify-center gap-4">
            <h3 class="text-3xl font-bold text-center">
              {{ $t('auth.signup.title') }}
            </h3>
            <p class="text-center">
              {{ $t('auth.signup.description', [title]) }}
            </p>
            <UButton :label="$t('auth.signup.submit')" size="xl" color="neutral" variant="subtle" @click="switchAuth()" />
          </Motion>
        </UContainer>
      </UCard>
    </UContainer>
  </main>
</template>
