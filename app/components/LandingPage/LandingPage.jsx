


import React from 'react';
import { Text, View } from 'react-native';

export default function LandingPage({ route }) {
    const { userName = 'Guest' } = route.params || {};

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffff', paddingTop: 0 }}>
            <Text className="text-2xl  font-bold mb-4">Hello! {userName}</Text>
        </View>
    );
}
