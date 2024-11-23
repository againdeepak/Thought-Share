// Interface for Environment variable
declare namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGO_URL: string;
      // Add other environment variables as needed
    }
  }
  