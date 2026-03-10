"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.landingPageHtml = void 0;
const landing_html_js_1 = require("./landing-html.js");
const landing_body_js_1 = require("./landing-body.js");
exports.landingPageHtml = `<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Eszerződés.hu MCP Szerver</title>
  <meta name="description" content="MCP szerver az Eszerződés.hu szerződéskezelő platformhoz. Csatlakoztasd AI eszközeidet.">
  ${landing_html_js_1.STYLES}
</head>
<body>
  ${landing_body_js_1.BODY}
</body>
</html>`;
//# sourceMappingURL=landing.js.map