import React from 'react';
import { ActivityIndicator } from 'react-native';
import Background from '../../components/global/Background';
export default function App({}) {
	return (
		<Background image={require('../../assets/background.jpg')}>
			<ActivityIndicator color="#fff" />
		</Background>
	);
}
