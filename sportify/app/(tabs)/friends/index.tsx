import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native'
import { supabase } from '@/lib/supabase'
import Loading from '@/components/loading';
import { useRouter } from 'expo-router';
import ProfileCard from '@/components/ProfileCard';

type Profile = {
  id: string
  username: string
}

export default function Friends() {
  const router = useRouter()
  const [allUsers, setAllUsers] = useState<Profile[]>([])
  const [filtered, setFiltered] = useState<Profile[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    const q = search.trim().toLowerCase()
    if (q === '') {
      setFiltered(allUsers)
    } else {
      setFiltered(
        allUsers.filter(u =>
          u.username.toLowerCase().includes(q)
        )
      )
    }
  }, [search, allUsers])

  const fetchUsers = async () => {
    setLoading(true)

    const {
      data: { user },
      error: authErr
    } = await supabase.auth.getUser()
    if (authErr || !user) {
      console.error('auth error', authErr)
      setLoading(false)
      return
    }


    let { data, error } = await supabase
      .from('profiles')
      .select('id, username')
      .neq('id', user.id)

    if (error) {
      console.error('fetch profiles error', error)
    } else {
      setAllUsers(data ?? [])
    }
    setLoading(false)
  }

  const renderItem = ({ item }: { item: Profile }) => (
    <ProfileCard
      id={item.id}
      username={item.username}
      onRequested={() => {

        fetchUsers()
      }}
    />
  )

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.header}>Friends</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search users…"
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.tabRow}>
        <Pressable
          style={styles.tabButton}
          onPress={() => router.push('/friends/friendslist')}
        >
          <Text style={styles.tabButtonText}>Friends</Text>
        </Pressable>

        <Pressable
          style={styles.tabButton}
          onPress={() => router.push('/friends/requests')}
        >
          <Text style={styles.tabButtonText}>Requests</Text>
        </Pressable>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Loading size={60} />
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={u => u.id}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          contentContainerStyle={{ paddingVertical: 20 }}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#A2BFCA',
    paddingHorizontal: 20,
  },
  header: {
    fontFamily: 'Inter',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 16,
  },
  searchInput: {
    marginTop: 12,
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
  card: {
    padding: 19,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  username: {
    fontFamily: 'Inter',
    fontSize: 18,
    color: '#0B2233',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  tabButton: {
    flex: 1,
    marginHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
  },
  tabButtonText: {
    fontFamily: 'Inter', fontSize: 16,
    color: '#0B2233',
    fontWeight: '600',
  },
})
