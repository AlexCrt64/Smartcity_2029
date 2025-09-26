import type { ExpoConfig } from 'expo/config';

// Clé API publique : doit être définie dans .env (EXPO_PUBLIC_API_KEY=...)
// Si elle est absente on lance une erreur claire (pour éviter les oublis en équipe)
const publicApiKey = process.env.EXPO_PUBLIC_API_KEY;
if (!publicApiKey) {
    // eslint-disable-next-line no-console
    console.warn('\u26A0\uFE0F  EXPO_PUBLIC_API_KEY manquante dans le fichier .env.');
}

const config: ExpoConfig = {
    name: 'Smartcity',
    slug: 'Smartcity',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'smartcity',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: { supportsTablet: true },
    android: {
        adaptiveIcon: {
            backgroundColor: '#E6F4FE',
            foregroundImage: './assets/images/android-icon-foreground.png',
            backgroundImage: './assets/images/android-icon-background.png',
            monochromeImage: './assets/images/android-icon-monochrome.png'
        },
        edgeToEdgeEnabled: true,
        predictiveBackGestureEnabled: false
    },
    web: {
        output: 'static',
        favicon: './assets/images/favicon.png'
    },
    plugins: [
        'expo-router',
        [
            'expo-splash-screen',
            {
                image: './assets/images/splash-icon.png',
                imageWidth: 200,
                resizeMode: 'contain',
                backgroundColor: '#ffffff',
                dark: { backgroundColor: '#000000' }
            }
        ]
    ],
    experiments: { typedRoutes: true, reactCompiler: true },
    extra: {
        publicApiKey,
    },
};

export default config;
