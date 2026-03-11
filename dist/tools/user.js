"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserTools = registerUserTools;
const zod_1 = require("zod");
const common_js_1 = require("./common.js");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function registerUserTools(server, client) {
    // ── user_info ──────────────────────────────────────────────────────
    server.tool("user_info", `Gets information about the currently authenticated user, including branding settings.

Use this when the user asks about their account details, subscription,
membership information, or current branding configuration.

Returns user details including id, name, email, membership info and branding settings.`, {}, async () => (0, common_js_1.wrapToolHandler)(async () => {
        return await client.get("/agent/user-info");
    }));
    // ── user_branding_update ───────────────────────────────────────────
    server.tool("user_branding_update", `Updates the account's branding settings (logos, colors, styles).

Branding rules:
1. Colors: HEX format (#RRGGBB or #RGB).
2. Email text: Maximum 5000 characters.
3. Images (logo, email header, background): Max 200KB-300KB, png/jpg/jpeg/bmp.
   - Logo: max 450x100px.
   - Email header: 600x211px.
   - Background: max 300KB.

Use this tool when the user wants to customize the look of their contracts or emails.`, {
        contract_header_logo: zod_1.z.string().optional().describe("Local file path or URL to the logo image (max 200KB, png/jpg/bmp)"),
        contract_email_header_image: zod_1.z.string().optional().describe("Local file path or URL to the email header image (max 200KB, png/jpg/bmp)"),
        contract_background_image: zod_1.z.string().optional().describe("Local file path or URL to the contract background image (max 300KB, png/jpg/bmp)"),
        contract_header_color: zod_1.z.string().optional().describe("Header color in HEX format (e.g., #FFFFFF)"),
        contract_email_background_color: zod_1.z.string().optional().describe("Email background color in HEX format"),
        contract_background_color: zod_1.z.string().optional().describe("Contract background color in HEX format"),
        email_text: zod_1.z.string().max(5000).optional().describe("Custom text for automated notification emails"),
        contract_header_logo_enabled: zod_1.z.boolean().optional().describe("Whether to show the logo on contracts"),
        contract_style_enabled: zod_1.z.boolean().optional().describe("Whether to apply custom background and colors to contracts"),
        contract_email_heading_enabled: zod_1.z.boolean().optional().describe("Whether to use custom header image in emails"),
        contract_email_edit_enabled: zod_1.z.boolean().optional().describe("Whether to allow editing the cover letter during sending")
    }, async (params) => (0, common_js_1.wrapToolHandler)(async () => {
        const formData = new FormData();
        // Add simple fields
        if (params.contract_header_color)
            formData.append('contract_header_color', params.contract_header_color);
        if (params.contract_email_background_color)
            formData.append('contract_email_background_color', params.contract_email_background_color);
        if (params.contract_background_color)
            formData.append('contract_background_color', params.contract_background_color);
        if (params.email_text)
            formData.append('email_text', params.email_text);
        if (params.contract_header_logo_enabled !== undefined)
            formData.append('contract_header_logo_enabled', params.contract_header_logo_enabled ? '1' : '0');
        if (params.contract_style_enabled !== undefined)
            formData.append('contract_style_enabled', params.contract_style_enabled ? '1' : '0');
        if (params.contract_email_heading_enabled !== undefined)
            formData.append('contract_email_heading_enabled', params.contract_email_heading_enabled ? '1' : '0');
        if (params.contract_email_edit_enabled !== undefined)
            formData.append('contract_email_edit_enabled', params.contract_email_edit_enabled ? '1' : '0');
        // Add files
        const addFileIfValid = async (fileInput, fieldName) => {
            if (!fileInput)
                return;
            if (fileInput.startsWith('http://') || fileInput.startsWith('https://')) {
                const response = await fetch(fileInput);
                if (!response.ok) {
                    throw new Error(`Failed to fetch image from URL: ${fileInput}`);
                }
                const arrayBuffer = await response.arrayBuffer();
                const contentType = response.headers.get('content-type') || 'image/png';
                const fileName = path_1.default.basename(new URL(fileInput).pathname) || 'image.png';
                const blob = new Blob([arrayBuffer], { type: contentType });
                formData.append(fieldName, blob, fileName);
            }
            else if (fs_1.default.existsSync(fileInput)) {
                const buffer = fs_1.default.readFileSync(fileInput);
                const fileName = path_1.default.basename(fileInput);
                const ext = path_1.default.extname(fileInput).slice(1);
                const blob = new Blob([buffer], { type: 'image/' + (ext === 'jpg' ? 'jpeg' : ext) });
                formData.append(fieldName, blob, fileName);
            }
        };
        await addFileIfValid(params.contract_header_logo, 'contract_header_logo');
        await addFileIfValid(params.contract_email_header_image, 'contract_email_header_image');
        await addFileIfValid(params.contract_background_image, 'contract_background_image');
        return await client.postMultipart("/agent/user/branding", formData);
    }));
}
//# sourceMappingURL=user.js.map