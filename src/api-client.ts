import { createApiError } from "./errors.js";

export class EszerzodesClient {
  private baseUrl = "https://www.eszerzodes.hu/api";
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  private async handleResponse<T>(res: Response, path: string): Promise<T> {
    if (!res.ok) {
      const body = await res.text();
      throw createApiError(res.status, body, path);
    }
    return res.json() as Promise<T>;
  }

  async get<T>(path: string, params?: Record<string, string>): Promise<T> {
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

    return this.handleResponse<T>(res, path);
  }

  async post<T>(path: string, body?: unknown): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    return this.handleResponse<T>(res, path);
  }

  async put<T>(path: string, body?: unknown): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    return this.handleResponse<T>(res, path);
  }

  async delete<T>(
    path: string,
    params?: Record<string, string>,
    body?: unknown
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${path}`);
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== "") {
          url.searchParams.set(k, v);
        }
      });
    }

    const options: RequestInit = {
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

    return this.handleResponse<T>(res, path);
  }

  async getDownloadUrl(path: string): Promise<string> {
    const url = `${this.baseUrl}${path}`;
    return url + `?token=${encodeURIComponent(this.token)}`;
  }
}
