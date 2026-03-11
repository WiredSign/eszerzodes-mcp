export declare class EszerzodesClient {
    private baseUrl;
    private token;
    constructor(token: string);
    private handleResponse;
    get<T>(path: string, params?: Record<string, string>): Promise<T>;
    post<T>(path: string, body?: unknown): Promise<T>;
    put<T>(path: string, body?: unknown): Promise<T>;
    delete<T>(path: string, params?: Record<string, string>, body?: unknown): Promise<T>;
    postMultipart<T>(path: string, formData: FormData): Promise<T>;
    getDownloadUrl(path: string): Promise<string>;
}
//# sourceMappingURL=api-client.d.ts.map