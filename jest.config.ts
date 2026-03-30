export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1', // Mapeia @ para src
    },
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",  // Transforma TypeScript
        "^.+\\.jsx?$": "babel-jest",   // Transforma arquivos JS/JSX
    },
    transformIgnorePatterns: [
        "/node_modules/(?!next-auth)/", // Ignora o "node_modules", mas permite o "next-auth"
    ],
  };