import type { BasePokemon } from '#shared/utils/interfaces'
import originals from './pokemon_original.json'

export default defineEventHandler(async () => {
  return originals as BasePokemon[]
})
