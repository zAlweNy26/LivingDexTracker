enum Game {
    "RBY", "GS", "C", "RS", "FRLG", "EM", "DP", "HGSS", "Pt", "BW", "B2W2", "XY", "ORAS", "SM", "USUM",
    "LGPE", "Go", "SwSh", "SwSh DLC1 IoA", "SwSh DLC2 CT", "PLA", "SV", "SV DLC1 TM", "SV DLC2 ID"
}

enum Region {
    "Kanto", "Johto", "Hoenn", "Sinnoh", "Unova", "Kalos", "Alola", "Real World", "Galar", "Hisui", "Paldea"
}

enum GenTitle {
    "Gen. 1: <span style='color:#FF1111;'>Red</span> - <span style='color:#11BB11;'>Green</span> - <span style='color:#1111FF;'>Blue</span> - <span style='color:#FFD733;'>Yellow</span>",
    "Gen. 2: <span style='color:#DAA520;'>Gold</span> - <span style='color:#C0C0C0;'>Silver</span> - <span style='color:#4FD9FF;'>Crystal</span>",
    "Gen. 3: <span style='color:#A00000;'>Ruby</span> - <span style='color:#0000A0;'>Sapphire</span> - <span style='color:#FF7327;'>FireRed</span> - <span style='color:#00DD00;'>LeafGreen</span> - <span style='color:#00A000;'>Emerald</span>",
    "Gen. 4: <span style='color:#AAAAFF;'>Diamond</span> - <span style='color:#FFAAAA;'>Pearl</span> - <span style='color:#999999;'>Platinum</span> - <span style='color:#B69E00;'>HeartGold</span> - <span style='color:#C0C0E1;'>SoulSilver</span>",
    "Gen. 5: <span style='color:#444444;'>Black</span> - <span style='color:#C3C3C3;'>White</span> - <span style='color:#424B50;'>Black 2</span> - <span style='color:#E3CED0;'>White 2</span>",
    "Gen. 6: <span style='color:#025DA6;'>X</span> - <span style='color:#EA1A3E;'>Y</span> - <span style='color:#AB2813;'>Omega Ruby</span> - <span style='color:#26649C;'>Alpha Sapphire</span>",
    "Gen. 7: <span style='color:#F2952D;'>Sun</span> - <span style='color:#5599C8;'>Moon</span> - <span style='color:#EE7936;'>Ultra Sun</span> - <span style='color:#884799;'>Ultra Moon</span> - <span style='color:#ffcf11;'>Let's Go, Pikachu!</span> - <span style='color:#c47e39;'>Let's Go, Eevee!</span>",
    "Gen. 8: <span style='color:#00AEEF;'>Sword</span> - <span style='color:#ED1165;'>Shield</span> - <span style='color:#01A4E7;'>Brilliant Diamond</span> - <span style='color:#C584DD;'>Shining Pearl</span> - <span style='color:#CECDBE;'>Legends: Arceus</span>",
    "Gen. 9: <span style='color:#D90D19;'>Scarlet</span> - <span style='color:#842F8C;'>Violet</span>"
}

const OrderOptions = [ "National Dex", "Release", "Region", "Generation", "Alphabetical" ] as const
type Order = typeof OrderOptions[number]

const FormsPosition = [ "Hidden", "Near the original", "After everything" ] as const
type Position = typeof FormsPosition[number]

const VariantsOptions = [ "Generic", "Regional", "Gender", "Unown", "Vivillon", "Alcremie", "Furfrou Styles", "Special Ability", "Events" ] as const
type Variant = typeof VariantsOptions[number]

const TransformsOptions = [ "Generic", "Mega Evolution", "Gigantamax", "Fusions", "Primal Reversion", "Eternamax" ] as const
type Transform = typeof TransformsOptions[number]

const SpecialsOptions = [ "Totem", "Titan", "Arceus", "Silvally", "Partner LGPE", "Eternal Flower", "Stuck" ] as const
type Special = typeof SpecialsOptions[number]

type Pokemon = {
    index: number
    name: string
    form: string | undefined
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
    original: boolean | undefined
    gmax_id: string
}

const QuestSpriteTypes = [ "Icon", "Model", "Shiny Model" ] as const
type QuestSpriteType = typeof QuestSpriteTypes[number]

type PokemonQuest = {
    index: number,
    name: string,
    gen: number,
    form_type?: string,
    chinese: boolean,
    obtainable: boolean,
    ndex: string,
    form_index?: string,
    c_name: string,
    style: string
}

type MagikarpJump = {
    index: number,
    english_name: string,
    japanese_name: string,
    description: string,
    type: string,
    rod: string
}

export {
    Game, GenTitle, Region, Pokemon, OrderOptions, Order, Position, Variant, Transform, Special,
    FormsPosition, VariantsOptions, TransformsOptions, SpecialsOptions, PokemonQuest,
    QuestSpriteType, QuestSpriteTypes, MagikarpJump
}