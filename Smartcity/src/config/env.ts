// Centralisation de l'accès aux variables d'environnement
// Préférer importer depuis ce fichier plutôt que d'accéder directement à process.env dans l'app.

export const getPublicApiKey = (): string => {
  const key = process.env.EXPO_PUBLIC_API_KEY;
  if (!key) {
    throw new Error('EXPO_PUBLIC_API_KEY non définie. Créez un fichier .env à partir de .env.example');
  }
  return key;
};

export const Env = {
  apiKey: () => getPublicApiKey(),
};

// Exemple d'utilisation :
// import { Env } from '@/src/config/env';
// const k = Env.apiKey();