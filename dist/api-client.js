"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EszerzodesClient = void 0;
const errors_js_1 = require("./errors.js");
class EszerzodesClient {
    baseUrl = "https://www.eszerzodes.hu/api";
    token;
    constructor(token) {
        this.token = token;
    }
    async handleResponse(res, path) {
        if (!res.ok) {
            const body = await res.text();
            throw (0, errors_js_1.createApiError)(res.status, body, path);
        }
        return res.json();
    }
    async get(path, params) {
        const url = new URL(`${this.baseUrl}${path}`);
        if (params) {
            Object.entries(params).forEach(([k, v]) => {
                if (v !== undefined && v !== "") {
                    url.searchParams.set(k, v);
                }
            });
        }
        const res = await fetch(url.toString(), {
            headers: {
                Authorization: `Bearer ${this.token}`,
                Accept: "application/json",
            },
        });
        return this.handleResponse(res, path);
    }
    async post(path, body) {
        const res = await fetch(`${this.baseUrl}${path}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${this.token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: body !== undefined ? JSON.stringify(body) : undefined,
        });
        return this.handleResponse(res, path);
    }
    async put(path, body) {
        const res = await fetch(`${this.baseUrl}${path}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${this.token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: body !== undefined ? JSON.stringify(body) : undefined,
        });
        return this.handleResponse(res, path);
    }
    async delete(path, params, body) {
        const url = new URL(`${this.baseUrl}${path}`);
        if (params) {
            Object.entries(params).forEach(([k, v]) => {
                if (v !== undefined && v !== "") {
                    url.searchParams.set(k, v);
                }
            });
        }
        const options = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${this.token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };
        if (body !== undefined) {
            options.body = JSON.stringify(body);
        }
        const res = await fetch(url.toString(), options);
        return this.handleResponse(res, path);
    }
    async getDownloadUrl(path) {
        const url = `${this.baseUrl}${path}`;
        return url + `?token=${encodeURIComponent(this.token)}`;
    }
}
exports.EszerzodesClient = EszerzodesClient;
//# sourceMappingURL=api-client.js.map