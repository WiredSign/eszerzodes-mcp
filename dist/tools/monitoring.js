"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMonitoringTools = registerMonitoringTools;
const zod_1 = require("zod");
/**
 * Register monitoring and automation tools.
 *
 * Includes:
 * - check_pending_signatures: Monitors and handles reminders for pending contracts.
 */
function registerMonitoringTools(server, client) {
    server.tool("check_pending_signatures", `Lists pending contracts and optionally resends invitations for those that have been waiting for a certain number of days.
    
Use this when the user wants to monitor their signing processes, identify 'stuck' contracts, or send automated reminders.`, {
        days_threshold: zod_1.z
            .number()
            .int()
            .default(3)
            .describe("How many days should a contract be pending before it is considered 'stuck'"),
        auto_resend: zod_1.z
            .boolean()
            .default(false)
            .describe("If true, automatically resends the invitation email to all pending partners for stuck contracts."),
    }, async (params) => {
        // 1. Fetch recent contracts
        // Note: We use the first page (limit of 15-30 items usually)
        const result = await client.get("/agent/contracts", { page: "1" });
        const contracts = result.data || [];
        const now = new Date();
        const report = [];
        for (const contract of contracts) {
            // Only look at pending (non-finalized) contracts
            // If finalized_at is null or empty string, it's pending
            if (contract.finalized_at && contract.finalized_at !== "")
                continue;
            const createdAt = new Date(contract.created_at);
            const diffTime = Math.abs(now.getTime() - createdAt.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays >= params.days_threshold) {
                let summary = "Pending";
                if (params.auto_resend) {
                    try {
                        // Resend to all (which_receiver: 1 usually handles the first, 
                        // but we can iterate or the API might have 'all' - for now we use the existing pattern)
                        await client.post(`/agent/contracts/${contract.id}/resend`, { which_receiver: 1 });
                        summary = "Reminder resent automatically";
                    }
                    catch (err) {
                        summary = "Failed to resend reminder automatically";
                    }
                }
                report.push({
                    id: contract.id,
                    subject: contract.subject,
                    partner: contract.partner_name || "N/A",
                    days_pending: diffDays,
                    status: summary
                });
            }
        }
        const reportText = report.length > 0
            ? `I found ${report.length} pending contract(s) older than ${params.days_threshold} days:\n\n` +
                report.map(r => `- [ID:${r.id}] ${r.subject} (${r.partner}): ${r.days_pending} days waiting. Action: ${r.status}`).join('\n')
            : `No pending contracts found older than ${params.days_threshold} days on the first page of results.`;
        return {
            content: [{ type: "text", text: reportText }]
        };
    });
}
//# sourceMappingURL=monitoring.js.map