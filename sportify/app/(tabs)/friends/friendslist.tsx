import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/authContext'

export default function FriendsList() {
  const router = useRouter()
  const { user } = useAuth()
  const [friends, setFriends] = useState<{ id: string; username: string }[]>([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchFriends = async () => {

      const { data: outgoing, error: outErr } = await supabase
        .from('friend_requests')
        .select(`requestee_id, profiles!friend_requests_requestee_id_fkey(username)`)
        .eq('requester_id', user.id)
        .eq('status', 'accepted')


      const { data: incoming, error: inErr } = await supabase
        .from('friend_requests')
        .select(`requester_id, profiles!friend_requests_requester_id_fkey(username)`)
        .eq('requestee_id', user.id)
        .eq('status', 'accepted')

      if (outErr || inErr) {
        console.error(outErr || inErr)
      } else {

        const combined = [
          ...outgoing.map(r => ({ id: r.requestee_id, username: (r.profiles as { username?: string })?.username ?? '' })),
          ...incoming.map(r => ({ id: r.requester_id, username: (r.profiles as { username?: string })?.username ?? '' })),
        ]
        setFriends(combined)
      }
      setLoading(false)
    }
    fetchFriends()
  }, [user.id])

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#0B2233" />
        </TouchableOpacity>
        <Text style={styles.title}>Your Friends</Text>
      </View>


      <View style={styles.content}>
        {loading ? (
          <Text>Loading...</Text>
        ) : friends.length === 0 ? (
          <Text style={styles.emptyText}>You have no friends yet, add a friend today!</Text>
        ) : (
          <FlatList
            data={friends}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.username}>{item.username}</Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  headerRow: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  backButton: { padding: 8 },
  title: { fontSize: 20, fontWeight: '600', marginLeft: 12, color: '#0B2233' },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  emptyText: { textAlign: 'center', color: '#666', marginTop: 20 },
  card: { marginVertical: 8, padding: 12, backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#DDD' },
  username: { fontSize: 16, color: '#0B2233' },
})
