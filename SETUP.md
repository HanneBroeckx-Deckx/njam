# Njam — installeren en gebruiken

Het logo staat in `logo.webp`. De accentkleuren van de app komen daaruit:
bordeaux `#550C0C` en crème `#ECDBCD` (logo, knoppen, hoeveelheden). De
vlakken zijn neutraal: warm gebroken wit in licht thema, espressobruin in
donker thema.

## Lokaal uitproberen

Deze app heeft geen installatie of server nodig — het is gewoon een map met
statische bestanden. Om lokaal te testen:

```
python -m http.server 4174
```

en open dan `http://localhost:4174` in je browser.

## Online

De app staat op **https://hannebroeckx-deckx.github.io/njam/** (GitHub Pages,
repository `HanneBroeckx-Deckx/njam`). Elke wijziging die naar de `main`-branch
gepusht wordt, staat na een minuutje live.

## Op je gsm installeren

- **Android (Chrome):** open de link, tik op het installatie-bannertje
  bovenaan (of menu **⋮ → App installeren**).
- **iPhone (Safari):** open de link, tik op **Deel**, en dan op
  **"Zet op beginscherm"**.

## Inloggen met Google instellen (eenmalig)

Zodra `firebase-config.js` is ingevuld, vraagt Njam om in te loggen met Google.
Iedereen krijgt dan een eigen receptenboek dat in de cloud bewaard wordt en op
al zijn/haar toestellen hetzelfde is. Recepten die al op een toestel stonden,
gaan bij de eerste keer inloggen automatisch mee naar het account. Zolang
`firebase-config.js` nog `VUL_HIER_IN` bevat, werkt de app zonder login.

1. Ga naar https://console.firebase.google.com en klik **Project toevoegen**.
   Naam: `njam`. Google Analytics mag uit.
2. **Build → Authentication → Get started** → tab **Sign-in method** →
   **Google** → **Enable**. Vul bij *Public-facing name* `Njam` in, kies je
   e-mailadres als support-e-mail en klik **Save**.
3. Nog in Authentication: tab **Settings** → **Authorized domains** →
   **Add domain** → `hannebroeckx-deckx.github.io`.
4. **Build → Firestore Database → Create database** → locatie in Europa
   (bv. `eur3`) → **production mode**. Ga naar het tabblad **Rules**, vervang
   alles door het volgende en klik **Publish** (zo kan iedereen enkel bij zijn
   eigen recepten):

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{uid}/recipes/{recipeId} {
         allow read, write: if request.auth != null && request.auth.uid == uid;
       }
     }
   }
   ```
5. Tandwiel linksboven → **Project settings** → **General** → onderaan bij
   **Your apps** het web-icoon `</>` → bijnaam `njam-web` (Firebase Hosting
   niet aanvinken) → **Register app**. Kopieer de waarden uit het blokje
   `const firebaseConfig = { ... }` naar `firebase-config.js`.

## Je recepten op een nieuw toestel

Je eigen recepten staan **niet** in de publieke GitHub-repository — enkel de
app. Met login staan ze in je account en zie je ze na het inloggen op elk
toestel. Zonder login begint Njam op een nieuw toestel leeg; tik dan op
**Importeer je recepten** (of ⚙️ Instellingen → Importeer back-up) en kies een
back-upbestand. Een import komt met login meteen in je account terecht. Je 31 recepten uit de oude
Word-documenten staan in `seed-recipes.json` in deze map (die map staat in
OneDrive, dus je vindt het bestand ook via de OneDrive-app op je gsm).

`seed-recipes.json` staat bewust in `.gitignore`: het wordt nooit mee naar
GitHub gepusht. Lokaal (op `localhost`) laadt de app het wel automatisch de
eerste keer.

## Een recept fotograferen (bv. uit een kookboek)

Tik op **+ → 📸 Foto maken**. De camera opent, je fotografeert het recept, en
de app zet het er **automatisch als gewoon recept** bij: titel, ingrediënten
(met hoeveelheden, zodat het op- en afschalen werkt), bereidingsstappen,
aantal personen en labels. De foto zelf wordt niet bewaard. Een foto of PDF
die al op je toestel staat, kies je via **🖼️ Foto of PDF kiezen**.

Het recept opent meteen met een balkje "Automatisch ingelezen". Loop het
even na: klopt alles, tik op **Klopt ✓**; zit er een fout in, tik op
**Bewerken**.

Voor het beste resultaat: leg het boek plat, zorg voor veel licht, fotografeer
recht van boven en zet enkel het recept in beeld. Schaduw (van je hand of de
rug van het boek) en twee kolommen naast elkaar kan de app aan; handgeschreven
recepten lukken meestal niet.

Alles gebeurt op je eigen toestel — de foto gaat nergens naartoe. De eerste
keer is er wel internet nodig om de tekstherkenning te downloaden.

## Je recepten zijn lokaal

Alle recepten staan opgeslagen in de browser van je toestel (IndexedDB), niet
in de cloud. Maak af en toe een back-up via **⚙️ Instellingen → Exporteer
back-up** — dat downloadt een JSON-bestand dat je later weer kan importeren,
ook op een ander toestel.
