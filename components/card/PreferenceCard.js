import React, { useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import Text from '../../components/utils/StyledText';
import Colors from '../../constants/Colors';

export default function App(props) {
	const [choosen, setChoosen] = useState(false);
	const handleCategory = (name, x) => {
		props.press(name, x);
	};
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				const x = !choosen;
				setChoosen(x);
				handleCategory(props.name, x);
			}}
		>
			<View
				style={{
					backgroundColor: choosen ? 'white' : 'rgba(255,255,255,0.2)',
					padding: 15,
					alignItems: 'center',
					borderRadius: 12,
					marginTop: 15,
				}}
			>
				<Text
					bold
					p2
					style={{
						color: choosen ? Colors.primary : 'white',
					}}
				>
					{props.title}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);
}
