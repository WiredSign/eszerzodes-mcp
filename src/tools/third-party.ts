import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { EszerzodesClient } from "../api-client.js";

export function registerThirdPartyTools(
    server: McpServer,
    client: EszerzodesClient
) {
    server.tool(
        "third_party_register",
        `Register a new 3rd party user (Partner/Sub-account).
NOTE: This only works for authorized partners who have the '3rt_api' permission enabled.

Creates a new user account via a 3rd party integration.
Returns the newly created user_id, otp_link, and subscription details.`,
        {
            registration_header: z
                .object({
                    coupon_code: z.string().optional(),
                    otp_connection: z.string().optional(),
                    clone_account: z.enum(["yes", "no"]).optional(),
                    cloned_account_user_id: z.string().optional(),
                    cloned_account_secret_key: z.string().optional(),
                })
                .optional()
                .describe(
                    "Optional configuration for creating the account (e.g. cloning)"
                ),
            partner_data: z
                .object({
                    partner_type: z
                        .enum(["1", "2"])
                        .describe("1: Private Person, 2: Company"),
                    email: z.string().describe("Email of the new user"),
                    signatory_name: z.string().optional(),
                    phone_number: z.string().optional(),
                    address: z.string().optional(),
                    mothers_name: z.string().optional(),
                    birthday: z.string().optional().describe("YYYY-MM-DD"),
                    place_of_birth: z.string().optional(),
                    company_name: z.string().optional(),
                    company_tax_number: z.string().optional(),
                    company_registered_office: z.string().optional(),
                    language: z.string().default("hu").optional(),
                })
                .describe("Data of the new sub-account user"),
        },
        async (params) => {
            const result = await client.post("/agent/3rd-party/registration", params);
            return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
        }
    );

    server.tool(
        "third_party_get_otp",
        `Get OTP (Magic Link) for a 3rd party user.
NOTE: This only works for authorized partners who have the '3rt_api' permission enabled.

Generates an auto-login link for the specified sub-account user. Optionally redirects them to a specific contract.
Returns the otp_link and user_id.`,
        {
            otp_account_user_id: z
                .string()
                .describe("The ID of the user to get the OTP for"),
            otp_link_key: z
                .string()
                .describe("Validation key for the OTP request (legacy sha1 check)"),
            contract_identifier: z
                .string()
                .optional()
                .describe("Optional contract ID to redirect the user to after login"),
        },
        async (params) => {
            const result = await client.post("/agent/3rd-party/otp", params);
            return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
        }
    );
}
