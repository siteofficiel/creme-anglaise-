/* ============================================================
   Données du site Crème Anglaise — répertoire & programmes
   Modifiable à la main : respectez bien les virgules et guillemets.
   lang : "fr" = 🇫🇷 · "en" = 🇬🇧 · "bilingual" = 🌍 · "other" = 🌐
   ============================================================ */

var SONGS = [
  /* ---- Français ---- */
  { title: "For me formidable", lang: "fr" },
  { title: "Sur le chemin des andes", lang: "fr" },
  { title: "Armstrong", lang: "fr" },
  { title: "Les Mains d'or", lang: "fr" },
  { title: "Laissons entrer le soleil", lang: "fr" },
  { title: "Santiano", lang: "fr" },
  { title: "Les gens qu'on aime", lang: "fr" },
  { title: "Cantique Jean Racine", lang: "fr" },
  { title: "Les Copains d'abord", lang: "fr" },
  { title: "Hymne à l'amour", lang: "fr" },
  { title: "Je te donne", lang: "fr" },
  { title: "J'ai demandé à la lune", lang: "fr" },
  { title: "Mamma Mia (FR)", lang: "fr" },
  { title: "Sous le ciel de Paris", lang: "fr" },
  { title: "La Dame Brune", lang: "fr" },
  { title: "Le Pouvoir des fleurs", lang: "fr" },
  { title: "Quand on n'a que l'amour", lang: "fr" },
  { title: "Vois sur ton chemin", lang: "fr" },
  { title: "Vivre pour les meilleurs", lang: "fr" },
  /* ---- Anglais ---- */
  { title: "Ain't no mountain high enough", lang: "en" },
  { title: "Blame it on the Boogie", lang: "en" },
  { title: "Hit the Road Jack", lang: "en" },
  { title: "I'm Still Standing", lang: "en" },
  { title: "Revival Song", lang: "en" },
  { title: "You'll never walk Alone", lang: "en" },
  { title: "The Rhythm of Life", lang: "en" },
  { title: "Armstrong (EN)", lang: "en" },
  { title: "Lean on Me", lang: "en" },
  { title: "Another Day of Sun", lang: "en" },
  { title: "Hallelujah", lang: "en" },
  { title: "Stand by Me", lang: "en" },
  { title: "This Is Me", lang: "en" },
  { title: "Yellow", lang: "en" },
  { title: "Rolling in the deep", lang: "en" },
  { title: "Shallow", lang: "en" },
  { title: "Fields of Gold", lang: "en" },
  { title: "Oh Happy Day", lang: "en" },
  { title: "In Memoriam", lang: "en" },
  { title: "Your Song", lang: "en" },
  { title: "The Joker & The Queen", lang: "en" },
  /* ---- Bilingues ---- */
  { title: "Do you hear the people sing", lang: "bilingual" },
  { title: "Aux Champs-Élysées / Waterloo Road", lang: "bilingual" },
  { title: "La Mer / Beyond the sea", lang: "bilingual" },
  { title: "Les Feuilles mortes / Autumn Leaves", lang: "bilingual" },
  { title: "Le lion est mort ce soir", lang: "bilingual" },
  /* ---- Autres langues ---- */
  { title: "Ave Maria", lang: "other" },
  { title: "El condor pasa / Sur le chemin des andes", lang: "other" },
  { title: "Malaika", lang: "other" },
  { title: "Vois sur ton chemin (latin)", lang: "other" }
];

/* Deux exemples de programme de concert (15 titres chacun) */
var PROGRAMS = [
  {
    title_fr: "Fête de la Musique",
    title_en: "Music Day (Fête de la Musique)",
    sub_fr: "Programme d'environ 42 minutes · 15 titres",
    sub_en: "Around 42 minutes · 15 songs",
    songs: [
      "For me formidable",
      "Ain't no mountain high enough",
      "Sur le chemin des andes",
      "Blame it on the Boogie",
      "Hit the Road Jack",
      "Armstrong",
      "I'm Still Standing",
      "Aux Champs-Élysées / Waterloo Road",
      "Santiano",
      "Les Mains d'or",
      "Laissons entrer le soleil",
      "Vois sur ton chemin",
      "Revival Song",
      "You'll never walk Alone",
      "The Rhythm of Life"
    ]
  },
  {
    title_fr: "Concert en EHPAD",
    title_en: "Care-home concert",
    sub_fr: "Programme d'environ 45 minutes · 15 titres",
    sub_en: "Around 45 minutes · 15 songs",
    songs: [
      "For me formidable",
      "Sur le chemin des andes",
      "Ave Maria",
      "Les Copains d'abord",
      "Armstrong",
      "Cantique Jean Racine",
      "Les gens qu'on aime",
      "Les Mains d'or",
      "Laissons entrer le soleil",
      "Vois sur ton chemin",
      "Hymne à l'amour",
      "Santiano",
      "Revival Song",
      "You'll never walk Alone",
      "The Rhythm of Life"
    ]
  }
];
