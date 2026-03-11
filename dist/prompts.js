"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPrompts = registerPrompts;
const zod_1 = require("zod");
function registerPrompts(server) {
    // ── szerzodes-attekintes ─────────────────────────────────────────────
    server.prompt("szerzodes-attekintes", `Szerződések áttekintése, dashboard. Használd amikor a felhasználó általános képet szeretne a szerződéseiről, statisztikákat kér, vagy "mutasd a szerződéseimet" jellegű kérést fogalmaz meg.`, {
        szuro: zod_1.z
            .string()
            .optional()
            .describe("Szűrő: aktív, lejárt, tervezet, vagy mind (alapértelmezett: mind)"),
    }, ({ szuro }) => ({
        messages: [
            {
                role: "user",
                content: {
                    type: "text",
                    text: `Adj átfogó képet a szerződéseimről. Kövesd ezt a munkafolyamatot:

## 1. Adatgyűjtés (párhuzamosan)

Hívd meg egyszerre:
- \`contract_list\` — az összes szerződés lekérése (első oldal)
- \`contract_get_expiring\` \`days_ahead: 30\` — 30 napon belül lejáró szerződések
- \`user_info\` — felhasználói adatok és előfizetés

## 2. Összesítés

Készíts egy áttekinthető összefoglalót:

### Megjelenítés formátum

\`\`\`
📊 Szerződés áttekintés
═══════════════════════

👤 Felhasználó: [név] | Csomag: [előfizetés típus]

📋 Összesen: [X] szerződés
   ✅ Aláírt: [N]
   ⏳ Várakozó: [N]
   📝 Tervezet: [N]

⚠️  Lejáró (30 napon belül): [N]
   - [szerződés neve] — lejár: [dátum]
   - [szerződés neve] — lejár: [dátum]

📈 Legutóbbi szerződések:
   - [név] ([partner]) — [státusz] — [dátum]
\`\`\`

## 3. Szűrő

${szuro ? `A felhasználó a következő szűrőt kérte: "${szuro}".
- "aktív" vagy "active": csak az érvényes, aláírt szerződéseket mutasd
- "lejárt" vagy "expired": csak a lejárt szerződéseket
- "tervezet" vagy "draft": csak a tervezeteket` : "Nincs szűrő megadva, mutass mindent."}

## Fontos

- Mindig magyar nyelven válaszolj
- A dátumokat YYYY.MM.DD formátumban jelenítsd meg
- Ha nincs szerződés, javasolj sablon keresést: "Szeretnéd megnézni az elérhető sablonokat?"
- Ha sok a lejáró szerződés, emeld ki figyelmeztetésként`,
                },
            },
        ],
    }));
    // ── szerzodes-letrehozas ─────────────────────────────────────────────
    server.prompt("szerzodes-letrehozas", `Új szerződés létrehozása sablonból lépésről lépésre. Használd amikor a felhasználó szerződést akar készíteni, létrehozni, vagy "csinálj egy NDA-t" jellegű kérést fogalmaz meg.`, {
        sablon: zod_1.z
            .string()
            .optional()
            .describe("Sablon neve vagy típusa, pl: NDA, bérleti, megbízási"),
    }, ({ sablon }) => ({
        messages: [
            {
                role: "user",
                content: {
                    type: "text",
                    text: `Segíts új szerződést létrehozni. Kövesd szigorúan ezt a sorrendet:

## 1. Sablon keresés

Hívd meg a \`template_list\` tool-t az elérhető sablonok lekéréséhez.

${sablon ? `A felhasználó a következő típusú sablont kérte: "${sablon}".
Keresd meg a legmegfelelőbb sablont. Ha több is illeszkedik, kérdezd meg melyiket szeretné.` : "Nincs sablon megadva. Listázd az elérhető sablonokat és kérdezd meg melyiket válassza."}

## 2. Sablon mezők lekérése

A kiválasztott sablonhoz hívd meg:
- \`template_get\` — sablon struktúra
- \`template_get_fields\` — kitöltendő mezők

## 3. Mezők megjelenítése

Mutasd a kitöltendő mezőket táblázatban:

\`\`\`
📝 Sablon: [sablon neve]

Kitöltendő mezők:
┌──────────────────┬──────────┬─────────────┐
│ Mező             │ Típus    │ Kötelező?   │
├──────────────────┼──────────┼─────────────┤
│ partner_name     │ szöveg   │ ✅ igen     │
│ start_date       │ dátum    │ ✅ igen     │
│ value            │ szám     │ ❌ nem      │
└──────────────────┴──────────┴─────────────┘
\`\`\`

Kérd meg a felhasználót, hogy adja meg az értékeket.

## 4. Szerződés létrehozása

Ha minden kötelező mező megvan:
- Hívd meg a contract_create tool-t a sablon ID-vel és a megadott mezőértékekkel
- FIGYELEM - SZIGORÚ VALIDÁCIÓS SZABÁLYOK:
  1. partner_type kötelező, ha partner_details meg van adva (1: Magánszemély, 2: Cég).
  2. Magánszemélynél (1) KÖTELEZŐ: mothers_name, birthday, place_of_birth, phone, address.
  3. A partner email címe NEM lehet ugyanaz, mint a saját (bejelentkezett) email címed.
  4. 3-oldalú (vagy több) szerződésnél az indítón kívül legalább annyi különböző, egyedi partner_details-t és emailt kell átadni, ahány oldalú a sablon. (Pl. 3 oldalúhoz 2 db különböző partner kell).
- HTTP 400 Bad Request esetén mindig vizsgáld meg a nyers API válasz testét (response.data) a pontos hibaok kiderítéséhez!
- Mutasd az eredményt: szerződés ID, név, link

## 5. Következő lépések

Sikeres létrehozás után kínáld fel:
- "Szeretnéd meghívni a partnert aláírásra?" → contract_send_invitation
- "Szeretnél megjegyzést fűzni hozzá?" → contract_add_comment
- "Szeretnéd megosztani a szerződést?" → contract_create_shared_link

## Fontos

- Magyar nyelven kommunikálj
- Ne hozz létre szerződést amíg a felhasználó nem hagyta jóvá a mezőértékeket
- Ha a felhasználó PDF-ből vagy HTML-ből akar szerződést, használd a contract_create_from_pdf vagy contract_create_from_html tool-t
- Dátumokat YYYY-MM-DD formátumban küldd az API-nak`,
                },
            },
        ],
    }));
    // ── lejaro-szerzodesek ───────────────────────────────────────────────
    server.prompt("lejaro-szerzodesek", `Lejáró szerződések ellenőrzése és figyelmeztetés. Használd amikor a felhasználó lejáró szerződésekről kérdez, "mi jár le hamarosan", vagy időszakos ellenőrzést kér.`, {
        napok: zod_1.z
            .string()
            .optional()
            .describe("Napok száma (alapértelmezett: 30)"),
    }, ({ napok }) => {
        const days = napok ? parseInt(napok, 10) || 30 : 30;
        return {
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: `Ellenőrizd a hamarosan lejáró szerződéseket és adj részletes riportot.

## 1. Adatlekérés

Hívd meg a \`contract_get_expiring\` tool-t \`days_ahead: ${days}\` paraméterrel.

## 2. Riport megjelenítése

### Ha vannak lejáró szerződések:

\`\`\`
⚠️  Lejáró szerződések — következő ${days} nap
════════════════════════════════════════════

🔴 Kritikus (7 napon belül):
   1. [szerződés neve]
      Partner: [partner név]
      Lejárat: [dátum] (még [X] nap)
      Státusz: [státusz]

🟡 Figyelem (8-14 nap):
   2. [szerződés neve]
      ...

🟢 Közelgő (15+ nap):
   3. [szerződés neve]
      ...

Összesen: [N] szerződés jár le ${days} napon belül
\`\`\`

### Ha nincs lejáró szerződés:

\`\`\`
✅ Nincs lejáró szerződés a következő ${days} napban!
\`\`\`

## 3. Kategorizálás

Csoportosítsd sürgősség szerint:
- 🔴 **Kritikus**: 7 napon belül lejár
- 🟡 **Figyelem**: 8-14 napon belül
- 🟢 **Közelgő**: 15+ napon belül

## 4. Javaslatok

Minden lejáró szerződéshez kínálj lehetőségeket:
- "Szeretnéd megújítani?"
- "Szeretnéd értesíteni a partnert?" → \`contract_send_invitation\`

## Fontos

- Magyar nyelven válaszolj
- Dátumokat YYYY.MM.DD formátumban jelenítsd meg
- Mindig add meg a hátralévő napok számát is
- A kritikus (7 napon belüli) szerződéseket mindig emeld ki`,
                    },
                },
            ],
        };
    });
    // ── szerzodes-riport ─────────────────────────────────────────────────
    server.prompt("szerzodes-riport", `Részletes szerződés riport és statisztika generálás. Használd amikor a felhasználó riportot, összefoglalót, kimutatást kér a szerződéseiről.`, {
        tipus: zod_1.z
            .string()
            .optional()
            .describe("Riport típusa: teljes, partner, sablon, vagy státusz (alapértelmezett: teljes)"),
    }, ({ tipus }) => ({
        messages: [
            {
                role: "user",
                content: {
                    type: "text",
                    text: `Készíts átfogó riportot a szerződéseimről.

## 1. Adatgyűjtés (párhuzamosan)

Hívd meg egyszerre:
- \`contract_list\` — összes szerződés (lapozd végig, max 10 oldal)
- \`contract_get_expiring\` \`days_ahead: 90\` — lejáró szerződések (3 hónap)
- \`party_list\` — partnerek listája
- \`template_list\` — elérhető sablonok
- \`user_info\` — felhasználói adatok

## 2. Riport típus

${tipus ? `A felhasználó a következő típusú riportot kérte: "${tipus}".
- "teljes": teljes riport minden statisztikával
- "partner": csak partner-központú elemzés
- "sablon": csak sablon használati statisztika
- "státusz" vagy "statusz": csak státusz megoszlás` : "Teljes riportot készíts minden statisztikával."}

## 3. Riport formátum

\`\`\`
📊 Szerződés riport
══════════════════════════════════════
Generálva: [mai dátum]

📋 ÖSSZEFOGLALÓ
   Összes szerződés: [N]
   Aktív partnerek:  [N]
   Elérhető sablonok: [N]

📈 STÁTUSZ MEGOSZLÁS
   ✅ Aláírt:    [N] ([%]%)
   📝 Tervezet:  [N] ([%]%)
   ⏳ Várakozó:  [N] ([%]%)
   ❌ Lejárt:    [N] ([%]%)

⚠️  LEJÁRÓ SZERZŐDÉSEK
   30 napon belül:  [N]
   60 napon belül:  [N]
   90 napon belül:  [N]

👥 TOP PARTNEREK
   1. [partner név] — [N] szerződés
   2. [partner név] — [N] szerződés
   3. [partner név] — [N] szerződés

📄 SABLON HASZNÁLAT
   Leggyakoribb: [sablon név] ([N]x használva)
   Nem használt sablonok: [lista]

💡 JAVASLATOK
   - [javaslat a lejáró szerződések kezelésére]
   - [javaslat a nem használt sablonok törlésére]
\`\`\`

## Fontos

- Magyar nyelven válaszolj
- Százalékokat 1 tizedesre kerekítsd
- Dátumokat YYYY.MM.DD formátumban
- Adj gyakorlati javaslatokat az adatok alapján`,
                },
            },
        ],
    }));
    // ── partner-kereso ───────────────────────────────────────────────────
    server.prompt("partner-kereso", `Partner keresés és a partner szerződéseinek áttekintése. Használd amikor a felhasználó egy adott partnerről kérdez, partnert keres, vagy "mi a helyzet a Kovács Kft-vel" jellegű kérést fogalmaz meg.`, {
        partner: zod_1.z
            .string()
            .optional()
            .describe("Partner neve, email címe vagy cégneve"),
    }, ({ partner }) => ({
        messages: [
            {
                role: "user",
                content: {
                    type: "text",
                    text: `Keress meg egy partnert és mutasd a szerződéseit.

## 1. Partner keresés

${partner ? `Hívd meg a \`party_search\` tool-t a következő kereséssel: "${partner}".
Ha több találat van, listázd őket és kérdezd meg melyikre gondoltam.` : "Hívd meg a `party_list` tool-t. Mutasd a partnerek listáját és kérdezd meg melyikről kérek részleteket."}

## 2. Partner szerződései

A kiválasztott partnerhez hívd meg a \`party_contracts\` tool-t.

## 3. Megjelenítés

\`\`\`
👤 Partner: [partner neve]
   Email: [email]
   Cég: [cégnév]
═══════════════════════════

📋 Szerződések ([N] db):

   1. [szerződés neve]
      Típus: [típus] | Státusz: [státusz]
      Létrehozva: [dátum] | Lejárat: [dátum]

   2. [szerződés neve]
      ...

📊 Összesítés:
   Aktív: [N] | Lejárt: [N] | Tervezet: [N]
\`\`\`

## 4. Műveletek felajánlása

- "Szeretnél új szerződést létrehozni ezzel a partnerrel?"
- "Szeretnéd megnézni valamelyik szerződés részleteit?" → \`contract_get\`
- "Szeretnél meghívót küldeni egy várakozó szerződéshez?" → \`contract_send_invitation\`
- "Szeretnéd letölteni valamelyik szerződést?" → \`document_get_download_url\`

## Fontos

- Magyar nyelven válaszolj
- Ha a partner nem található, javasolj hasonló neveket a \`party_list\` alapján
- Csoportosítsd a szerződéseket státusz szerint
- Emeld ki ha van lejáró vagy aláíratlan szerződés`,
                },
            },
        ],
    }));
    // ── statusz-automata ─────────────────────────────────────────────────
    server.prompt("statusz-automata", `Szerződések státuszának automatikus ellenőrzése és eszkalálása. Használd amikor a felhasználó arra kér, hogy vizsgáld felül az elakadt vagy lejáró szerződéseket és frissítsd a belső státuszukat.`, {
        napok: zod_1.z
            .string()
            .optional()
            .describe("Hány nap után tekintünk egy várakozó szerződést elakadt/eszkalált állapotúnak (alap: 7)"),
    }, ({ napok }) => {
        const waitDays = napok ? parseInt(napok, 10) || 7 : 7;
        return {
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: `Nézd át a szerződéseimet és frissítsd a belső státuszokat a következő szabályok alapján.
              
## 1. Adatok lekérése

Hívd meg a következő végpontokat:
- \`contract_list\` — az aktív szerződések lekéréséhez (első pár oldal, hogy lásd a "Waiting for signature" vagy "Draft" dolgokat)
- \`contract_status_list\` — hogy lásd, milyen belső státusz nevek (pl. "Eskalált", "Sürgős", "Elakadt") érhetőek el a rendszerben.

## 2. Szabályok és feltételek

Elemezd a lekérdezett szerződéseket a jelenlegi dátum és a szerződés létrehozási/lejárati dátuma alapján.

### A. Aláírásra várók eszkalációja
Ha egy szerződés státusza "Waiting for signature" (Aláírásra vár), és már több mint **${waitDays} napja** küldték ki (a \`contract_created\` mező alapján):
- Javasold a belső státusz felülírását egy figyelemfelhívó státuszra (pl. "Eskalált", "Késik", "Sürgős" — válassz egyet a \`contract_status_list\` alapján)
- Opcionálisan javasold a \`contract_resend_invitation\` hívását az emlékeztetéshez.

### B. Lejáró szerződések
Hívd meg a \`contract_get_expiring\` tool-t (pl. 14 vagy 30 napra).
Ha találsz a közeljövőben lejáró szerződést:
- Javasold a belső státusz átállítását "Lejáró" vagy "Felülvizsgálat szükséges" státuszra (a létező státuszokból).

## 3. Akcióterv prezentálása

Mielőtt bármit módosítanál, mutasd be az eredményedet egy táblázatban a felhasználónak:

\`\`\`
🤖 Státusz Automata - Eredmények
════════════════════════════════════

Találtam [N] db szerződést, ami beavatkozást igényel.

🔴 ESZKALÁLÁS JAVASOLT (${waitDays}+ napja várakozik)
1. [Szerződés Neve]
   - Jelenlegi állapot: [Tényleges belső státusz]
   - Javasolt módosítás: 👉 [Új belső státusz]
   - Megjegyzés: [X] napja vár aláírásra. (Emlékeztető küldése javasolt)

⚠️ KÖZELGŐ LEJÁRAT JAVASOLT
2. [Szerződés Neve]
   - Jelenlegi állapot: [Tényleges belső státusz]
   - Javasolt módosítás: 👉 [Új belső státusz]
   - Megjegyzés: [lejárat dátuma]-kor lejár.

Jóváhagyod, hogy végrehajtsam a fenti státusz módosításokat (\`contract_update_status\`)?
\`\`\`

## 4. Végrehajtás
Ha a felhasználó jóváhagyja, használd a \`contract_update_status\` parancsot ciklusban (párhuzamosítva a megfelelő belső státusz STRING elnevezésekkel) és jelentsd, mikor kész vagy.`,
                    },
                },
            ],
        };
    });
    // ── munkatars-hozzaadasa ─────────────────────────────────────────────
    server.prompt("munkatars-hozzaadasa", `Új munkatárs meghívása a rendszerbe egyénileg szabályozott jogosultságokkal (4 kategória) és aláírási engedéllyel.`, {}, () => ({
        messages: [
            {
                role: "user",
                content: {
                    type: "text",
                    text: `Vegyél fel egy új munkatársat a fiókba. 

A művelethez szükséges, hogy interaktívan, lépésről lépésre kérd be a szükséges adatokat tőlem, az alábbi sorrendben:

## 1. Munkatárs azonosítása
Kérdezd meg, hogy mi az új munkatárs **email címe**. (Ha már megadtam a promptban, ugord át ezt a lépést).

## 2. Szerepkör / Jogosultsági kategória
4 kategóriába csoportosítottuk a jogosultságokat. Kérdezd meg, hogy melyiket szeretném adni neki, és magyarázd el röviden, hogy melyik mit jelent:
  1. **Admin**: Mindent kezelhet.
  2. **Szerkesztő**: Sablonokat is frissíthet (a kezelői jogokon felül).
  3. **Kezelő**: Szerződéseket hozhat létre és küldhet ki, de sablont nem módosíthat.
  4. **Néző**: Csak a szerződések megtekintésére jogosult.

## 3. Aláírási jog
Külön kérdezd meg: *Kérjen-e a fiókhoz aláírási jogot is az új kolléga? (Igen / Nem)*

## 4. Jóváhagyás és Végrehajtás
Ha mind a három információt megkaptad (Email, Kategória, Aláírási jog), készíts egy rövid, áttekinthető összesítőt a megadott adatokkal, és kérj egy végső jóváhagyást.

Miután jóváhagytam, hívd meg a \`coworker_add\` tool-t. 
*(Technikai megjegyzés a végrehajtáshoz: passzold át a kért kategóriát és aláírási paramétert, amennyiben a tool támogatja őket).*`
                }
            }
        ]
    }));
    // ── folyamat-letrehozas ──────────────────────────────────────────────
    server.prompt("folyamat-letrehozas", `Egyedi munkafolyamatok / kanban táblák létrehozása. Az AI segít belső státuszok generálásában a kiválasztott folyamat alapján.`, {}, () => ({
        messages: [
            {
                role: "user",
                content: {
                    type: "text",
                    text: `Hozz létre belső státuszokat a fiókomban, amikkel leképezhetünk egy komplett üzleti munkafolyamatot!

Első lépésként ajánld fel nekem az alábbi 9 előre definiált munkafolyamatot, és kérdezd meg, hogy melyiket szeretném bevezetni:

1. 💼 **Értékesítési / Sales folyamat**: Lead → Tárgyalás alatt → Szerződés előkészítése → Megnyert → Elvesztett
2. 👥 **HR / Toborzás folyamat**: Interjú → Ajánlat kiküldve → Szerződés várható → Onboarding → Aktív
3. 📦 **Beszerzési folyamat**: Igény felmerült → Árajánlatok → Szállító kiválasztva → Tárgyalás alatt → Lezárt
4. 🏠 **Ingatlan / Bérleti folyamat**: Érdeklődő → Megtekintés → Előkészítés → Beköltözés → Kiköltözött
5. ⚖️ **Jogi / Jóváhagyási folyamat**: Tervezet véleményezés → Belső jóváhagyás → Pénzügyi jóváhagyás → Ügyvezetői jóváhagyás → Véglegesített
6. 🎓 **Oktatási / Képzési folyamat**: Jelentkezés befogadva → Szerződés kiküldve → Fizetésre vár → Képzés folyamatban → Tanúsítvány kiadva
7. 🚗 **Gépjármű / Flottakezelési folyamat**: Igény leadva → Ajánlat kiküldve → Szerződés aláírva → Jármű átadva → Leadva / Lezárt
8. 🤝 **Partneri / Viszonteladói folyamat**: Érdeklődő → NDA aláírva → Folyamatban lévő tárgyalás → Partneri szerződés aktív → Inaktív
9. 🛠️ **Szolgáltatás / Projekt folyamat**: Ajánlatadás → Szerződéskötés → Előkészítés → Teljesítés alatt → Lezárt / Kiszámlázva

## 2. Megerősítés és Színek/Ikonok
Miután választottam (pl. az 1-est), listázd ki mik lesznek a státuszok pontos nevei, és javasolj hozzájuk valamilyen stílusos, a logikához és fázishoz illő színkódot (pl. #3498db) illetve ikont (Material UI/FontAwesome jellegű nevét, mert általában azt várja a backend). Kérdd a jóváhagyásomat.

## 3. Végrehajtás
Ha jóváhagytam, használd a \`contract_status_create\` eszközt egyenként (vagy párhuzamosan), hogy létrehozd az összes fázist mint új belső státuszt a rendszeremben. Add át a nevet, szint és ikont a végpontnak.`
                }
            }
        ]
    }));
    // ── branding-beallitasa ──────────────────────────────────────────────
    server.prompt("branding-beallitasa", `Egyedi arculat (branding) beállítása: logók, színek és stílusok proaktív testreszabása és aktiválása. Használd amikor a felhasználó meg akarja változtatni a szerződések vagy e-mailek kinézetét, vagy egy weboldal alapján kéri az arculat beállítását.`, {}, () => ({
        messages: [
            {
                role: "user",
                content: {
                    type: "text",
                    text: `Segíts beállítani az egyedi arculatomat (branding) az Eszerződés.hu fiókomban. 

Kövesd az alábbi munkafolyamatot:

## 1. Cég azonosítása
Ha nem adtam meg, kérdezd meg mi a **cégem neve** vagy a **weboldalam címe (URL)**. 

## 2. Arculati elemek kinyerése (Kreatív elemzés)
Ha megadtam egy URL-t (pl. https://www.eszerzodes.hu):
- Próbáld meg kinyerni a logó elérhetőségét, a domináns márkaszíneket (HEX) és ha van, egy jellegzetes háttérképet a weboldalról.
- Prezentáld nekem, amit találtál, és kérj jóváhagyást az alkalmazásukra.

## 3. Beállítás és Aktiválás (Minden egyben)
A cél az, hogy ne csak elmentsük az adatokat, hanem **be is kapcsoljuk** a modulokat. Az alábbiakat állítsd be és aktiváld a jóváhagyásom után:
- **Értesítő email fejléce**: Kép beállítása és aktiválása (\`contract_email_heading_enabled: true\`).
- **Szerződés fejléc - Logó**: Logó beállítása és aktiválása (\`contract_header_logo_enabled: true\`).
- **Szerződés stílusa**: Színek, háttérkép beállítása és a stílus aktiválása (\`contract_style_enabled: true\`).
- **Egyedi kísérőlevél**: Állíts be egy alapértelmezett, profi szöveget az értesítő e-mailekhez (\`email_text\`), és engedélyezd a küldéskori szerkesztést (\`contract_email_edit_enabled: true\`).

## 4. Technikai szabályok és Validáció
A \`user_branding_update\` tool hívása előtt ügyelj a következőkre:
- **Színek**: Csak érvényes HEX kód (#RRGGBB).
- **Címsorok kiemelő színe**: A \`contract_email_background_color\` paramétert használd címsorok kiemeléséhez. Figyelj a **kontrasztarányra**: a szín legyen minimum 50%-kal sötétebb (vagy sötét irányba megfelelő kontrasztú), ha a márkaszín túl világos, hogy az e-mailekben olvasható maradjon a szöveg.
- **Képek**: Tájékoztass a korlátokról (Logó/Email fejléc: max 200KB, Háttér: max 300KB).
- **Email szöveg**: Segíts megfogalmazni egy profi, az arculathoz illő alapértelmezett kísérőlevelet. (Max 5000 karakter).
- **Jogosultságok**: Az arculat módosításához olyan Bearer tokenre van szükség, amely rendelkezik a "user:write" hatókörrel (scope). Ha a művelet jogosultsági hiba miatt meghiúsul, kérd meg a felhasználót, hogy generáljon egy új tokent ezzel a jogosultsággal a [https://www.eszerzodes.hu/api-tokens](https://www.eszerzodes.hu/api-tokens) oldalon.

## 5. Összegzés és Végrehajtás
Mutass egy látványos összefoglalót a tervezett változásokról:
- Milyen színek és képek lesznek beállítva (külön kiemelve a címsorok kódját).
- Mi lesz a kísérőlevél alapértelmezett szövege.
- Mely modulok lesznek bekapcsolva (Email fejléc, Logó, Stílus, Szerkeszthetőség).

A jóváhagyásom után hajtsd végre a módosításokat.

Mindig magyarul válaszolj, légy segítőkész és stílusos!`,
                },
            },
        ],
    }));
    // ── api-token-segitseg ──────────────────────────────────────────────
    server.prompt("api-token-segitseg", `Segítség az API kulcs (Bearer token) beszerzéséhez. Használd ha a felhasználó nem találja vagy nem tudja hol kell generálni a tokent az Eszerződés.hu-n.`, {}, () => ({
        messages: [
            {
                role: "user",
                content: {
                    type: "text",
                    text: `Hogyan tudok API kulcsot (Bearer tokent) szerezni az Eszerződés.hu fiókomhoz?
            
Az API token beszerzéséhez kövesd az alábbi lépéseket:
1. Lépj be a fiókodba az [eszerzodes.hu](https://www.eszerzodes.hu) oldalon.
2. Kattints a jobb felső sarokban a nevedre, majd válaszd a **Beállítások** menüpontot.
3. A bal oldali menüben válaszd az **API** opciót.
4. Közvetlen link: [https://www.eszerzodes.hu/api-tokens](https://www.eszerzodes.hu/api-tokens)
5. Itt tudsz új "Személyes hozzáférési tokent" (Bearer token) generálni. 
6. Adj neki egy nevet (pl. "Claude MCP"), és válaszd ki a szükséges jogosultságokat. 
   - *Tipp: Ha az arculatot is szeretnéd AI-val módosítani, ne felejtsd el bejelölni a \`user:write\` jogosultságot!*
   
A generált tokent másold ki és használd az MCP szerver konfigurációjában.`
                }
            }
        ]
    }));
}
//# sourceMappingURL=prompts.js.map