# Eszerződés.hu MCP Szerver

Az Eszerződés.hu MCP szerver lehetővé teszi, hogy AI eszközökkel (Claude, Cursor, stb.) természetes nyelven kezeld a szerződéseidet.

---

## Gyors telepítés

### 1. Klónozás és build

```bash
git clone https://github.com/WiredSign/eszerzodes-mcp.git
cd eszerzodes-mcp
npm install
npm run build
```

### 2. Szerver indítása

```bash
# Fejlesztéshez (automatikus újratöltés)
npm run dev

# Éles környezetben
npm start
```

A szerver a `http://localhost:3000` címen indul el.

### 3. Docker (opcionális)

```bash
npm run build
docker compose up -d
```

---

## Beállítás

### API kulcs konfigurálása

A szerver az Eszerződés.hu API-val kommunikál a te nevedben. Ehhez szüksége van a Bearer tokenedre.

**A) Közvetlen token használat (fejlesztéshez)**

Egyszerűen küldd el az Eszerződés.hu API tokenedet az `Authorization` headerben:

```
Authorization: Bearer <az_eszerzodes_hu_api_tokened>
```

**B) MCP kulcs leképezés (éles környezethez)**

Hozz létre egyedi MCP kulcsokat (`ESZ_MCP_` prefixszel), és környezeti változókkal képezd le őket:

```bash
# Egyedi kulcsonként
export MCP_KEY_ugyfel1="eszerzodes_hu_bearer_token_ide"

# Vagy JSON map-ként
export MCP_KEY_MAP='{"ESZ_MCP_ugyfel1":"token1","ESZ_MCP_ugyfel2":"token2"}'
```

Ezután a kliens az `ESZ_MCP_ugyfel1` kulcsot küldi, a szerver pedig leképezi a valódi tokenre.

---

## Csatlakozás AI eszközökből

### Claude Desktop

Add hozzá a `claude_desktop_config.json` fájlhoz:

```json
{
  "mcpServers": {
    "eszerzodes": {
      "url": "http://localhost:3000/mcp",
      "headers": {
        "Authorization": "Bearer <API_TOKENED>"
      }
    }
  }
}
```

**Fájl helye:**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

### Claude Code (CLI)

```bash
claude mcp add eszerzodes --transport http http://localhost:3000/mcp \
  -H "Authorization: Bearer <API_TOKENED>"
```

### Cursor

A Cursor beállításokban add hozzá MCP szerverként:
- **URL:** `http://localhost:3000/mcp`
- **Header:** `Authorization: Bearer <API_TOKENED>`

---

## Elérhető parancsok

A csatlakozás után természetes nyelven kérdezhetsz. Példák:

| Kérdés | Mit csinál |
|--------|-----------|
| "Listázd az összes szerződést" | Szerződések listázása |
| "Melyek járnak le 30 napon belül?" | Lejáró szerződések keresése |
| "Keress bérleti szerződéseket" | Szabad szöveges keresés |
| "Hozz létre egy NDA-t a Teszt Kft.-nek" | Szerződés létrehozása sablonból |
| "Mi a Kovács Kft. szerződéseinek státusza?" | Partner szerződéseinek lekérdezése |
| "Milyen sablonok érhetőek el?" | Elérhető sablonok listázása |
| "Add meg a 123-as szerződés letöltési linkjét" | PDF letöltési URL generálása |
| "Állítsd a státuszt Jóváhagyva-ra" | Belső státusz módosítása |

### Összes elérhető eszköz

**Szerződések (22 eszköz)**
- `contract_list` — Szerződések listázása szűréssel és lapozással
- `contract_get` — Egy szerződés részleteinek lekérése ID alapján
- `contract_get_by_own_id` — Szerződés lekérése belső azonosító alapján
- `contract_create` — Új szerződés létrehozása sablonból
- `contract_create_from_pdf` — Szerződés létrehozása PDF URL-ből
- `contract_create_from_html` — Szerződés létrehozása HTML tartalomból
- `contract_search` — Szabad szöveges keresés szerződésekben
- `contract_delete` — Szerződés törlése
- `contract_update_status` — Belső státusz módosítása
- `contract_sign` — Szerződés aláírása
- `contract_remove_signature` — Aláírás visszavonása
- `contract_add_comment` — Megjegyzés hozzáadása
- `contract_send_invitation` — Meghívó küldése partnernek
- `contract_cancel_invitation` — Meghívó visszavonása
- `contract_resend_invitation` — Meghívó újraküldése
- `contract_add_attachment` — Melléklet hozzáadása (számla, link, szerződés)
- `contract_remove_attachment` — Melléklet eltávolítása
- `contract_create_shared_link` — Megosztási link létrehozása
- `contract_list_shared_links` — Megosztási linkek listázása
- `contract_delete_shared_link` — Megosztási link törlése
- `contract_get_expiring` — Hamarosan lejáró szerződések
- `contract_status_list` / `create` / `update` / `delete` — Egyedi státusz címkék kezelése

**Partnerek és felhasználók (7 eszköz)**
- `party_list` — Partnerek listázása
- `party_search` — Partner keresése név/email/cégnév alapján
- `party_contracts` — Egy partner összes szerződése
- `coworker_list` — Munkatársak listázása
- `coworker_add` — Munkatárs hozzáadása
- `coworker_remove` — Munkatárs eltávolítása
- `user_info` — Saját felhasználói adatok és előfizetés

**Sablonok (11 eszköz)**
- `template_list` — Elérhető sablonok listázása
- `template_get` — Sablon struktúra/séma lekérése
- `template_get_fields` — Sablon mezőinek listázása
- `template_create` — Új sablon létrehozása
- `template_update` — Sablon módosítása
- `template_delete` — Sablon törlése
- `template_archive` — Sablon archiválása/visszaállítása
- `template_add_field` / `update_field` / `delete_field` — Mezők kezelése
- `template_reorder_fields` — Mezők sorrendjének módosítása

**Dokumentumok és AI (2 eszköz)**
- `document_get_download_url` — Véglegesített szerződés PDF letöltési URL-je
- `ai_extract` — AI-alapú adatkinyerés szerződésből

---

## Tesztelés

### MCP Inspector

```bash
npx @modelcontextprotocol/inspector --url http://localhost:3000/mcp \
  --header "Authorization: Bearer <API_TOKENED>"
```

### Health check

```bash
curl http://localhost:3000/health
# {"status":"ok","service":"eszerzodes-mcp","version":"1.0.0"}
```

---

## Követelmények

- Node.js 20+
- Érvényes Eszerződés.hu API hozzáférés (Bearer token)
