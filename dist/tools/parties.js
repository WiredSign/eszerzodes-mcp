"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPartyTools = registerPartyTools;
const zod_1 = require("zod");
const common_js_1 = require("./common.js");
function registerPartyTools(server, client) {
    // ── party_list ─────────────────────────────────────────────────────
    server.tool("party_list", `Lists all partners (people/companies) associated with the user's contracts.

Use this when the user asks about their partners, wants to search for
a specific partner by name, email, or company name.

Returns an array of partner objects with id, name, email, phone, etc.`, {
        term: zod_1.z
            .string()
            .optional()
            .describe("Search term (name, email, or company name)"),
    }, async (params) => (0, common_js_1.wrapToolHandler)(async () => {
        const queryParams = {};
        if (params.term)
            queryParams.term = params.term;
        return await client.get("/agent/partners", queryParams);
    }));
    // ── party_search ───────────────────────────────────────────────────
    server.tool("party_search", `Searches for a specific partner by name, email, or company name.

Use this when the user wants to find a particular partner in their contacts.
This is a convenience alias for party_list with a search term.

Returns matching partner objects.`, {
        query: zod_1.z
            .string()
            .describe("Search query (name, email, or company name)"),
    }, async (params) => (0, common_js_1.wrapToolHandler)(async () => {
        return await client.get("/agent/partners", {
            term: params.query,
        });
    }));
    // ── party_contracts ────────────────────────────────────────────────
    server.tool("party_contracts", `Lists all contracts associated with a specific partner.

Use this when the user asks about a partner's contracts, wants to see
what contracts a particular partner has signed or is involved in.

Returns a list of contracts where the partner appears, with optional status filter.`, {
        partner_name: zod_1.z
            .string()
            .describe("Partner name or email to search for. The tool will find the partner and then list their contracts."),
        status: zod_1.z
            .string()
            .optional()
            .describe("Optional status filter for the contracts"),
    }, async (params) => (0, common_js_1.wrapToolHandler)(async () => {
        // Search contracts by partner name using the contracts list endpoint
        const queryParams = {
            search_query: params.partner_name,
        };
        return await client.get("/agent/contracts", queryParams);
    }));
    // ── coworker_list ──────────────────────────────────────────────────
    server.tool("coworker_list", `Lists all coworkers associated with the user account.

Use this when the user wants to see team members who have access
to the contract management system.

Returns an array of coworker objects with id, email, name, and position.`, {}, async () => (0, common_js_1.wrapToolHandler)(async () => {
        return await client.get("/agent/coworkers");
    }));
    // ── coworker_add ───────────────────────────────────────────────────
    server.tool("coworker_add", `Adds a new coworker to the account.

Use this when the user wants to invite a team member to collaborate
on contract management.

Returns the result of the operation.`, {
        email: zod_1.z.string().describe("Email address of the coworker to add"),
        role: zod_1.z
            .enum(["admin", "szerkeszto", "kezelo", "nezo"])
            .optional()
            .describe("Role category of the coworker (1: admin, 2: editor, 3: sender, 4: viewer)"),
        can_sign: zod_1.z
            .boolean()
            .optional()
            .describe("Whether the coworker has signing rights in the account"),
    }, async (params) => (0, common_js_1.wrapToolHandler)(async () => {
        const payload = {
            email: params.email,
            ...(params.role && { role: params.role }),
            ...(params.can_sign !== undefined && { can_sign: params.can_sign })
        };
        return await client.post("/agent/coworkers", payload);
    }));
    // ── coworker_remove ────────────────────────────────────────────────
    server.tool("coworker_remove", `Removes a coworker from the account.

Use this when the user wants to revoke a team member's access.

Returns the result of the operation.`, {
        email: zod_1.z
            .string()
            .describe("Email address of the coworker to remove"),
    }, async (params) => (0, common_js_1.wrapToolHandler)(async () => {
        return await client.delete("/agent/coworkers", undefined, {
            email: params.email,
        });
    }));
    // ── user_info ──────────────────────────────────────────────────────
    server.tool("user_info", `Gets information about the currently authenticated user.

Use this when the user asks about their account details, subscription,
or membership information.

Returns user details including id, name, email, and membership info.`, {}, async () => (0, common_js_1.wrapToolHandler)(async () => {
        return await client.get("/agent/user-info");
    }));
}
//# sourceMappingURL=parties.js.map