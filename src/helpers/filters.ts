const basicFilter = (name: string, formIndex: number) => {
	return !(
		(name == 'Scatterbug' && ![0, 1].includes(formIndex)) ||
		(name == 'Spewpa' && formIndex != 0) ||
		(name == 'Mothim' && formIndex != 0) ||
		(name == "Minior" && (formIndex != 0 && formIndex < 7)) ||
		(name == 'Koraidon' && ![0, 1].includes(formIndex)) ||
		(name == 'Miraidon' && ![0, 1].includes(formIndex))
	)
}

const onlyRegionals = (form: string) => ["Alolan", "Galarian", "Hisuian", "Paldean"].some(r => form.includes(r))
const onlyTotems = (form: string) => form.includes("Totem")
const onlyMega = (form: string) => form.includes("Mega")
const onlyGiga = (form: string) => form.includes("Gigantamax")
const onlyTitan = (form: string) => form.includes("Titan")
const onlyFemale = (form: string) => form.includes("Female")
const onlyPrimal = (form: string) => form.includes("Primal")
const onlyEterna = (form: string) => form.includes("Eternamax")
const onlyFusions = (form: string, formType: string) => formType.includes("Fusion") || form.includes("Ultra form")
const onlyLGPE = (name: string, subGen: string) => subGen.includes("LGPE") && (name == "Pikachu" || name == "Eevee")
const onlyAlcremie = (name: string, form: string) => name.includes("Alcremie") && !form.includes("Vanilla Cream - Strawberry Sweet")
const onlyUnown = (name: string, formIndex: number) => name == 'Unown' && formIndex != 5
const onlyFurfrou = (name: string, formIndex: number) => name == 'Furfrou' && formIndex != 0
const onlyAbility = (formType: string) => formType.includes("Ability")
const onlyEvents = (form: string, formType: string) => formType.includes("Event") || form.includes("Cap")
const onlyVivillon = (name: string, formIndex: number) => {
	return ((name == 'Vivillon' && formIndex != 6) || (name == 'Scatterbug' && formIndex != 0))
}

const onlyVariantsGeneric = (name: string, formIndex: number) => {
	return (
		(name == 'Deoxys' && formIndex != 0) || (name == 'Burmy' && formIndex != 0) || (name == 'Wormadam' && formIndex != 0) ||
		(name == 'Shellos' && formIndex != 0) || (name == 'Gastrodon' && formIndex != 0) || (name.includes('Rotom') && formIndex != 0) ||
		(name == 'Shaymin' && formIndex != 0) || (name == 'Basculin' && formIndex != 0) ||
		(name == 'Deerling' && formIndex != 0) || (name == 'Sawsbuck' && formIndex != 0) || (name == 'Tornadus' && formIndex != 0) ||
		(name == 'Thundurus' && formIndex != 0) || (name == 'Landorus' && formIndex != 0) ||
		(name == 'Keldeo' && formIndex != 0) || (name == 'Flabébé' && formIndex != 0) || (name == 'Floette' && formIndex != 0) ||
		(name == 'Florges' && formIndex != 0) || (name == 'Pumpkaboo' && formIndex != 0) ||
		(name == 'Gourgeist' && formIndex != 0) || (name == 'Minior' && formIndex > 7) || (name == 'Zygarde' && formIndex == 1) ||
		(name == 'Lycanroc' && formIndex != 0) || (name == 'Oricorio' && formIndex != 0) ||
		(name == 'Sinistea' && formIndex != 0) || (name == 'Polteageist' && formIndex != 0) || (name == 'Toxtricity' && formIndex != 0) ||
		(name == 'Urshifu' && formIndex != 0) || (name == 'Enamorus' && formIndex != 0) ||
		(name == 'Maushold' && formIndex != 1) || (name == 'Squawkabilly' && formIndex != 0) || (name == 'Tatsugiri' && formIndex != 0) ||
		(name == 'Dudunsparce' && formIndex != 0) || (name == 'Gimmighoul' && formIndex != 0)
	)
}

