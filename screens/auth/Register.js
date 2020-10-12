import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	Image,
	TextInput,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	ActivityIndicator,
} from 'react-native';
import Text from '../../components/utils/StyledText';
import Colors from '../../constants/Colors';
import * as firebase from 'firebase';
import Background from '../../components/global/Background';
export default function ({ navigation }) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	async function register() {
		setLoading(true);
		await firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(async (auth) => {
				await auth.user.updateProfile({
					displayName: name,
				});
			})
			.catch(function (error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// ...
				setLoading(false);
				alert(errorMessage);
			});
	}

	return (
		<Background image={require('../../assets/onboardingBackground.png')}>
			<KeyboardAvoidingView behavior="height" enabled>
				<ScrollView>
					<View
						style={{
							flex: 1,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					></View>

					<View
						style={{
							flex: 3,
							paddingHorizontal: 20,
							paddingBottom: 20,
						}}
					>
						<Text
							bold
							style={{
								fontSize: 24,
								color: 'white',
								alignSelf: 'center',
								padding: 30,
							}}
						>
							Daftar
						</Text>
						<Text style={{ color: 'white' }} p2>
							Nama
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
								placeholder="Masukan Namamu"
								value={name}
								onChangeText={(text) => setName(text)}
							/>
						</View>
						<Text p2 style={{ marginTop: 15, color: 'white' }}>
							Email
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
								placeholder="Masukan Email"
								value={email}
								keyboardType="email-address"
								onChangeText={(text) => setEmail(text)}
							/>
						</View>
						<Text p2 style={{ marginTop: 15, color: 'white' }}>
							Password
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
								placeholder="Masukan Password"
								value={password}
								secureTextEntry={true}
								onChangeText={(text) => setPassword(text)}
							/>
						</View>
						<TouchableOpacity
							onPress={() => {
								register();
							}}
							disabled={loading}
						>
							<View
								style={{
									flexDirection: 'row',
								}}
							>
								<View
									style={{
										marginTop: 30,
										flex: 1,
										alignItems: 'center',
										justifyContent: 'center',
										padding: 15,
										backgroundColor: Colors.primary,
										borderRadius: 12,
									}}
								>
									{loading ? (
										<ActivityIndicator color="#fff" />
									) : (
										<Text bold p2 style={{ color: 'white' }}>
											Lanjutkan
										</Text>
									)}
								</View>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								loginWithFacebook();
							}}
							disabled={loading}
							style={{
								marginTop: 20,
							}}
						>
							<View
								style={{
									flexDirection: 'row',
								}}
							>
								<View
									style={{
										marginTop: 15,
										flex: 1,
										alignItems: 'center',
										justifyContent: 'center',
										padding: 15,
										backgroundColor: '#4267B2',
										borderRadius: 12,
									}}
								>
									{loading ? (
										<ActivityIndicator color="#fff" />
									) : (
										<Text bold p2 style={{ color: 'white' }}>
											Continue with Facebook
										</Text>
									)}
								</View>
							</View>
						</TouchableOpacity>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								marginTop: 15,
								justifyContent: 'center',
							}}
						>
							<Text
								p3
								style={{
									color: 'white',
								}}
							>
								Sudah punya akun?
							</Text>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate('Login');
								}}
							>
								<Text
									bold
									p3
									style={{
										marginLeft: 5,
										color: 'white',
									}}
								>
									Masuk disini
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</Background>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F7f7f7',
	},
});
