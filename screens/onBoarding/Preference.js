import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from 'react-native';
import Text from '../../components/utils/StyledText';
import TopNav from '../../components/navigation/TopNav';
import Colors from '../../constants/Colors';
import Background from '../../components/global/Background';
import PreferenceCard from '../../components/card/PreferenceCard';
import * as firebase from 'firebase';
export default function App({ navigation }) {
	const [jazz, setJazz] = useState(false);
	const [pop, setPop] = useState(false);
	const [dangdung, setDangdut] = useState(false);
	const [indie, setIndie] = useState(false);
	const [edm, setEdm] = useState(false);
	const [preference, setPreference] = useState({
		jazz: false,
		pop: false,
		dangdut: false,
		indie: false,
		electronicMusic: false,
	});
	const handleCategory = (name, choosen) => {
		if (choosen) {
			setPreference({
				...preference,
				[name]: true,
			});
		} else {
			setPreference({
				...preference,
				[name]: false,
			});
		}
	};
	function lanjutkan() {
		const user = firebase.auth().currentUser;
		firebase
			.database()
			.ref('users/' + user.uid)
			.update({ preference })
			.then(function () {
				navigation.navigate('PhoneNumber');
			});
	}
	return (
		<Background image={require('../../assets/background.jpg')}>
			<View
				style={{
					flexDirection: 'column',
					marginHorizontal: 20,
				}}
			>
				<Text bold p2 style={{ color: 'white', marginBottom: 10 }}>
					Genre musik yang kamu suka apa sih?
				</Text>

				<PreferenceCard title="Jazz" name="jazz" press={handleCategory} />

				<PreferenceCard title="Pop" name="pop" press={handleCategory} />
				<PreferenceCard title="Indie" name="indie" press={handleCategory} />
				<PreferenceCard
					title="Electronic Music"
					name="electronicMusic"
					press={handleCategory}
				/>
				<PreferenceCard title="Dangdut" name="dangdut" press={handleCategory} />
			</View>
			<TouchableOpacity
				onPress={() => {
					lanjutkan();
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
			>
				<Text bold p2 style={{ color: 'white' }}>
					Lanjutkan
				</Text>
			</TouchableOpacity>
		</Background>
	);
}
