# Floorball gymles

Floorball-oefeningen voor de gymles (groep 3–8), met animaties en zaalindeling. Stel een gymles samen, print hem als pdf en geef oefeningen een score van 1 tot 5 sterren.

Open de app: **https://ufcutrecht.github.io/floorball-gymles/**

## Hoe het werkt

Deze app bevat zelf geen oefeningen. De oefeningen staan in de trainersapp,
[ufcutrecht/floorball-training](https://github.com/ufcutrecht/floorball-training), en worden daar
ook gewijzigd. `loader.js` laadt de programmapagina uit de trainersapp in en toont die met het
UFC Utrecht-logo, de gymles-iconen en "gymles" in plaats van "training".

| Programma hier | Komt uit | Voor |
| --- | --- | --- |
| `gymles/` | `floorball-training/gymles/` | groep 3–6 |
| `o12/` | `floorball-training/o12/` | groep 7–8 |

Welke oefeningen in deze app te zien zijn, bepaalt het label `apps` in de trainersapp
(zie de CLAUDE.md daar).

## Meebouwen

De werkafspraken (ook voor Claude) staan in `CLAUDE.md`.
