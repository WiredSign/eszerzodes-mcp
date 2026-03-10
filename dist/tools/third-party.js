"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerThirdPartyTools = registerThirdPartyTools;
const zod_1 = require("zod");
function registerThirdPartyTools(server, client) {
    server.tool("third_party_register", `Register a new 3rd party user (Partner/Sub-account).
NOTE: This only works for authorized partners who have the '3rt_api' permission enabled.

Creates a new user account via a 3rd party integration.
Returns the newly created user_id, otp_link, and subscription details.`, {
        registration_header: zod_1.z
            .object({
            coupon_code: zod_1.z.string().optional(),
            otp_connection: zod_1.z.string().optional(),
            clone_account: zod_1.z.enum(["yes", "no"]).optional(),
            cloned_account_user_id: zod_1.z.string().optional(),
            cloned_account_secret_key: zod_1.z.string().optional(),
        })
            .optional()
            .describe("Optional configuration for creating the account (e.g. cloning)"),
        partner_data: zod_1.z
            .object({
            partner_type: zod_1.z
                .enum(["1", "2"])
                .describe("1: Private Person, 2: Company"),
            email: zod_1.z.string().describe("Email of the new user"),
            signatory_name: zod_1.z.string().optional(),
            phone_number: zod_1.z.string().optional(),
            address: zod_1.z.string().optional(),
            mothers_name: zod_1.z.string().optional(),
            birthday: zod_1.z.string().optional().describe("YYYY-MM-DD"),
            place_of_birth: zod_1.z.string().optional(),
            company_name: zod_1.z.string().optional(),
            company_tax_number: zod_1.z.string().optional(),
            company_registered_office: zod_1.z.string().optional(),
            language: zod_1.z.string().default("hu").optional(),
        })
            .describe("Data of the new sub-account user"),
    }, async (params) => {
        const result = await client.post("/agent/3rd-party/registration", params);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    });
    server.tool("third_party_get_otp", `Get OTP (Magic Link) for a 3rd party user.
NOTE: This only works for authorized partners who have the '3rt_api' permission enabled.

Generates an auto-login link for the specified sub-account user. Optionally redirects them to a specific contract.
Returns the otp_link and user_id.`, {
        otp_account_user_id: zod_1.z
            .string()
            .describe("The ID of the user to get the OTP for"),
        otp_link_key: zod_1.z
            .string()
            .describe("Validation key for the OTP request (legacy sha1 check)"),
        contract_identifier: zod_1.z
            .string()
            .optional()
            .describe("Optional contract ID to redirect the user to after login"),
    }, async (params) => {
        const result = await client.post("/agent/3rd-party/otp", params);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    });
}
//# sourceMappingURL=third-party.js.map