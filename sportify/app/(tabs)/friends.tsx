// app/(tabs)/friends.tsx
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

type Profile = {
  id: string
  username: string
}

export default function Friends() {
  const [allUsers, setAllUsers] = useState<Profile[]>([])
  const [filtered, setFiltered] = useState<Profile[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  // 1. Fetch all other users on mount
  useEffect(() => {
    fetchUsers()
  }, [])

  // 2. Whenever search or allUsers changes, re‑filter
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
    // get current user's id
    const {
      data: { user },
      error: authErr
    } = await supabase.auth.getUser()
    if (authErr || !user) {
      console.error('auth error', authErr)
      setLoading(false)
      return
    }

    // query profiles, exclude current user
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
    <Pressable
      style={styles.card}
      onPress={() => console.log('Add friend or open profile for', item.username)}
    >
      <Text style={styles.username}>{item.username}</Text>
    </Pressable>
  )

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.header}>Friends</Text>

      {/* 1. SEARCH BAR */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search users…"
        value={search}
        onChangeText={setSearch}
      />

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
})
