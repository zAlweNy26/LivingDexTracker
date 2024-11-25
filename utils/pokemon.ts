export const Games = [
  "RBY", "GS", "C", "RS", "FRLG", "EM", "DP", "HGSS", "Pt", "BW", "B2W2", "XY", "ORAS", "SM", "USUM",
  "LGPE", "Go", "SwSh", "SwSh DLC1 IoA", "SwSh DLC2 CT", "PLA", "SV", "SV DLC1 TM", "SV DLC2 ID"
] as const

export const Regions = ["Kanto", "Johto", "Hoenn", "Sinnoh", "Unova", "Kalos", "Alola", "Real World", "Galar", "Hisui", "Paldea"] as const

export const GenTitles = [
  "<span style='color:#FF1111;'>{0}</span> - <span style='color:#11BB11;'>{1}</span> - <span style='color:#1111FF;'>{2}</span> - <span style='color:#FFD733;'>{3}</span>",
  "<span style='color:#DAA520;'>{0}</span> - <span style='color:#C0C0C0;'>{1}</span> - <span style='color:#4FD9FF;'>{2}</span>",
  "<span style='color:#A00000;'>{0}</span> - <span style='color:#0000A0;'>{1}</span> - <span style='color:#FF7327;'>{2}</span> - <span style='color:#00DD00;'>{3}</span> - <span style='color:#00A000;'>{4}</span>",
  "<span style='color:#AAAAFF;'>{0}</span> - <span style='color:#FFAAAA;'>{1}</span> - <span style='color:#999999;'>{2}</span> - <span style='color:#B69E00;'>{3}</span> - <span style='color:#C0C0E1;'>{4}</span>",
  "<span style='color:#444444;'>{0}</span> - <span style='color:#C3C3C3;'>{1}</span> - <span style='color:#424B50;'>{2}</span> - <span style='color:#E3CED0;'>{3}</span>",
  "<span style='color:#025DA6;'>{0}</span> - <span style='color:#EA1A3E;'>{1}</span> - <span style='color:#AB2813;'>{2}</span> - <span style='color:#26649C;'>{3}</span>",
  "<span style='color:#F2952D;'>{0}</span> - <span style='color:#5599C8;'>{1}</span> - <span style='color:#EE7936;'>{2}</span> - <span style='color:#884799;'>{3}</span> - <span style='color:#ffcf11;'>{4}</span> - <span style='color:#c47e39;'>{5}</span>",
  "<span style='color:#00AEEF;'>{0}</span> - <span style='color:#ED1165;'>{1}</span> - <span style='color:#01A4E7;'>{2}</span> - <span style='color:#C584DD;'>{3}</span> - <span style='color:#CECDBE;'>{4}</span>",
  "<span style='color:#D90D19;'>{0}</span> - <span style='color:#842F8C;'>{1}</span>"
] as const

export const OrderOptions = ["National Dex", "Release", "Region", "Generation", "Alphabetical"] as const
export type Order = typeof OrderOptions[number]

export const FormsPositions = ["Hidden", "Near the original", "After everything"] as const
export type Position = typeof FormsPositions[number]

export const VariantsOptions = ["Generic", "Regional", "Gender", "Unown", "Vivillon", "Alcremie", "Furfrou Styles", "Special Ability", "Events"] as const
export type Variant = typeof VariantsOptions[number]

export const TransformsOptions = ["Generic", "Mega Evolution", "Gigantamax", "Fusions", "Primal Reversion", "Eternamax"] as const
export type Transform = typeof TransformsOptions[number]

export const SpecialsOptions = ["Totem", "Titan", "Arceus", "Silvally", "Partner LGPE", "Eternal Flower", "Stuck"] as const
export type Special = typeof SpecialsOptions[number]

export type Pokemon = {
  index: number
  name: string
  form?: string | undefined
  form_type: string
  living_dex_type: string
  gen: number
  sub_gen: string
  game: number
  region : number
  ndex: string
  form_index: string
  subform_index: string
  gender_id: string
  gmax_id: string
}

export const QuestSpriteTypes = ["Icon", "Model", "Shiny Model"] as const
export type QuestSpriteType = typeof QuestSpriteTypes[number]

export type PokemonQuest = {
  index: number
  name: string
  gen: number
  form_type?: string
  chinese: boolean
  obtainable: boolean
  ndex: string
  form_index?: string
  c_name: string
  style: string
}

export type MagikarpJump = {
  index: number
  english_name: string
  japanese_name: string
  description: string
  type: string
  rod: string
}

export type PokemonConquest = {
  ndex: string
  rgal: string
  name: string
}