const onlyTransformsGeneric = (name: string, formIndex: number) => {
	return (
		(name == "Minior" && formIndex == 0) || (name == "Zygarde" && formIndex == 4)
	) /*(
		(name == 'Castform' && formIndex != 0) || (name == 'Deoxys' && formIndex != 0) || 
		(name == 'Burmy' && formIndex != 0) ||  (name == 'Wormadam' && formIndex != 0) || 
		(name == 'Cherrim' && formIndex != 0) || (name == 'Shellos' && formIndex != 0) || 
		(name == 'Gastrodon' && formIndex != 0) || (name.includes('Rotom') && formIndex != 0) || 
		(name == 'Dialga' && formIndex != 0) || (name == 'Palkia' && formIndex != 0) || 
		(name == 'Giratina' && formIndex != 0) || (name == 'Shaymin' && formIndex != 0) || 
		(name == 'Arceus' && formIndex != 0) || (name == 'Basculin' && formIndex != 0) || 
		(name == 'Deerling' && formIndex != 0) || (name == 'Sawsbuck' && formIndex != 0) || 
		(name == 'Darmanitan' && formIndex != 0) || (name == 'Tornadus' && formIndex != 0) || 
		(name == 'Thundurus' && formIndex != 0) || (name == 'Landorus' && formIndex != 0) || 
		(name == 'Keldeo' && formIndex != 0) || 
		(name == 'Meloetta' && formIndex != 0) || (name == 'Genesect' && formIndex != 0) ||
		(name == 'Flabébé' && formIndex != 0) || (name == 'Floette' && formIndex != 0) ||
		(name == 'Florges' && formIndex != 0) || (name == 'Furfrou' && formIndex != 0) ||
		(name == 'Aegislash' && formIndex != 0) || (name == 'Pumpkaboo' && formIndex != 0) ||
		(name == 'Gourgeist' && formIndex != 0) || (name == "Minior" && formIndex != 7) ||
		(name.includes("Pichu") && formIndex != 0) || (name == 'Xerneas' && formIndex != 1) || 
		(name == 'Zygarde' && formIndex != 0) || (name == 'Rockruff' && formIndex != 0) || 
		(name == 'Lycanroc' && formIndex != 0) || (name == 'Wishiwashi' && formIndex != 0) || 
		(name == 'Hoopa' && formIndex != 0) || (name == 'Oricorio' && formIndex != 0) || 
		(name == 'Silvally' && formIndex != 0) || (name == 'Mimikyu' && ![0, 2].includes(formIndex)) || 
		(name == 'Magearna' && formIndex != 0) ||
		(name == 'Sinistea' && formIndex != 0) || (name == 'Polteageist' && formIndex != 0) ||
		(name == 'Cramorant' && formIndex != 0) || (name == 'Toxtricity' && formIndex != 0) ||
		(name == 'Eiscue' && formIndex != 0) || (name == 'Morpeko' && formIndex != 0) ||
		(name == 'Zacian' && formIndex != 1) || (name == 'Zamazenta' && formIndex != 1) ||
		(name == 'Urshifu' && formIndex != 0) || (name.includes('Zarude') && formIndex != 0) ||
		(name == 'Enamorus' && formIndex != 0) || 
		(name == 'Maushold' && formIndex != 1) || (name == 'Squawkabilly' && formIndex != 0) ||
		(name == 'Palafin' && formIndex != 0) || (name == 'Tatsugiri' && formIndex != 0) ||
		(name == 'Dudunsparce' && formIndex != 0) || (name == 'Gimmighoul' && formIndex != 0) ||
		(name == 'Koraidon' && formIndex != 0) || (name == 'Miraidon' && formIndex != 0)
	)*/
}

export {
    basicFilter,
    onlyRegionals,
    onlyAbility,
    onlyAlcremie,
    onlyEterna,
    onlyEvents,
    onlyFemale,
    onlyFurfrou,
    onlyFusions,
    onlyGiga,
    onlyLGPE,
    onlyMega,
    onlyPrimal,
    onlyTitan,
    onlyTotems,
    onlyTransformsGeneric,
    onlyUnown,
    onlyVariantsGeneric,
    onlyVivillon
}