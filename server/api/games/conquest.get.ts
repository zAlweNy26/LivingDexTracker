import type { ConquestPokemon } from '#shared/utils/interfaces'
import pokemons from './pokemon_conquest.json'

export default defineEventHandler(async () => {
  return pokemons as ConquestPokemon[]
})
