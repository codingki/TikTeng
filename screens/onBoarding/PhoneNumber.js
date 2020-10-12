import React from 'react';
import {
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';
import Text from '../../components/utils/StyledText';
import TopNav from '../../components/navigation/TopNavWithBack';
import Colors from '../../constants/Colors';
import Background from '../../components/global/Background';
import PreferenceCard from '../../components/card/PreferenceCard';
import * as firebase from 'firebase';
export default function App({ navigation }) {
	const [phone, setPhone] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	function updatePhone() {
		setLoading(true);
		const user = firebase.auth().currentUser;
		firebase
			.database()
			.ref('users/' + user.uid)
			.update({
				name: user.displayName,
				email: user.email,
				phoneNumber: phone,
				uid: user.uid,
			})
			.catch((e) => {
				setLoading(false);
				alert(e);
			});
	}
	return (
		<Background image={require('../../assets/background.jpg')}>
			<View style={{ left: 0, right: 0, top: 0, position: 'absolute' }}>
				<TopNav navigation={navigation} />
			</View>

			<View
				style={{
					flexDirection: 'column',
					marginHorizontal: 20,
				}}
			>
				<Text bold p2 style={{ color: 'white', marginBottom: 10 }}>
					Satu langkah lagi...
				</Text>
				<View
					style={{
						marginTop: 15,
						backgroundColor: '#FFF',
						borderRadius: 5,
						flexDirection: 'row',
					}}
				>
					<TextInput
						style={{
							padding: 10,
							paddingHorizontal: 20,
							textAlign: 'left',
							color: 'grey',
							flex: 1,
						}}
						placeholder="Masukan No. Telepon"
						value={phone}
						keyboardType="numeric"
						onChangeText={(text) => setPhone(text)}
					/>
				</View>
			</View>
			<TouchableOpacity
				onPress={() => {
					updatePhone();
				}}
				style={{
					margin: 20,
					padding: 15,
					backgroundColor: Colors.primary,
					alignItems: 'center',
					borderRadius: 12,
					position: 'absolute',
					left: 0,
					right: 0,
					bottom: 0,
				}}
				disabled={loading}
			>
				{loading ? (
					<ActivityIndicator color="#fff" />
				) : (
					<Text bold p2 style={{ color: 'white' }}>
						Lanjutkan
					</Text>
				)}
			</TouchableOpacity>
		</Background>
	);
}
