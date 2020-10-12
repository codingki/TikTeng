import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from 'firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import TabBarIcon from '../components/utils/TabBarIcon';
import Text from '../components/utils/StyledText';

import OnBoarding from '../screens/auth/OnBoarding';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import ForgetPassword from '../screens/auth/ForgetPassword';

import Home from '../screens/main/Home';
import Profile from '../screens/main/Profile';
import Explore from '../screens/main/Explore';
import MyTickets from '../screens/main/MyTickets';

import Detail from '../screens/main/Detail';
import Payment from '../screens/main/Payment';
import TicketDetail from '../screens/main/TicketDetail';
import Search from '../screens/main/Search';
import Category from '../screens/main/Category';
import PaymentGateway from '../screens/main/PaymentGateway';

import Preference from '../screens/onBoarding/Preference';
import PhoneNumber from '../screens/onBoarding/PhoneNumber';

import Loading from '../screens/onBoarding/Loading';

const firebaseConfig = {
	apiKey: 'AIzaSyCtz7aCg-oRtRPinPIJZ0fjH2Wi8BP77Xs',
	authDomain: 'tikteng-d095d.firebaseapp.com',
	databaseURL: 'https://tikteng-d095d.firebaseio.com',
	projectId: 'tikteng-d095d',
	storageBucket: 'tikteng-d095d.appspot.com',
	messagingSenderId: '25093089371',
	appId: '1:25093089371:web:79256347f2beb2bf1cf77e',
};
if (firebase.apps.length === 0) {
	firebase.initializeApp(firebaseConfig);
}
console.disableYellowBox = true;
const WelcomeStack = createStackNavigator();

const Welcome = () => {
	return (
		<WelcomeStack.Navigator
			screenOptions={{
				headerMode: 'none',
				headerShown: false,
			}}
		>
			<WelcomeStack.Screen name="OnBoarding" component={OnBoarding} />
			<WelcomeStack.Screen name="Login" component={Login} />
			<WelcomeStack.Screen name="Register" component={Register} />
			<WelcomeStack.Screen name="ForgetPassword" component={ForgetPassword} />
		</WelcomeStack.Navigator>
	);
};

const Tab = createBottomTabNavigator();

const MainTabs = () => {
	return (
		<Tab.Navigator
			tabBarOptions={{
				tabStyle: { borderTopWidth: 0 },
				style: { borderTopWidth: 0 },
				activeTintColor: '#FFF',
				activeBackgroundColor: '#282828',
				inactiveBackgroundColor: '#282828',
			}}
		>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{
					tabBarLabel: ({ focused }) => (
						<Text
							medium
							style={{
								fontFamily: focused ? 'Ubuntu_700Bold' : 'Ubuntu_400Regular',
								marginBottom: 5,
								color: focused ? '#FFF' : '#8E8E8E',
								fontSize: 10,
							}}
						>
							Home
						</Text>
					),
					tabBarIcon: ({ focused }) => (
						<TabBarIcon focused={focused} name={'home'} />
					),
				}}
			/>
			<Tab.Screen
				name="Explore"
				component={Explore}
				options={{
					tabBarLabel: ({ focused }) => (
						<Text
							medium
							style={{
								fontFamily: focused ? 'Ubuntu_700Bold' : 'Ubuntu_400Regular',
								marginBottom: 5,
								color: focused ? '#FFF' : '#8E8E8E',
								fontSize: 10,
							}}
						>
							Explore
						</Text>
					),
					tabBarIcon: ({ focused }) => (
						<TabBarIcon focused={focused} name={'search'} />
					),
				}}
			/>
			<Tab.Screen
				name="MyTickets"
				component={MyTickets}
				options={{
					tabBarLabel: ({ focused }) => (
						<Text
							medium
							style={{
								fontFamily: focused ? 'Ubuntu_700Bold' : 'Ubuntu_400Regular',
								marginBottom: 5,
								color: focused ? '#FFF' : '#8E8E8E',
								fontSize: 10,
							}}
						>
							My Tickets
						</Text>
					),
					tabBarIcon: ({ focused }) => (
						<MaterialCommunityIcons
							name={focused ? 'ticket' : 'ticket-outline'}
							size={24}
							style={{ marginBottom: -5 }}
							color={focused ? '#FFF' : '#8E8E8E'}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarLabel: ({ focused }) => (
						<Text
							medium
							style={{
								fontFamily: focused ? 'Ubuntu_700Bold' : 'Ubuntu_400Regular',
								marginBottom: 5,
								color: focused ? '#FFF' : '#9B9B9B',
								fontSize: 10,
							}}
						>
							Profile
						</Text>
					),
					tabBarIcon: ({ focused }) => (
						<TabBarIcon focused={focused} name={'person'} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

const MainStack = createStackNavigator();
const Main = () => {
	return (
		<MainStack.Navigator
			screenOptions={{
				headerMode: 'none',
				headerShown: false,
			}}
		>
			<MainStack.Screen name="Main" component={MainTabs} />
			<MainStack.Screen name="Detail" component={Detail} />
			<MainStack.Screen name="Payment" component={Payment} />
			<MainStack.Screen name="TicketDetail" component={TicketDetail} />
			<MainStack.Screen name="Search" component={Search} />
			<MainStack.Screen name="Category" component={Category} />
			<MainStack.Screen name="PaymentGateway" component={PaymentGateway} />
		</MainStack.Navigator>
	);
};

const onBoardingStack = createStackNavigator();
const OB = () => {
	return (
		<onBoardingStack.Navigator
			screenOptions={{
				headerMode: 'none',
				headerShown: false,
			}}
		>
			<onBoardingStack.Screen name="Preference" component={Preference} />
			<onBoardingStack.Screen name="PhoneNumber" component={PhoneNumber} />
		</onBoardingStack.Navigator>
	);
};
export default () => {
	const [user, setUser] = useState(null);
	const [phone, setPhone] = useState(null);

	firebase.auth().onAuthStateChanged(function (u) {
		if (u) {
			setUser(true);
			firebase
				.database()
				.ref('users/' + u.uid + '/phoneNumber')
				.on('value', function (snapshot) {
					setPhone(snapshot.val() ? true : false);
				});
		} else {
			setUser(false);
			setPhone(false);
		}
	});

	return (
		<NavigationContainer>
			{user == null ? (
				<Loading />
			) : phone == null ? (
				<Loading />
			) : user ? (
				phone ? (
					<Main />
				) : (
					<OB />
				)
			) : (
				<Welcome />
			)}
		</NavigationContainer>
	);
};
