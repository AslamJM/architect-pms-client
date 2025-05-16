class ApiClient {
    baseUrl: string
    defaultOptions: RequestInit

    constructor(baseUrl: string, defaultOptions: RequestInit) {
        this.baseUrl = baseUrl
        this.defaultOptions = {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            ...defaultOptions,
        }
    }

    async request<T>(url: string, options: RequestInit): Promise<T> {
        const requrl = `${this.baseUrl}${url}`
        const reqOptions = {
            ...this.defaultOptions,
            ...options
        }

        try {
            const res = await fetch(requrl, reqOptions)
            if (!res.ok) {
                const err = await res.json() as { message: string }
                throw new Error(err.message)
            }

            const data = await res.json() as T
            return data
        } catch (error) {
            if (typeof error === "object" && error !== null && "message" in error) {
                throw error
            }

            throw new Error("Client Side Error")
        }
    }

    async post<TBody, TRes>(endpoint: string, body: TBody): Promise<TRes> {
        const options: RequestInit = {
            method: "POST",
            body: JSON.stringify(body),
        }
        return this.request<TRes>(endpoint, options)
    }

    async get<TRes>(endpoint: string): Promise<TRes> {
        const options: RequestInit = {
            method: "GET",
        }
        return this.request<TRes>(endpoint, options)
    }
}

const API_URL = import.meta.env.API_URL

export const apiClient = new ApiClient(API_URL, {})