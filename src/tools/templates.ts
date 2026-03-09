import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { EszerzodesClient } from "../api-client.js";

export function registerTemplateTools(
  server: McpServer,
  client: EszerzodesClient
) {
  // ── template_list ──────────────────────────────────────────────────
  server.tool(
    "template_list",
    `Lists all available contract templates (both built-in and user-created).

Use this when the user wants to see what contract templates are available,
or needs to find a template ID before creating a contract.

Returns an array of template objects with id, name, and language.`,
    {},
    async () => {
      const result = await client.get("/agent/templates");
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // ── template_get ───────────────────────────────────────────────────
  server.tool(
    "template_get",
    `Gets the full schema/structure of a specific template.

Use this when the user wants to see what fields and variables
a template requires before creating a contract from it.

Returns the template structure including head_for_contract and contract_variables.`,
    {
      template_id: z
        .string()
        .describe("The template ID to retrieve"),
    },
    async (params) => {
      const result = await client.get(
        `/agent/templates/${encodeURIComponent(params.template_id)}`
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // ── template_get_fields ────────────────────────────────────────────
  server.tool(
    "template_get_fields",
    `Lists all fields (variables) defined in a specific template.

Use this when the user needs to know what data fields a template requires,
including field types, names, and options.

Returns an array of field objects with id, title, name, field_type, and options.`,
    {
      template_id: z
        .string()
        .describe("The template ID to get fields for"),
    },
    async (params) => {
      const result = await client.get(
        `/agent/templates/${encodeURIComponent(params.template_id)}/fields`
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // ── template_create ────────────────────────────────────────────────
  server.tool(
    "template_create",
    `Creates a new contract template.

Use this when the user wants to create a reusable contract template
with HTML content, intro text, and configurable fields.

Returns the created template ID.`,
    {
      title: z.string().describe("Title of the template"),
      client_title: z
        .string()
        .optional()
        .describe("Custom title for the client/sender role"),
      trustee_title: z
        .string()
        .optional()
        .describe("Custom title for the trustee/receiver role"),
      template_content: z
        .string()
        .optional()
        .describe("HTML content of the template"),
      template_intro: z
        .string()
        .optional()
        .describe("Introduction text for the template"),
      lang: z
        .string()
        .optional()
        .describe("Language code (2 chars, e.g. 'hu', 'en')"),
      signer_count: z
        .number()
        .int()
        .optional()
        .describe("Number of signers (default: 2)"),
      single_signature: z
        .boolean()
        .optional()
        .describe("Whether only one signature is needed"),
      allowed_user: z
        .number()
        .int()
        .optional()
        .describe("Restriction: 0=Any, 1=Company, 2=Individual"),
      partner_3_title: z
        .string()
        .optional()
        .describe("Title for 3rd party role"),
      partner_4_title: z
        .string()
        .optional()
        .describe("Title for 4th party role"),
    },
    async (params) => {
      const result = await client.post("/agent/templates", params);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // ── template_update ────────────────────────────────────────────────
  server.tool(
    "template_update",
    `Updates an existing contract template.

Use this when the user wants to modify a template's content, settings,
or structure.

Returns the updated template.`,
    {
      template_id: z.string().describe("The template ID to update"),
      title: z.string().optional().describe("New title"),
      client_title: z.string().optional(),
      trustee_title: z.string().optional(),
      template_content: z.string().optional(),
      template_intro: z.string().optional(),
      lang: z.string().optional(),
      signer_count: z.number().int().optional(),
      single_signature: z.boolean().optional(),
      allowed_user: z.number().int().optional(),
      partner_3_title: z.string().optional(),
      partner_4_title: z.string().optional(),
    },
    async (params) => {
      const { template_id, ...body } = params;
      const result = await client.put(
        `/agent/templates/${encodeURIComponent(template_id)}`,
        body
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // ── template_delete ────────────────────────────────────────────────
  server.tool(
    "template_delete",
    `Deletes a contract template.

Use this when the user wants to permanently remove a template.
This action is irreversible.

Returns a success confirmation.`,
    {
      template_id: z.string().describe("The template ID to delete"),
    },
    async (params) => {
      const result = await client.delete(
        `/agent/templates/${encodeURIComponent(params.template_id)}`
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // ── template_archive ───────────────────────────────────────────────
  server.tool(
    "template_archive",
    `Archives or restores a contract template.

Use this when the user wants to archive a template (hide it from active list)
or restore a previously archived template.

Returns a success confirmation.`,
    {
      template_id: z.string().describe("The template ID"),
      archive: z
        .boolean()
        .describe("true to archive, false to restore"),
    },
    async (params) => {
      const result = await client.post(
        `/agent/templates/${encodeURIComponent(params.template_id)}/archive`,
        { archive: params.archive }
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // ── template_add_field ─────────────────────────────────────────────
  server.tool(
    "template_add_field",
    `Adds a new field (variable) to a template.

Use this when the user wants to add a new fillable field to a template,
such as a text input, date picker, or dropdown.

Returns the created field object.`,
    {
      template_id: z.string().describe("The template ID"),
      title: z.string().describe("Display title of the field"),
      name: z
        .string()
        .describe("Variable name used in the template (e.g. 'company_name')"),
      field_type: z
        .string()
        .describe("Field type identifier (e.g. 'text', 'select', 'date')"),
      options: z
        .string()
        .optional()
        .describe("Options for select-type fields (comma-separated or JSON)"),
    },
    async (params) => {
      const { template_id, ...body } = params;
      const result = await client.post(
        `/agent/templates/${encodeURIComponent(template_id)}/fields`,
        body
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // ── template_update_field ──────────────────────────────────────────
  server.tool(
    "template_update_field",
    `Updates an existing field in a template.

Use this when the user wants to modify a field's title, type, or options.

Returns the updated field object.`,
    {
      template_id: z.string().describe("The template ID"),
      field_id: z.number().int().describe("The field ID to update"),
      title: z.string().optional(),
      name: z.string().optional(),
      field_type: z.string().optional(),
      options: z.string().optional(),
    },
    async (params) => {
      const { template_id, field_id, ...body } = params;
      const result = await client.put(
        `/agent/templates/${encodeURIComponent(template_id)}/fields/${field_id}`,
        body
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // ── template_delete_field ──────────────────────────────────────────
  server.tool(
    "template_delete_field",
    `Deletes a field from a template.

Use this when the user wants to remove a variable/field from a template.

Returns a success confirmation.`,
    {
      template_id: z.string().describe("The template ID"),
      field_id: z.number().int().describe("The field ID to delete"),
    },
    async (params) => {
      const result = await client.delete(
        `/agent/templates/${encodeURIComponent(params.template_id)}/fields/${params.field_id}`
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  // ── template_reorder_fields ────────────────────────────────────────
  server.tool(
    "template_reorder_fields",
    `Reorders the fields within a template.

Use this when the user wants to change the display order of fields
in a template.

Returns a success confirmation.`,
    {
      template_id: z.string().describe("The template ID"),
      field_ids: z
        .array(z.number().int())
        .describe("Array of field IDs in the desired order"),
    },
    async (params) => {
      const result = await client.post(
        `/agent/templates/${encodeURIComponent(params.template_id)}/reorder-fields`,
        { field_ids: params.field_ids }
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );
}
