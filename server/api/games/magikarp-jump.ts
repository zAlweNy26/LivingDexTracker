import type { MagikarpJump } from '#shared/utils/interfaces'
import magikarps from './magikarp_jump.json'

export default defineEventHandler(async () => {
  return magikarps as MagikarpJump[]
})
