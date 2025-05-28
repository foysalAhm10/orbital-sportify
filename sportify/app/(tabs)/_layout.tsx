import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

import { tabIcons } from '@/constants/tab-icons'

const TabIcon = ({ focused, icon }: any) => {
    if (focused) {
        return (
            <Image
                source={icon}
                className="size-14"
            />
        )
    }

    return (
        <Image
            source={icon}
            tintColor="#081722"
            className="size-9"
        />
    )

}

const _Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 25,
                },
                tabBarStyle: {
                    backgroundColor: "rgba(244, 244, 244, 0.60)",
                    borderRadius: 40,
                    paddingLeft: 20,
                    paddingRight: 10,
                    height: 90,
                    // marginBottom: 20,
                    position: "absolute",
                    overflow: "hidden",
                    // borderWidth: 1,
                    // borderColor: "rgba(244, 244, 244)",
                },
            }}
        >
            <Tabs.Screen
                name="events"
                options={{
                    title: "Events",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={focused ? tabIcons.events_f : tabIcons.events}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="chats"
                options={{
                    title: "Chats",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={focused ? tabIcons.chats_f : tabIcons.chats}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={focused ? tabIcons.home_f : tabIcons.home}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="friends"
                options={{
                    title: "Friends",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={focused ? tabIcons.friends_f : tabIcons.friends}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={focused ? tabIcons.profile_f : tabIcons.profile}
                        />
                    )
                }}
            />
        </Tabs>
    )
}

export default _Layout