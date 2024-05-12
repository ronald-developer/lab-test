export interface ApiTokenConfig {
    composeUrl: (endpoint: string, token?: string) => string;
}
