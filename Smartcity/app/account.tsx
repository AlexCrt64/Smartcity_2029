import { useCallback } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { Stack } from 'expo-router';
import AppIcon from '@/src/components/ui/AppIcon';

const CardItem = ({ iconName, label, onPress }: { iconName: any; label: string; onPress?: () => void }) => (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
        <View style={styles.iconWrapper}><AppIcon name={iconName} size={20} /></View>
        <Text style={styles.cardLabel}>{label}</Text>
    </Pressable>
);

const ActionRow = ({ iconName, label, destructive, onPress }: { iconName: any; label: string; destructive?: boolean; onPress?: () => void }) => (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.actionRow, pressed && styles.actionRowPressed]}>
        <View style={styles.actionIcon}><AppIcon name={iconName} size={22} color={destructive ? '#991B1B' : '#101642'} /></View>
        <Text style={[styles.actionLabel, destructive && styles.destructive]}>{label}</Text>
    </Pressable>
);

export default function AccountScreen() {
    const fakeNav = useCallback((title: string) => {
        Alert.alert(title, 'Écran non implémenté (fake).');
    }, []);

    const confirmDelete = useCallback(() => {
        Alert.alert('Suppression', 'Action fictive. (Pas de backend)', [{ text: 'OK' }]);
    }, []);

    return (
        <>
            <Stack.Screen options={{ title: 'Espace compte' }} />
            <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Mon compte</Text>
                    <CardItem iconName={'profileStar'} label={'Mes informations personnelles'} onPress={() => fakeNav('Mes informations personnelles')} />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Informations légales</Text>
                    <CardItem iconName={'legalClip'} label={'Conditions générales'} onPress={() => fakeNav('Conditions générales')} />
                    <CardItem iconName={'legalClip'} label={'Mentions légales'} onPress={() => fakeNav('Mentions légales')} />
                    <CardItem iconName={'legalClip'} label={'Politique de confidentialité'} onPress={() => fakeNav('Politique de confidentialité')} />
                </View>

                <View style={styles.divider} />

                <View style={styles.actions}>
                    <ActionRow iconName={'logout'} label={'Me déconnecter'} onPress={() => Alert.alert('Déconnexion', 'Action fictive.')} />
                    <ActionRow iconName={'delete'} label={'Supprimer mon compte'} destructive onPress={confirmDelete} />
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F4F5FF'
    },
    section: {
        marginBottom: 28
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
        color: '#111827'
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        paddingVertical: 18,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2
    },
    cardPressed: {
        opacity: 0.7
    },
    cardIcon: {
        fontSize: 20,
        marginRight: 12
    },
    iconWrapper: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12
    },
    cardLabel: {
        fontSize: 15,
        fontWeight: '500',
        color: '#0F172A'
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginBottom: 20
    },
    actions: {
        marginBottom: 40
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
    },
    actionRowPressed: {
        opacity: 0.6
    },
    actionIcon: {
        fontSize: 18,
        marginRight: 10
    },
    actionLabel: {
        fontSize: 15,
        fontWeight: '500'
    },
    destructive: {
        color: '#991B1B'
    }
});
