import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Text from '../utils/StyledText';
import Colors from '../../constants/Colors';
const { width, height } = Dimensions.get('window');
const w = width - 60;
const fxw = w / 3;
export default function (props) {
	return (
		<View
			style={{
				marginRight: 10,
			}}
		>
			<Image
				style={{ borderRadius: 12, width: fxw, height: fxw }}
				resizeMode="cover"
				source={props.image}
			/>

			<LinearGradient
				colors={['transparent', 'rgba(233,69,96,0.3)']}
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: 0,
					height: '100%',
					borderRadius: 12,
				}}
			/>
			<Text
				style={{
					backgroundColor: 'transparent',
					fontSize: 12,
					color: '#fff',
					position: 'absolute',
					bottom: 10,
					left: 10,
				}}
				bold
			>
				{props.title}
			</Text>
		</View>
	);
}
