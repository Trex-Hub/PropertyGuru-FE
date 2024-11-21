type CacheStrategy =
  | 'no-store'
  | 'default'
  | 'reload'
  | 'no-cache'
  | 'force-cache'
  | 'only-if-cached';

interface FetchWrapperOptions {
  baseUrl?: string;
  headers?: HeadersInit;
  cache?: CacheStrategy;
  credentials?: RequestCredentials;
  mode?: RequestMode;
  redirect?: RequestRedirect;
  referrerPolicy?: ReferrerPolicy;
}
// const REVALIDATE = parseInt(process.env.NEXT_PUBLIC_REVALIDATE || '3600', 10);

export default class FetchWrapper {
  private defaultOptions: RequestInit;

  constructor(options: FetchWrapperOptions = {}) {
    this.defaultOptions = {
      headers: options.headers,
      cache: options.cache,
      credentials: options.credentials,
      mode: options.mode,
      redirect: options.redirect,
      referrerPolicy: options.referrerPolicy,
    };
  }

  private async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const finalOptions = { ...this.defaultOptions, ...options };
    try {
      const response = await fetch(url, finalOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return (await response.json()) as T;
    } catch (error: any) {
      throw new Error(`FetchWrapper Error: ${error.message}`);
    }
  }

  public get<T>(url: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'GET',
      cache: 'no-store',
    });
  }

  public getCached<T>(url: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'GET',
    });
  }

  public post<T>(
    url: string,
    body: any,
    options: RequestInit = {}
  ): Promise<T> {
    return this.request<T>(url, {
      headers: options.headers,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  public put<T>(url: string, body: any, options: RequestInit = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  public delete<T>(url: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  }

  public patch<T>(
    url: string,
    body: any,
    options: RequestInit = {}
  ): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }
}

export const http = new FetchWrapper({
  headers: {
    'Content-Type': 'application/json',
  },
});
