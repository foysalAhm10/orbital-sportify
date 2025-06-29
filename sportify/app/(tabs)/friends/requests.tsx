import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/authContext'
import RequestCard from '@/components/RequestCard'

type FriendRequest = {
  id: number
  username: string
  type: 'incoming' | 'outgoing'
}

export default function FriendRequests() {
  const router = useRouter()
  const { user } = useAuth()
  const [requests, setRequests] = useState<FriendRequest[]>([])
  const [loading, setLoading] = useState(true)

  const fetchRequests = async () => {
    setLoading(true)

    const { data: incoming = [], error: inErr } = await supabase
      .from('friend_requests')
      .select('id, requester:profiles!friend_requests_requester_id_fkey(username)')
      .eq('requestee_id', user.id)
      .eq('status', 'pending')

    const { data: outgoing = [], error: outErr } = await supabase
      .from('friend_requests')
      .select('id, requestee:profiles!friend_requests_requestee_id_fkey(username)')
      .eq('requester_id', user.id)
      .eq('status', 'pending')

    if (inErr || outErr) {
      console.error(inErr || outErr)
      setLoading(false)
      return
    }

    const mappedIn: FriendRequest[] = (incoming ?? []).map(r => ({
      id: r.id,
      username: (r.requester as { username?: string })?.username ?? '',
      type: 'incoming'
    }))
    const mappedOut: FriendRequest[] = (outgoing ?? []).map(r => ({
      id: r.id,
      username: (r.requestee as { username?: string })?.username ?? '',
      type: 'outgoing'
    }))

    setRequests([...mappedIn, ...mappedOut])
    setLoading(false)
  }

  useEffect(() => {
    if (!user?.id) return
    fetchRequests()
  }, [user])

  const handleAccept = async (id: number) => {
    await supabase
      .from('friend_requests')
      .update({ status: 'accepted', responded_at: new Date().toISOString() })
      .eq('id', id)
    fetchRequests()
  }
  const handleReject = async (id: number) => {
    await supabase
      .from('friend_requests')
      .update({ status: 'rejected', responded_at: new Date().toISOString() })
      .eq('id', id)
    fetchRequests()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} onPress={() => router.back()} />
        <Text style={styles.title}>Friend Requests</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" style={styles.center} />
      ) : requests.length === 0 ? (
        <View style={styles.center}>
          <Text>No pending requests—check back later.</Text>
        </View>
      ) : (
        <FlatList
          data={requests}
          keyExtractor={r => r.id.toString()}
          renderItem={({ item }) =>
            item.type === 'incoming' ? (
              <RequestCard
                requestId={item.id}
                username={item.username}
                onAccept={() => handleAccept(item.id)}
                onReject={() => handleReject(item.id)}
              />
            ) : (
              <View style={styles.card}>
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.pending}>Pending</Text>
              </View>
            )
          }
          contentContainerStyle={{ paddingVertical: 16 }}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  title: { fontSize: 18, fontWeight: '600', marginLeft: 12 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 4,
    backgroundColor: '#f9f9f9',
    borderRadius: 8
  },
  username: { fontSize: 16 },
  pending: { fontSize: 14, color: '#888' }
})
