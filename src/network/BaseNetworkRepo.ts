
export class BaseNetworkRepo {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    protected async get<T>(url: string, queryParams?: Record<string, any>): Promise<T> {
        const fullUrl = this.createUrl(url, queryParams);
        return this.performRequest<T>(fullUrl);
    }

    protected async post<T>(url: string, data?: any): Promise<T> {
        const fullUrl = this.createUrl(url);
        return this.performRequest<T>(fullUrl, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined
        });
    }

    protected async put<T>(url: string, data?: any): Promise<T> {
        const fullUrl = this.createUrl(url);
        return this.performRequest<T>(fullUrl, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined
        });
    }

    protected async delete<T>(url: string): Promise<T> {
        const fullUrl = this.createUrl(url);
        return this.performRequest<T>(fullUrl, {
            method: 'DELETE'
        });
    }

    protected async patch<T>(url: string, data?: any): Promise<T> {
        const fullUrl = this.createUrl(url);
        return this.performRequest<T>(fullUrl, {
            method: 'PATCH',
            body: data ? JSON.stringify(data) : undefined
        });
    }

    private createUrl(path: string, queryParams?: Record<string, any>): string {
        const url = new URL(`${this.baseURL}${path}`);

        if (queryParams) {
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    url.searchParams.append(key, String(value));
                }
            });
        }

        return url.toString();
    }

    private async performRequest<T>(url: string, options: RequestInit = {}): Promise<T> {
        try {

            //add an extra get param to every request
            //remove teh trailing slash from the url and has a get param
            if (url.endsWith('/')) {
                url = url.slice(0, -1);
                if (!url.includes('?')) {
                    url = url + '?api_key=c5f86a0a9073003e060c91aacf8527e4';
                }
                else {
                    url = url + '&api_key=c5f86a0a9073003e060c91aacf8527e4';
                }
            }
            
            
            // Add default headers
            const headers = new Headers({
                'Content-Type': 'application/json',
                ...options.headers
            });

            // Create the request with merged options
            const response = await fetch(url, {
                ...options,
                headers
            });

            // Handle authentication errors
            if (response.status === 401) {
                // Redirect to the Login
            }

            // Handle HTTP errors
            if (!response.ok) {
                const errorData = await this.parseResponseData(response);
                throw new NetworkError(
                    `API Error: ${response.status} ${response.statusText}`,
                    response.status,
                    errorData
                );
            }

            // Parse successful response
            return await this.parseResponseData(response);
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    private async parseResponseData(response: Response): Promise<any> {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }
        return await response.text();
    }

    private handleError(error: any): void {
        if (error instanceof NetworkError) {
            console.error('API Error:', {
                url: error.url,
                status: error.status,
                message: error.message,
                data: error.data,
            });
        } else {
            console.error('Network Error:', error);
        }
    }
}

export class NetworkError extends Error {
    status: number;
    data: any;
    url?: string;

    constructor(message: string, status: number, data: any, url?: string) {
        super(message);
        this.name = 'NetworkError';
        this.status = status;
        this.data = data;
        this.url = url;
    }
}