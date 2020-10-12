import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';
import Text from '../../components/utils/StyledText';
import Onboarding from 'react-native-onboarding-swiper';
import Colors from '../../constants/Colors';

export default function App({ navigation }) {
	const Next = ({ ...props }) => (
		<View style={{ padding: 20 }}>
			<Text p3 style={{ color: 'white' }} {...props}>
				Selanjutnya
			</Text>
		</View>
	);
	const Done = ({ ...props }) => (
		<View style={{ padding: 20 }}>
			<Text p3 style={{ color: 'white' }} {...props}>
				Masuk
			</Text>
		</View>
	);
	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../../assets/onboardingBackground.png')}
				style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}
			>
				<StatusBar style="light" translucent backgroundColor="#121212" />
				<Onboarding
					showSkip={false}
					onDone={() => {
						navigation.navigate('Login');
					}}
					NextButtonComponent={Next}
					DoneButtonComponent={Done}
					pages={[
						{
							image: <Image />,
							backgroundColor: 'rgba(0,0,0,0)',
							titleStyles: {
								fontFamily: 'Ubuntu_700Bold',
								color: 'white',
							},
							subTitleStyles: {
								fontFamily: 'Ubuntu_400Regular',
								color: 'white',
							},
							title: 'Welcome to TikTeng',
							subtitle:
								'Platform penjualan tiket konser online yang bisa diketeng',
						},
						{
							image: <Image />,
							backgroundColor: 'rgba(0,0,0,0)',
							titleStyles: {
								fontFamily: 'Ubuntu_700Bold',
								color: 'white',
							},
							subTitleStyles: {
								fontFamily: 'Ubuntu_400Regular',
								color: 'white',
							},
							title: 'Ketengan? Apatuh?',
							subtitle:
								'Ketengan itu bisa memilih performer sesuai keinginanmu sendiri dengan harga yang lebih murah',
						},
						{
							image: <Image />,
							backgroundColor: 'rgba(0,0,0,0)',
							titleStyles: {
								fontFamily: 'Ubuntu_700Bold',
								color: 'white',
							},
							subTitleStyles: {
								fontFamily: 'Ubuntu_400Regular',
								color: 'white',
							},
							title: 'Emang bisa?',
							subtitle:
								'Bisa dong, kan udah ada TikTeng. Nonton performer favoritmu tanpa ribet',
						},
					]}
				/>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
