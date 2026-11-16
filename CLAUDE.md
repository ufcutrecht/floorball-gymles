# Floorball gymles — werkafspraken voor Claude

Losse app "Floorball gymles" voor leerkrachten bewegingsonderwijs. Live op
https://ufcutrecht.github.io/floorball-gymles/ (GitHub Pages, branch `main`, map root).
Alles wat op `main` komt, staat binnen een paar minuten live.

## Zo werk je in dit repository

Dezelfde afspraken als in `ufcutrecht/floorball-training` (zie de CLAUDE.md daar):
- Werk je voor Remco (GitHub-account `remcovoort`): direct op `main`. Voor meebouwers: eigen
  branch en pull request.
- Begin vanaf de nieuwste `main`, test op telefoon- en desktopbreedte zonder consolefouten en
  **blokkeer bij het testen alle verzoeken naar Supabase**.
- Test lokaal met beide repositories naast elkaar in één map (bijvoorbeeld `site/floorball-gymles`
  en `site/floorball-training`) en start `python3 -m http.server` in `site/`; deze app laadt
  `../floorball-training/`.
- Hoog bij elke wijziging aan html, js of json de cacheversie op in `sw.js`
  (`const CACHE = "gymles-vN"` → `vN+1`).

## Opbouw

| Pad | Wat |
| --- | --- |
| `index.html` | Startpagina "Floorball in de gymles", lijst `PROGRAMS`, accenten per leeftijd, verwijzing naar UFC Utrecht (ufcutrecht.nl). Aantallen uit `../floorball-training/shared/exercises.json`. |
| `gymles/`, `o12/` | Laadpagina's: groep 3–6 en groep 7–8. Bevatten geen oefeningen. |
| `loader.js` | Laadt `../floorball-training/<programma>/index.html` in, met `FB_APP`: logo, tekst "gymles" onder het logo, woorden ("gymles" i.p.v. "training"), kopteksten per programma, eigen manifest, iconen en service worker. |
| `manifest.webmanifest`, `sw.js` | Offline-app en "zet op beginscherm" (naam "Floorball gymles"). De service worker ruimt alleen eigen caches (`gymles-…`) op, want de trainersapp gebruikt hetzelfde domein. |
| `icons/` | UFC-logo en app-iconen met "GYMLES" eronder (`gymles-*.png`). |

## Belangrijke regels

- **Oefeningen wijzig je nooit hier**, maar in `floorball-training` (`gymles/` of `o12/`).
  Welke oefeningen hier zichtbaar zijn, bepaalt het label `apps` daar.
- `FB_APP.id` blijft `"gymzaal"`: daaraan hangen de scores van deze app in Supabase en het
  filter in de programmapagina's.
- Programma toevoegen: map `<id>/` met dezelfde laadpagina, regel in `PROGRAMS` in `index.html`,
  kopteksten in `loader.js` en de bestanden in `CORE` van `sw.js`.
- Taal: Nederlands, kort en duidelijk, "gymles" in plaats van "training". Geen nadruk op techniek
  of team; op school gaat het om meedoen, bewegen en plezier.
