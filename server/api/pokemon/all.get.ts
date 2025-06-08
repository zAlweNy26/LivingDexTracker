import type { BasePokemon } from '#shared/utils/interfaces'
import pokemons from './pokemon_all.json'

export default defineEventHandler(async () => {
  return pokemons as BasePokemon[]
})
