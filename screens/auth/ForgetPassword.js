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
	const [email, setEmail] = useState('');

	const [loading, setLoading] = useState(false);
	async function forgetPassword() {
		setLoading(true);
		await firebase
			.auth()
			.sendPasswordResetEmail(email)
			.then(function () {
				setLoading(false);
				navigation.navigate('Login');
				alert('Password reset sudah dikirim ke email anda');
			})
			.catch(function (error) {
				setLoading(false);
				alert(error);
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
							Lupa Password
						</Text>
						<Text style={{ color: 'white' }} p2>
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

						<TouchableOpacity
							onPress={() => {
								forgetPassword();
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
											Ganti Password
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
										color: Colors.primary,
									}}
								>
									Masuk disini
								</Text>
							</TouchableOpacity>
						</View>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								marginTop: 15,
								justifyContent: 'center',
							}}
						>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate('ForgetPassword');
								}}
							>
								<Text
									medium
									p3
									style={{
										marginLeft: 5,
										color: Colors.primary,
									}}
								>
									Lupa Password
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
