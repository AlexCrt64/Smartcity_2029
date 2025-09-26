// Typages des variables d'environnement accessibles coté build/bundle
// Toute variable préfixée EXPO_PUBLIC_ est exposée dans le bundle.

declare namespace NodeJS {
  interface ProcessEnv {
    EXPO_PUBLIC_API_KEY?: string;
  }
}

export { };