// Typages des variables d'environnement accessibles au build

declare namespace NodeJS {
    interface ProcessEnv {
        EXPO_PUBLIC_API_KEY?: string;
    }
}

export { };