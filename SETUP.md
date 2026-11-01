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

## Je recepten op een nieuw toestel

Je eigen recepten staan **niet** online — enkel de app. Op een nieuw toestel
begint Njam leeg; tik dan op **Importeer je recepten** (of ⚙️ Instellingen →
Importeer back-up) en kies een back-upbestand. Je 31 recepten uit de oude
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
