import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { EszerzodesClient } from "../api-client.js";
import { wrapToolHandler } from "./common.js";

export function registerContractTools(
  server: McpServer,
  client: EszerzodesClient
) {
  // ── contract_list ──────────────────────────────────────────────────
  server.tool(
    "contract_list",
    `Lists contracts with optional filtering and pagination.

Use this when the user wants to see their contracts, filter by search text,
contract type, creator, or finalization date.

Returns a paginated list of contracts with metadata (current_page, last_page, total).`,
    {
      page: z
        .number()
        .int()
        .optional()
        .describe("Page number for pagination"),
      search_query: z
        .string()
        .optional()
        .describe("Search text (subject, partner name, etc.)"),
      search_contract_type: z
        .number()
        .int()
        .optional()
        .describe("Filter by Contract Type ID (template ID)"),
      contract_creator: z
        .number()
        .int()
        .optional()
        .describe("Filter by Creator User ID"),
      finalized_at: z
        .string()
        .optional()
        .describe("Filter by finalization date (YYYY-MM-DD)"),
    },
    async (params) => wrapToolHandler(async () => {
      const queryParams: Record<string, string> = {};
      if (params.page !== undefined) queryParams.page = String(params.page);
      if (params.search_query) queryParams.search_query = params.search_query;
      if (params.search_contract_type !== undefined)
        queryParams.search_contract_type = String(params.search_contract_type);
      if (params.contract_creator !== undefined)
        queryParams.contract_creator = String(params.contract_creator);
      if (params.finalized_at) queryParams.finalized_at = params.finalized_at;

      return await client.get("/agent/contracts", queryParams);
    })
  );

  // ── contract_get ───────────────────────────────────────────────────
  server.tool(
    "contract_get",
    `Retrieves full details of a single contract by its ID.

Use this when the user asks about a specific contract or needs detailed
information about a contract (parties, status, fields, history, etc.).

Returns the complete contract object including all associated data.`,
    {
      contract_id: z
        .number()
        .int()
        .describe("The contract ID to retrieve"),
    },
    async (params) => wrapToolHandler(async () => {
      return await client.get(`/agent/contracts/${params.contract_id}`);
    })
  );

  // ── contract_get_by_own_id ─────────────────────────────────────────
  server.tool(
    "contract_get_by_own_id",
    `Retrieves full details of a single contract by its custom internal ID (own_id).

Use this when the user references a contract by their own internal identifier
rather than the Eszerződés.hu system ID.

Returns the complete contract object.`,
    {
      own_id: z
        .string()
        .describe("The custom internal ID assigned to the contract"),
    },
    async (params) => {
      const result = await client.get(
        `/agent/contracts/own-id/${encodeURIComponent(params.own_id)}`
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // ── contract_create ────────────────────────────────────────────────
  server.tool(
    "contract_create",
    `Creates a new contract from an existing template.

Use this when the user wants to create a contract based on a template.
IMPORTANT RULES:
1. partner_type MUST be provided if partner_details is given.
2. Individual partners (partner_type: 1) MUST have mothers_name, birthday, and place_of_birth, phone, address.
3. Partner emails MUST NOT be identical to the signed-in user's email.
4. For multi-party contracts, provide enough unique partners in the array.
5. In case of 400 Bad Request, ALWAYS check the raw API response body for the exact JSON validation error.

Returns the created contract object.`,
    {
      contract_type_id: z
        .number()
        .int()
        .describe("ID of the template (Contract Type) to use"),
      title: z.string().describe("Title / subject of the contract"),
      client_title: z
        .string()
        .optional()
        .describe("Override the Client/Sender title"),
      trustee_title: z
        .string()
        .optional()
        .describe("Override the Trustee/Receiver title"),
      allowed_user_type: z
        .number()
        .int()
        .optional()
        .describe(
          "Restriction for signer type: 0=Any, 1=Company Only, 2=Private Individual Only"
        ),
      own_id: z
        .string()
        .optional()
        .describe("Optional internal ID (must be unique per user)"),
      has_expiration_date: z
        .boolean()
        .optional()
        .describe("Whether the contract has an expiration date"),
      expiration_date: z
        .string()
        .optional()
        .describe(
          "Expiration date (YYYY-MM-DD), required if has_expiration_date is true"
        ),
      expiration_date_title: z
        .string()
        .optional()
        .describe("Label for the expiration date"),
      intro_disabled: z
        .boolean()
        .optional()
        .describe("If true, the intro section is disabled"),
      accompanying_message: z
        .string()
        .optional()
        .describe("Custom email message to accompany the invitation"),
      need_validation: z
        .number()
        .int()
        .optional()
        .describe(
          "Validation level: 0=Basic (Email), 1=Phone (+1 timestamp), 2=eID"
        ),
      callback_url: z
        .string()
        .optional()
        .describe("Optional callback URL for contract events"),
      copy_to_email: z
        .string()
        .optional()
        .describe(
          "Optional comma-separated email addresses (max 5) to receive a copy"
        ),
      redirect_url: z
        .string()
        .optional()
        .describe("Optional redirect URL for user after signing"),
      template_data: z
        .record(z.string())
        .optional()
        .describe(
          "Key-value pairs to replace template variables (e.g. {\"variable_name\": \"value\"})"
        ),
      contract_public_url: z
        .boolean()
        .optional()
        .describe("Whether to generate a public URL for the contract"),
      partners: z
        .array(
          z.object({
            position: z
              .number()
              .int()
              .describe(
                "Position (2 = Main Counterparty, 3+ = Additional parties)"
              ),
            email: z.string().describe("Partner email address"),
            title: z
              .string()
              .optional()
              .describe("Specific title for this partner"),
            partner_details: z
              .object({
                partner_type: z
                  .number()
                  .int()
                  .optional()
                  .describe("REQUIRED if partner_details is given. 1: Individual, 2: Business"),
                signatory_name: z.string().optional(),
                phone_number: z.string().optional(),
                address: z.string().optional(),
                mothers_name: z.string().optional().describe("REQUIRED for Individual (1)"),
                birthday: z.string().optional().describe("REQUIRED for Individual (1). Format: YYYY-MM-DD"),
                place_of_birth: z.string().optional().describe("REQUIRED for Individual (1)"),
                company_name: z.string().optional(),
                company_tax_number: z.string().optional(),
                company_registered_office: z.string().optional(),
              })
              .optional()
              .describe("Optional partner details. If given, partner_type MUST be provided!"),
          })
        )
        .optional()
        .describe("List of partners to invite"),
    },
    async (params) => wrapToolHandler(async () => {
      return await client.post("/agent/contracts", params);
    })
  );

  // ── contract_create_from_pdf ───────────────────────────────────────
  server.tool(
    "contract_create_from_pdf",
    `Creates a new contract from a PDF file available at a remote URL.

Use this when the user wants to create a contract from an existing PDF document
rather than from a template.

Returns the created contract object.`,
    {
      title: z.string().describe("Title / subject of the contract"),
      pdf_url: z.string().describe("Remote URL of the PDF to download"),
      partners: z
        .array(
          z.object({
            position: z.number().int().describe("Position (2+)"),
            email: z.string().describe("Partner email"),
            title: z
              .string()
              .optional()
              .describe("Specific title for this partner"),
            partner_details: z.record(z.unknown()).optional(),
          })
        )
        .describe("List of partners"),
      is_one_sided: z
        .boolean()
        .describe("If true, only one party signs"),
      language: z
        .string()
        .default("hu")
        .describe("Language of the contract (default: hu)"),
      hide_service_provider_details: z
        .boolean()
        .describe("Hide service provider details section"),
      need_validation: z
        .number()
        .int()
        .describe("Validation level: 0=Email, 1=Phone, 2=eID"),
      client_title: z.string().optional(),
      trustee_title: z.string().optional(),
      own_id: z.string().optional(),
      allowed_user_type: z.number().int().optional(),
      has_expiration_date: z.boolean().optional(),
      expiration_date: z.string().optional(),
      expiration_date_title: z.string().optional(),
      intro_disabled: z.boolean().optional(),
      accompanying_message: z.string().optional(),
      sign_now: z
        .boolean()
        .optional()
        .describe("If true, sign the contract immediately"),
      copy_to_email: z.string().optional(),
      callback_url: z.string().optional(),
      redirect_url: z.string().optional(),
      signer_count: z.number().int().optional(),
    },
    async (params) => wrapToolHandler(async () => {
      return await client.post("/agent/contracts/pdf", params);
    })
  );

  // ── contract_create_from_html ──────────────────────────────────────
  server.tool(
    "contract_create_from_html",
    `Creates a new contract from HTML content that is converted to PDF.

Use this when the user wants to create a contract from HTML content
rather than from a template or existing PDF.

Returns the created contract object.`,
    {
      title: z.string().describe("Title / subject of the contract"),
      html_content: z.string().describe("HTML content of the contract"),
      partners: z
        .array(
          z.object({
            position: z.number().int().describe("Position (2+)"),
            email: z.string().describe("Partner email"),
            title: z.string().optional(),
            partner_details: z.record(z.unknown()).optional(),
          })
        )
        .describe("List of partners"),
      is_one_sided: z
        .boolean()
        .describe("If true, only one party signs"),
      language: z
        .string()
        .default("hu")
        .describe("Language of the contract (default: hu)"),
      hide_service_provider_details: z
        .boolean()
        .describe("Hide service provider details section"),
      need_validation: z
        .number()
        .int()
        .describe("Validation level: 0=Email, 1=Phone, 2=eID"),
      client_title: z.string().optional(),
      trustee_title: z.string().optional(),
      own_id: z.string().optional(),
      allowed_user_type: z.number().int().optional(),
      has_expiration_date: z.boolean().optional(),
      expiration_date: z.string().optional(),
      expiration_date_title: z.string().optional(),
      intro_disabled: z.boolean().optional(),
      accompanying_message: z.string().optional(),
      sign_now: z.boolean().optional(),
      callback_url: z.string().optional(),
      redirect_url: z.string().optional(),
      copy_to_email: z.string().optional(),
      signer_count: z.number().int().optional(),
    },
    async (params) => wrapToolHandler(async () => {
      return await client.post("/agent/contracts/html", params);
    })
  );

  // ── contract_search ────────────────────────────────────────────────
  server.tool(
    "contract_search",
    `Searches contracts using a text query. Searches across subject, partner names, and other fields.

Use this when the user wants to find contracts by keyword, partner name,
or any free-text search.

Returns a paginated list of matching contracts.`,
    {
      query: z.string().describe("Search text (subject, partner name, etc.)"),
      page: z
        .number()
        .int()
        .optional()
        .describe("Page number for pagination"),
      search_contract_type: z
        .number()
        .int()
        .optional()
        .describe("Filter results by Contract Type ID"),
      contract_creator: z
        .number()
        .int()
        .optional()
        .describe("Filter results by Creator User ID"),
      finalized_at: z
        .string()
        .optional()
        .describe("Filter by finalization date (YYYY-MM-DD)"),
    },
    async (params) => {
      const queryParams: Record<string, string> = {
        search_query: params.query,
      };
      if (params.page !== undefined) queryParams.page = String(params.page);
      if (params.search_contract_type !== undefined)
        queryParams.search_contract_type = String(params.search_contract_type);
      if (params.contract_creator !== undefined)
        queryParams.contract_creator = String(params.contract_creator);
      if (params.finalized_at) queryParams.finalized_at = params.finalized_at;

      const result = await client.get("/agent/contracts", queryParams);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // ── contract_delete ────────────────────────────────────────────────
  server.tool(
    "contract_delete",
    `Deletes a contract and all associated data (partners, fields, etc.).

Use this when the user wants to permanently delete a contract.
This action is irreversible.

Returns a success confirmation with the deleted contract ID.`,
    {
      contract_id: z
        .number()
        .int()
        .describe("The contract ID to delete"),
    },
    async (params) => {
      const result = await client.delete(
        `/agent/contracts/${params.contract_id}`
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // ── contract_update_status ─────────────────────────────────────────
  server.tool(
    "contract_update_status",
    `Sets the internal status (label) of a contract.

Use this when the user wants to change the internal status of a contract
(e.g. mark as "Approved", "Under Review", etc.).

Returns the updated contract object.`,
    {
      contract_id: z
        .number()
        .int()
        .describe("The contract ID to update"),
      internal_status: z
        .string()
        .describe("Name or ID of the internal status to set"),
    },
    async (params) => {
      const result = await client.post(
        `/agent/contracts/${params.contract_id}/internal-status`,
        { internal_status: params.internal_status }
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // ── contract_sign ──────────────────────────────────────────────────
  server.tool(
    "contract_sign",
    `Signs a contract on behalf of the authenticated user.

Use this when the user wants to digitally sign a contract.

Returns the updated contract object with signature details.`,
    {
      contract_id: z
        .number()
        .int()
        .describe("The contract ID to sign"),
    },
    async (params) => {
      const result = await client.post(
        `/agent/contracts/${params.contract_id}/sign`
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // ── contract_remove_signature ──────────────────────────────────────
  server.tool(
    "contract_remove_signature",
    `Removes the authenticated user's signature from a contract (only if not finalized).

Use this when the user wants to withdraw their signature from a contract
that has not yet been finalized.

Returns a success confirmation.`,
    {
      contract_id: z
        .number()
        .int()
        .describe("The contract ID to remove signature from"),
    },
    async (params) => {
      const result = await client.delete(
        `/agent/contracts/${params.contract_id}/signature`
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // ── contract_add_comment ───────────────────────────────────────────
  server.tool(
    "contract_add_comment",
    `Adds a comment to a specific contract.

Use this when the user wants to add a note or comment to a contract
for internal tracking or communication.

Returns the updated contract object.`,
    {
      contract_id: z
        .number()
        .int()
        .describe("The contract ID to add a comment to"),
      comment: z.string().describe("The comment text to add"),
    },
    async (params) => {
      const result = await client.post(
        `/agent/contracts/${params.contract_id}/comment`,
        { comment: params.comment }
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // ── contract_send_invitation ───────────────────────────────────────
  server.tool(
    "contract_send_invitation",
    `Sends an invitation to a new partner to join and sign a contract.

Use this when the user wants to invite someone to a contract via email.
You can optionally pre-fill the partner's details.

Returns the updated contract object.`,
    {
      contract_id: z
        .number()
        .int()
        .describe("The contract ID to send the invitation for"),
      email: z.string().describe("Email address of the partner to invite"),
      position: z
        .number()
        .int()
        .describe(
          "Position of the partner (2 = main counterparty, 3+ = additional)"
        ),
      partner_details: z
        .object({
          partner_type: z
            .number()
            .int()
            .optional()
            .describe("1: Individual, 2: Business"),
          signatory_name: z.string().optional(),
          phone_number: z.string().optional(),
          address: z.string().optional(),
          mothers_name: z.string().optional(),
          birthday: z
            .string()
            .optional()
            .describe("Date of birth (YYYY-MM-DD)"),
          place_of_birth: z.string().optional(),
          company_name: z.string().optional(),
          company_tax_number: z.string().optional(),
          company_registered_office: z.string().optional(),
        })
        .optional()
        .describe("Optional partner details to pre-fill"),
      accompanying_message: z
        .string()
        .optional()
        .describe("Custom email message to accompany the email notification / Kísérőlevél az email értesítőhöz"),
    },
    async (params) => {
      const body: Record<string, unknown> = {
        email: params.email,
        position: params.position,
      };
      if (params.accompanying_message) {
        body.accompanying_message = params.accompanying_message;
      }
      if (params.partner_details) {
        body.partner_details = params.partner_details;
      }
      const result = await client.post(
        `/agent/contracts/${params.contract_id}/invitations`,
        body
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // ── contract_cancel_invitation ─────────────────────────────────────
  server.tool(
    "contract_cancel_invitation",
    `Cancels an active invitation for a contract partner.

Use this when the user wants to revoke a pending invitation
that was sent to a partner.

Returns a success confirmation.`,
    {
      contract_id: z
        .number()
        .int()
        .describe("The contract ID"),
      email: z
        .string()
        .describe("Email address of the invitee to cancel"),
    },
    async (params) => {
      const result = await client.post(
        `/agent/contracts/${params.contract_id}/cancel-invitation`,
        { email: params.email }
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // ── contract_resend_invitation ─────────────────────────────────────
  server.tool(
    "contract_resend_invitation",
    `Resends contract invitation emails to partners who haven't accepted yet.

Use this when the user wants to remind partners about a pending contract invitation.

Returns the updated contract object.`,
    {
      contract_id: z
        .number()
        .int()
        .describe("The contract ID"),
      which_receiver: z
        .number()
        .int()
        .optional()
        .describe(
          "Optional 1-based index of the specific receiver to resend to. If omitted, resends to all pending partners."
        ),
    },
    async (params) => {
      const result = await client.post(
        `/agent/contracts/${params.contract_id}/resend`,
        { which_receiver: params.which_receiver ?? 1 }
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // ── contract_add_attachment ────────────────────────────────────────
  server.tool(
    "contract_add_attachment",
    `Adds an attachment to a contract (invoice, hyperlink, or connected contract).

Use this when the user wants to attach additional documents or links to a contract.

Returns the updated contract object.`,
    {
      contract_id: z
        .number()
        .int()
        .describe("The contract ID"),
      attachment_type: z
        .enum(["invoice", "link", "contract"])
        .describe("Type of attachment"),
      attachment_invoice_number: z
        .string()
        .optional()
        .describe("Invoice number (required if type is 'invoice')"),
      attachment_contract_identifier: z
        .number()
        .int()
        .optional()
        .describe(
          "ID of another contract to link (required if type is 'contract')"
        ),
      attachment_contract_visibility: z
        .enum(["public", "private"])
        .optional()
        .describe("Visibility for connected contract"),
      link: z
        .object({
          type: z.string().optional().describe("Type of link"),
          title: z.string().optional().describe("Title of link"),
          hyperlink: z.string().optional().describe("URL"),
          visibility: z.enum(["public", "private"]).optional(),
        })
        .optional()
        .describe("Link details (required if type is 'link')"),
    },
    async (params) => {
      const { contract_id, ...body } = params;
      const result = await client.post(
        `/agent/contracts/${contract_id}/attachment`,
        body
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // ── contract_remove_attachment ─────────────────────────────────────
  server.tool(
    "contract_remove_attachment",
    `Removes an attachment from a contract.

Use this when the user wants to detach an invoice, link, or connected contract.

Returns the updated contract object.`,
    {
      contract_id: z
        .number()
        .int()
        .describe("The contract ID"),
      attachment_type: z
        .enum(["invoice", "link", "contract"])
        .describe("Type of attachment to remove"),
      attachment_identifier: z
        .number()
        .int()
        .describe("ID of the attachment record to remove"),
    },
    async (params) => {
      const result = await client.delete(
        `/agent/contracts/${params.contract_id}/attachment`,
        undefined,
        {
          attachment_type: params.attachment_type,
          attachment_identifier: params.attachment_identifier,
        }
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // ── contract_create_shared_link ────────────────────────────────────
  server.tool(
    "contract_create_shared_link",
    `Creates a shared link for a contract that can be sent to external parties.

Use this when the user wants to share a contract via a time-limited link.

Returns the generated shared link details.`,
    {
      contract_id: z.number().int().describe("The contract ID"),
      email_address: z
        .string()
        .describe("Recipient email address for the shared link"),
      lifetime: z
        .number()
        .int()
        .describe("Lifetime of the link in minutes (0 = unlimited)"),
    },
    async (params) => {
      const result = await client.post("/agent/contracts/shared-link", params);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // ── contract_list_shared_links ─────────────────────────────────────
  server.tool(
    "contract_list_shared_links",
    `Lists all active shared links for a contract.

Use this when the user wants to see which shared links exist for a contract.

Returns an array of shared link objects.`,
    {
      contract_id: z.number().int().describe("The contract ID"),
    },
    async (params) => {
      const result = await client.get(
        `/agent/contracts/${params.contract_id}/shared-links`
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // ── contract_delete_shared_link ────────────────────────────────────
  server.tool(
    "contract_delete_shared_link",
    `Deletes a specific shared link for a contract.

Use this when the user wants to revoke access to a previously shared link.

Returns a success confirmation.`,
    {
      link_id: z.string().describe("The shared link ID to delete"),
      contract_id: z.number().int().describe("The contract ID"),
    },
    async (params) => {
      const result = await client.delete(
        `/agent/contracts/shared-link/${params.link_id}`,
        { contract_id: String(params.contract_id) }
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // ── contract_get_expiring ──────────────────────────────────────────
  server.tool(
    "contract_get_expiring",
    `Lists contracts expiring within a specified number of days.

Use this when the user asks about upcoming renewals, deadlines, or
wants to see contracts that need attention soon.

Returns contracts sorted by expiry date ascending.`,
    {
      days_ahead: z
        .number()
        .int()
        .default(30)
        .describe("Number of days to look ahead (default: 30)"),
    },
    async (params) => {
      // Fetch all contracts and filter by expiration date client-side
      // since the API doesn't have a dedicated expiring endpoint
      const allContracts: unknown[] = [];
      let page = 1;
      let lastPage = 1;

      do {
        const result = await client.get<{
          status: string;
          data: {
            current_page: number;
            last_page: number;
            data: Array<{
              id: number;
              subject: string;
              expiration_date?: string;
              status: string;
              [key: string]: unknown;
            }>;
          };
        }>("/agent/contracts", { page: String(page) });

        if (result.data?.data) {
          allContracts.push(...result.data.data);
          lastPage = result.data.last_page;
        }
        page++;
      } while (page <= lastPage && page <= 10); // Safety limit: max 10 pages

      const now = new Date();
      const cutoff = new Date(
        now.getTime() + params.days_ahead * 24 * 60 * 60 * 1000
      );

      const expiring = (allContracts as Array<Record<string, unknown>>)
        .filter((c) => {
          if (!c.expiration_date) return false;
          const expDate = new Date(c.expiration_date as string);
          return expDate >= now && expDate <= cutoff;
        })
        .sort((a, b) => {
          const dateA = new Date(a.expiration_date as string).getTime();
          const dateB = new Date(b.expiration_date as string).getTime();
          return dateA - dateB;
        });

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                status: "success",
                days_ahead: params.days_ahead,
                count: expiring.length,
                data: expiring,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ── contract_status_list ───────────────────────────────────────────
  server.tool(
    "contract_status_list",
    `Lists all custom contract status labels available in the account.

Use this when the user wants to see what internal statuses are configured,
or needs a status ID/name for updating a contract's status.

Returns an array of status objects with id, name, and color.`,
    {},
    async () => {
      const result = await client.get("/agent/contract-status");
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // ── contract_status_create ─────────────────────────────────────────
  server.tool(
    "contract_status_create",
    `Creates a new custom contract status label.

Use this when the user wants to add a new internal status category
for organizing contracts.

Returns the created status object.`,
    {
      name: z.string().describe("Name of the status"),
      color: z.string().describe("Color code for the status (e.g. #FF0000)"),
      email_to: z
        .string()
        .optional()
        .describe("Email address for notifications"),
      email_subject: z.string().optional().describe("Email subject"),
      email_body: z.string().optional().describe("Email body"),
      permissions: z
        .array(z.number().int())
        .optional()
        .describe("Array of user IDs who can use this status"),
    },
    async (params) => {
      const result = await client.post("/agent/contract-status", params);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // ── contract_status_update ─────────────────────────────────────────
  server.tool(
    "contract_status_update",
    `Updates an existing custom contract status label.

Use this when the user wants to change the name, color, or settings
of an existing internal status.

Returns the updated status object.`,
    {
      status_id: z.number().int().describe("The status ID to update"),
      name: z.string().describe("New name of the status"),
      color: z.string().describe("New color code"),
      email_to: z.string().optional(),
      email_subject: z.string().optional(),
      email_body: z.string().optional(),
      permissions: z.array(z.number().int()).optional(),
    },
    async (params) => {
      const { status_id, ...body } = params;
      const result = await client.put(
        `/agent/contract-status/${status_id}`,
        body
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // ── contract_status_delete ─────────────────────────────────────────
  server.tool(
    "contract_status_delete",
    `Deletes a custom contract status label.

Use this when the user wants to remove an internal status category.
This action is irreversible.

Returns a success confirmation.`,
    {
      status_id: z.number().int().describe("The status ID to delete"),
    },
    async (params) => {
      const result = await client.delete(
        `/agent/contract-status/${params.status_id}`
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );
}
