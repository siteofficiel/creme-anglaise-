# 🎵 Guide de l'espace administrateur — Crème Anglaise

L'espace admin est accessible ici :
**https://siteofficiel.github.io/creme-anglaise-/admin.html**
(ou via le petit lien « ⚙ Admin » tout en bas du site)

Il permet — **sans toucher au code** — de :

- 📸 **Ajouter des photos** dans la galerie (glisser-déposer)
- 🎬 **Ajouter des vidéos** dans la section vidéos (glisser-déposer)
- ✏️ **Modifier les légendes / titres** en français et en anglais
- ↕️ **Réorganiser** l'ordre d'affichage
- 🗑 **Supprimer** une photo ou une vidéo

Tout est enregistré directement dans le dépôt GitHub. GitHub Pages republie
le site automatiquement : les changements sont visibles en **1 à 2 minutes**.

---

## 0. Mot de passe d'accès

À l'ouverture de la page admin, un **mot de passe** vous est demandé
(demandez-le au bureau de l'association — ne l'écrivez pas publiquement).
Il filtre l'accès à la page ; la modification réelle du site reste protégée
par le jeton GitHub (étape 1 ci-dessous).

---

## 1. Créer votre jeton d'accès (à faire une seule fois)

L'espace admin est protégé par un **jeton GitHub personnel** : seules les
personnes possédant un jeton avec droit d'écriture sur le dépôt peuvent
modifier le site.

1. Connectez-vous au compte GitHub **siteofficiel** (ou un compte ayant accès au dépôt).
2. Allez sur : https://github.com/settings/personal-access-tokens/new
3. Remplissez :
   - **Token name** : `Admin site chorale`
   - **Expiration** : 1 an (ou « No expiration »)
   - **Repository access** : *Only select repositories* → cochez `creme-anglaise-`
   - **Permissions → Repository permissions → Contents** : `Read and write`
4. Cliquez **Generate token** et **copiez le jeton** (il commence par `github_pat_…`).
5. Collez-le dans la page admin. Cochez « Se souvenir de moi » pour ne pas
   avoir à le ressaisir sur cet appareil.

⚠️ **Ne partagez jamais ce jeton publiquement** (ne le mettez pas dans un
fichier du site, un mail de groupe, etc.). Toute personne qui le possède
peut modifier le dépôt. En cas de doute, supprimez-le sur GitHub
(Settings → Fine-grained tokens → Revoke) et créez-en un nouveau.

---

## 2. Ajouter une photo

1. Section **Galerie photos** → cliquez sur la zone en pointillés
   (ou glissez-déposez vos fichiers dessus).
2. La photo est envoyée sur GitHub et apparaît dans la liste.
3. Personnalisez sa **légende française** et sa **caption anglaise**.
4. Cochez « Grande photo » si vous voulez qu'elle occupe 2 colonnes.
5. Cliquez **💾 Publier les modifications** (barre en bas de l'écran).

Conseils : format JPG/PNG/WebP, idéalement **moins de 2 Mo** par photo
(redimensionnez à ~1600 px de large avant l'envoi pour un site rapide).

## 3. Ajouter une vidéo

1. Section **Nos vidéos** → même principe (clic ou glisser-déposer).
2. Format **MP4 uniquement**, **maximum ~90 Mo** (limite technique de GitHub —
   au-delà, compressez la vidéo, par ex. avec HandBrake, ou hébergez-la sur
   YouTube).
3. Personnalisez le titre et la description FR/EN, puis **Publier**.

## 4. Modifier, renommer, réorganiser, supprimer

Toutes les photos et vidéos **déjà présentes sur le site** apparaissent
automatiquement dans les listes à la connexion — y compris les fichiers
ajoutés à la main dans les dossiers `images/` ou `videos/` du dépôt.

- **Modifier un texte** : tapez directement dans les champs, puis « Publier ».
- **✏️ Renommer** : change le nom du fichier dans le dépôt (ex. `photo-1.jpg`
  → `concert-eglise-2024.jpg`). Le site est mis à jour automatiquement ;
  l'extension du fichier est conservée.
- **Monter / Descendre** : change l'ordre d'affichage sur le site (enregistré aussitôt).
- **Supprimer** : retire l'élément du site **et** efface le fichier du dépôt (confirmation demandée).

---

## Comment ça marche (technique)

- Les photos/vidéos affichées sur `fr.html` et `en.html` sont pilotées par le
  fichier **`media.json`** à la racine du dépôt.
- La page **`admin.html`** utilise l'API GitHub (endpoint *Contents*) pour
  téléverser les fichiers dans `images/` et `videos/`, et met à jour
  `media.json`. Chaque action crée un commit sur la branche `main`.
- GitHub Pages redéploie automatiquement à chaque commit.
- Si `media.json` est absent ou inaccessible, le site affiche le contenu
  statique de secours déjà présent dans les pages.
