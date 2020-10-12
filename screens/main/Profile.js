import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image } from 'react-native';
import Text from '../../components/utils/StyledText';
import TopNav from '../../components/navigation/TopNav';
import Background from '../../components/global/Background';
import TiketCard from '../../components/card/MyTicketsCard';
import Colors from '../../constants/Colors';
import * as firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function App({ navigation }) {
	const [user, setUser] = useState(false);
	const u = firebase.auth().currentUser;
	useEffect(() => {
		firebase
			.database()
			.ref('users/' + u.uid)
			.once('value')
			.then(function (snapshot) {
				setUser(snapshot.val());
			});
	}, []);

	return (
		<Background image={require('../../assets/background.jpg')}>
			<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
				<View
					style={{
						alignItems: 'center',
						justifyContent: 'center',
						marginTop: 20,
					}}
				>
					<Image
						style={{
							height: 100,
							width: 100,
							borderRadius: 50,
						}}
						source={{
							uri: u.photoURL
								? u.photoURL
								: 'https://i.ibb.co/NWjH1w5/avatar-placeholder.png',
						}}
					/>
					<Text bold p1 style={{ color: 'white', marginTop: 20 }}>
						{user.name}
					</Text>
				</View>
				<View style={{ flexDirection: 'row' }}>
					<View
						style={{
							marginHorizontal: 20,
							marginTop: 20,
							padding: 20,
							backgroundColor: 'rgba(255,255,255,0.2)',
							borderRadius: 12,
							flex: 1,
						}}
					>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
							}}
						>
							<Text
								bold
								p3
								style={{
									color: 'white',
								}}
							>
								Email
							</Text>
							<Text
								medium
								p3
								style={{
									color: 'white',
								}}
							>
								{user.email}
							</Text>
						</View>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								marginTop: 20,
							}}
						>
							<Text
								bold
								p3
								style={{
									color: 'white',
								}}
							>
								No. Telepon
							</Text>
							<Text
								medium
								p3
								style={{
									color: 'white',
								}}
							>
								{user.phoneNumber ? user.phoneNumber : 'Kosong'}
							</Text>
						</View>
					</View>
				</View>
				<TouchableOpacity
					onPress={() => {
						firebase.auth().signOut();
					}}
					style={{
						marginTop: 10,
						marginHorizontal: 20,
					}}
				>
					<Text
						p3
						light
						style={{
							color: 'red',
						}}
					>
						Logout
					</Text>
				</TouchableOpacity>
			</View>
		</Background>
	);
}
