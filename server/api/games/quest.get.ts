import type { QuestPokemon } from '#shared/utils/interfaces'
import pokemons from './pokemon_quest.json'

export default defineEventHandler(async () => {
  return pokemons as QuestPokemon[]
})
