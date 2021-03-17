declare namespace NodeJS {
  export interface ProcessEnv {
    JWT_SECRET: string;
    BASE_URL: string;
    PORT: string;
    DB_URL: string;
  }
}
