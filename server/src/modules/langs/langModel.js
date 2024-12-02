
import { sequelize, DataTypes } from "../../config/db.js";


export const Lang = sequelize.define('lang', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    abbreviation: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    timestamps: false
})

export const createLangs = async () => {
    try {
        await Lang.bulkCreate([
            { abbreviation: 'sq', name: 'Albanian' },
            { abbreviation: 'eu', name: 'Basque' },
            { abbreviation: 'be', name: 'Belarusian' },
            { abbreviation: 'bs', name: 'Bosnian' },
            { abbreviation: 'br', name: 'Breton' },
            { abbreviation: 'bg', name: 'Bulgarian' },
            { abbreviation: 'ca', name: 'Catalan' },
            { abbreviation: 'kw', name: 'Cornish' },
            { abbreviation: 'co', name: 'Corsican' },
            { abbreviation: 'hr', name: 'Croatian' },
            { abbreviation: 'cs', name: 'Czech' },
            { abbreviation: 'da', name: 'Danish' },
            { abbreviation: 'nl', name: 'Dutch' },
            { abbreviation: 'en', name: 'English' },
            { abbreviation: 'et', name: 'Estonian' },
            { abbreviation: 'fo', name: 'Faroese' },
            { abbreviation: 'fi', name: 'Finnish' },
            { abbreviation: 'fr', name: 'French' },
            { abbreviation: 'gl', name: 'Galician' },
            { abbreviation: 'de', name: 'German' },
            { abbreviation: 'el', name: 'Greek' },
            { abbreviation: 'hu', name: 'Hungarian' },
            { abbreviation: 'ga', name: 'Irish' },
            { abbreviation: 'is', name: 'Icelandic' },
            { abbreviation: 'it', name: 'Italian' },
            { abbreviation: 'lb', name: 'Luxembourgish' },
            { abbreviation: 'lt', name: 'Lithuanian' },
            { abbreviation: 'lv', name: 'Latvian' },
            { abbreviation: 'mk', name: 'Macedonian' },
            { abbreviation: 'mt', name: 'Maltese' },
            { abbreviation: 'nb', name: 'Norwegian Bokmål' },
            { abbreviation: 'nn', name: 'Norwegian Nynorsk' },
            { abbreviation: 'no', name: 'Norwegian' },
            { abbreviation: 'pl', name: 'Polish' },
            { abbreviation: 'pt', name: 'Portuguese' },
            { abbreviation: 'rm', name: 'Romansh' },
            { abbreviation: 'ro', name: 'Romanian|Moldavian' },
            { abbreviation: 'ru', name: 'Russian' },
            { abbreviation: 'sc', name: 'Sardinian' },
            { abbreviation: 'sr', name: 'Serbian' },
            { abbreviation: 'gd', name: 'Scottish Gaelic|Gaelic' },
            { abbreviation: 'es', name: 'Spanish|Castilian' },
            { abbreviation: 'sv', name: 'Swedish' },
            { abbreviation: 'sk', name: 'Slovak' },
            { abbreviation: 'sl', name: 'Slovene' },
            { abbreviation: 'tr', name: 'Turkish' },
            { abbreviation: 'uk', name: 'Ukrainian' },
            { abbreviation: 'wa', name: 'Walloon' },
            { abbreviation: 'cy', name: 'Welsh' },
            { abbreviation: 'fy', name: 'Western Frisian' },
            { abbreviation: 'yi', name: 'Yiddish' },
            { abbreviation: 'kl', name: 'Kalaallisut|Greenlandic' },
            { abbreviation: 'ay', name: 'Aymara' },
            { abbreviation: 'cr', name: 'Cree' },
            { abbreviation: 'gn', name: 'Guaraní' },
            { abbreviation: 'ht', name: 'Haitian' },
            { abbreviation: 'ik', name: 'Inupiaq' },
            { abbreviation: 'iu', name: 'Inuktitut' },
            { abbreviation: 'nv', name: 'Navajo' },
            { abbreviation: 'oj', name: 'Ojibwe' },
            { abbreviation: 'qu', name: 'Quechua' },
            { abbreviation: 'ab', name: 'Abkhaz' },
            { abbreviation: 'aa', name: 'Afar' },
            { abbreviation: 'af', name: 'Afrikaans' },
            { abbreviation: 'ak', name: 'Akan' },
            { abbreviation: 'am', name: 'Amharic' },
            { abbreviation: 'ar', name: 'Arabic' },
            { abbreviation: 'an', name: 'Aragonese' },
            { abbreviation: 'hy', name: 'Armenian' },
            { abbreviation: 'as', name: 'Assamese' },
            { abbreviation: 'av', name: 'Avaric' },
            { abbreviation: 'ae', name: 'Avestan' },
            { abbreviation: 'az', name: 'Azerbaijani' },
            { abbreviation: 'bm', name: 'Bambara' },
            { abbreviation: 'ba', name: 'Bashkir' },
            { abbreviation: 'bn', name: 'Bengali' },
            { abbreviation: 'bh', name: 'Bihari' },
            { abbreviation: 'bi', name: 'Bislama' },
            { abbreviation: 'my', name: 'Burmese' },
            { abbreviation: 'ch', name: 'Chamorro' },
            { abbreviation: 'ce', name: 'Chechen' },
            { abbreviation: 'ny', name: 'Chichewa' },
            { abbreviation: 'zh', name: 'Chinese' },
            { abbreviation: 'cv', name: 'Chuvash' },
            { abbreviation: 'dv', name: 'Divehi' },
            { abbreviation: 'dz', name: 'Dzongkha' },
            { abbreviation: 'ee', name: 'Ewe' },
            { abbreviation: 'fj', name: 'Fijian' },
            { abbreviation: 'ff', name: 'Fula' },
            { abbreviation: 'ka', name: 'Georgian' },
            { abbreviation: 'gu', name: 'Gujarati' },
            { abbreviation: 'ha', name: 'Hausa' },
            { abbreviation: 'he', name: 'Hebrew' },
            { abbreviation: 'hz', name: 'Herero' },
            { abbreviation: 'hi', name: 'Hindi' },
            { abbreviation: 'ho', name: 'Hiri Motu' },
            { abbreviation: 'id', name: 'Indonesian' },
            { abbreviation: 'ig', name: 'Igbo' },
            { abbreviation: 'ja', name: 'Japanese' },
            { abbreviation: 'jv', name: 'Javanese' },
            { abbreviation: 'kn', name: 'Kannada' },
            { abbreviation: 'kr', name: 'Kanuri' },
            { abbreviation: 'ks', name: 'Kashmiri' },
            { abbreviation: 'kk', name: 'Kazakh' },
            { abbreviation: 'km', name: 'Khmer|Cambodian' },
            { abbreviation: 'ki', name: 'Kikuyu' },
            { abbreviation: 'rw', name: 'Kinyarwanda' },
            { abbreviation: 'ky', name: 'Kyrgyz' },
            { abbreviation: 'kv', name: 'Komi' },
            { abbreviation: 'kg', name: 'Kongo' },
            { abbreviation: 'ko', name: 'Korean' },
            { abbreviation: 'ku', name: 'Kurdish' },
            { abbreviation: 'kj', name: 'Kwanyama' },
            { abbreviation: 'lg', name: 'Ganda' },
            { abbreviation: 'li', name: 'Limburgish' },
            { abbreviation: 'ln', name: 'Lingala' },
            { abbreviation: 'lo', name: 'Lao' },
            { abbreviation: 'lu', name: 'Luba-Katanga' },
            { abbreviation: 'gv', name: 'Manx' },
            { abbreviation: 'mg', name: 'Malagasy' },
            { abbreviation: 'ms', name: 'Malay' },
            { abbreviation: 'ml', name: 'Malayalam' },
            { abbreviation: 'mi', name: 'Māori' },
            { abbreviation: 'mr', name: 'Marathi' },
            { abbreviation: 'mh', name: 'Marshallese' },
            { abbreviation: 'mn', name: 'Mongolian' },
            { abbreviation: 'na', name: 'Nauru' },
            { abbreviation: 'nd', name: 'North Ndebele' },
            { abbreviation: 'ne', name: 'Nepali' },
            { abbreviation: 'ng', name: 'Ndonga' },
            { abbreviation: 'ii', name: 'Nuosu' },
            { abbreviation: 'nr', name: 'South Ndebele' },
            { abbreviation: 'oc', name: 'Occitan' },
            { abbreviation: 'om', name: 'Oromo' },
            { abbreviation: 'or', name: 'Oriya' },
            { abbreviation: 'os', name: 'Ossetian|Ossetic' },
            { abbreviation: 'pa', name: 'Panjabi|Punjabi' },
            { abbreviation: 'pi', name: 'Pāli' },
            { abbreviation: 'fa', name: 'Persian' },
            { abbreviation: 'ps', name: 'Pashto' },
            { abbreviation: 'rn', name: 'Kirundi' },
            { abbreviation: 'sa', name: 'Sanskrit' },
            { abbreviation: 'sd', name: 'Sindhi' },
            { abbreviation: 'se', name: 'Northern Sami' },
            { abbreviation: 'sm', name: 'Samoan' },
            { abbreviation: 'sg', name: 'Sango' },
            { abbreviation: 'sn', name: 'Shona' },
            { abbreviation: 'si', name: 'Sinhala' },
            { abbreviation: 'so', name: 'Somali' },
            { abbreviation: 'st', name: 'Southern Sotho' },
            { abbreviation: 'su', name: 'Sundanese' },
            { abbreviation: 'sw', name: 'Swahili' },
            { abbreviation: 'ss', name: 'Swati' },
            { abbreviation: 'ta', name: 'Tamil' },
            { abbreviation: 'te', name: 'Telugu' },
            { abbreviation: 'tg', name: 'Tajik' },
            { abbreviation: 'th', name: 'Thai' },
            { abbreviation: 'ti', name: 'Tigrinya' },
            { abbreviation: 'bo', name: 'Tibetan' },
            { abbreviation: 'tk', name: 'Turkmen' },
            { abbreviation: 'tl', name: 'Tagalog' },
            { abbreviation: 'tn', name: 'Tswana' },
            { abbreviation: 'to', name: 'Tonga' },
            { abbreviation: 'ts', name: 'Tsonga' },
            { abbreviation: 'tt', name: 'Tatar' },
            { abbreviation: 'tw', name: 'Twi' },
            { abbreviation: 'ty', name: 'Tahitiani' },
            { abbreviation: 'ug', name: 'Uighur' },
            { abbreviation: 'ur', name: 'Urdu' },
            { abbreviation: 'uz', name: 'Uzbek' },
        ])
    } catch (error) {
        console.error('Failed to import langs:', error);
    }
}