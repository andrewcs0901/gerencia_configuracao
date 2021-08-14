declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      // Api
      NEXT_PUBLIC_API_URL: string;
      // Default
      PORT?: string;
      PWD?: string;
    }
  }
}

export {};
