export interface BasePokemon {
  index: number
  name: string
  form: string
  formType: string
  living_dex_type: string
  gen: number
  sub_gen: string
  game: number
  region: number
  ndex: string
  form_index: string
  subform_index: string
  gender_id: string
  gmax_id: string
}

export interface FullPokemon {

}

export interface MagikarpJump {
  index: number
  english_name: string
  japanese_name: string
  description: string
  type: string
  rod: string
}

export interface ConquestPokemon {
  rgal: string
  ndex: string
  name: string
}

export interface QuestPokemon {
  index: number
  name: string
  gen: number
  chinese: boolean
  obtainable: boolean
  ndex: string
  c_name: string
  style: string
}
