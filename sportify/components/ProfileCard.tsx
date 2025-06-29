import React, { useState } from 'react'
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/authContext'

type ProfileCardProps = {
    id: string
    username: string
    onRequested?: () => void
}

export default function ProfileCard({ id, username, onRequested }: ProfileCardProps) {
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [requested, setRequested] = useState(false)

    const sendRequest = async () => {
        setLoading(true)
        const { error } = await supabase
            .from('friend_requests')
            .insert({
                requester_id: user.id,
                requestee_id: id,
                status: 'pending',
            })
        setLoading(false)
        if (!error) {
            setRequested(true)
            onRequested?.()
        } else {
            console.error(error)

        }
    }

    return (
        <View style={styles.card}>
            <Text style={styles.username}>{username}</Text>
            <Pressable
                style={[styles.button, requested && styles.buttonDisabled]}
                onPress={sendRequest}
                disabled={loading || requested}
            >
                {loading
                    ? <ActivityIndicator color="#fff" />
                    : <Text style={styles.buttonText}>
                        {requested ? 'Requested' : 'Add Friend'}
                    </Text>
                }
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    username: {
        fontSize: 16,
    },
    button: {
        backgroundColor: '#1e40af',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 6,
    },
    buttonDisabled: {
        backgroundColor: '#94a3b8',
    },
    buttonText: {
        color: '#fff',
    },
})
