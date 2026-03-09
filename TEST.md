# Eszerződés.hu MCP Server – Teszt terv

## Előfeltételek

1. A szerver fut: `npm run dev` vagy `docker compose up`
2. Érvényes Eszerződés.hu API token elérhető
3. MCP Inspector telepítve: `npx @modelcontextprotocol/inspector`

## MCP Inspector teszt

```bash
npx @modelcontextprotocol/inspector --url http://localhost:3000/mcp \
  --header "Authorization: Bearer <YOUR_TOKEN>"
```

## Claude validációs tesztkérdések

Az alábbi kérdésekkel teszteld, hogy a Claude helyesen tudja-e használni az MCP szervert:

### 1. Szerződések listázása
**Kérdés:** "Listázd ki az összes aktív szerződést"
**Elvárt viselkedés:** A `contract_list` tool-t hívja meg, és az eredményt olvasható formában mutatja.

### 2. Lejáró szerződések
**Kérdés:** "Melyek járnak le a következő 30 napban?"
**Elvárt viselkedés:** A `contract_get_expiring` tool-t hívja `days_ahead: 30` paraméterrel, és listázza a lejáró szerződéseket dátum szerint.

### 3. Keresés
**Kérdés:** "Keress bérleti szerződéseket"
**Elvárt viselkedés:** A `contract_search` tool-t hívja `query: "bérleti"` paraméterrel.

### 4. Szerződés létrehozása
**Kérdés:** "Hozz létre egy új NDA-t a Teszt Kft.-nek"
**Elvárt viselkedés:**
1. Először a `template_list` tool-t hívja, hogy megtalálja az NDA sablont
2. Majd a `template_get` vagy `template_get_fields` tool-t, hogy megismerje a szükséges mezőket
3. Végül a `contract_create` tool-t a megfelelő paraméterekkel

### 5. Partner szerződései
**Kérdés:** "Mi a Kovács Kft. szerződéseinek státusza?"
**Elvárt viselkedés:** A `party_contracts` tool-t hívja `partner_name: "Kovács Kft."` paraméterrel, és a kapott szerződések státuszát összegzi.

### 6. Sablon mezők lekérdezése
**Kérdés:** "Milyen mezőket kell kitölteni az NDA sablonhoz?"
**Elvárt viselkedés:** A `template_list`-tel megkeresi az NDA sablont, majd a `template_get_fields`-szel listázza a mezőket.

### 7. Felhasználó információk
**Kérdés:** "Mi az előfizetésem állapota?"
**Elvárt viselkedés:** A `user_info` tool-t hívja és az eredményből kiolvassa a membership adatokat.

### 8. Szerződés letöltése
**Kérdés:** "Add meg a 12345-ös szerződés PDF letöltési linkjét"
**Elvárt viselkedés:** A `document_get_download_url` tool-t hívja `contract_id: 12345` paraméterrel.

### 9. Meghívó küldése
**Kérdés:** "Küldj meghívót a test@example.com címre a 100-as szerződéshez"
**Elvárt viselkedés:** A `contract_send_invitation` tool-t hívja a megfelelő paraméterekkel.

### 10. Státusz módosítása
**Kérdés:** "Állítsd a 100-as szerződés státuszát 'Jóváhagyva'-ra"
**Elvárt viselkedés:** A `contract_update_status` tool-t hívja `contract_id: 100, internal_status: "Jóváhagyva"` paraméterekkel.

## Sikerkritérium

Ha Claude mind a 10 tesztkérdést helyesen tudja végrehajtani (a megfelelő tool-t hívja a helyes paraméterekkel), az MCP szerver kész.
