import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    // Por padrão o Next registra os argumentos das server actions em
    // desenvolvimento, o que inclui a senha digitada no login em texto puro.
    serverFunctions: false,
  },
};

export default nextConfig;
