import React, { useState } from 'react';
import {
	View,
	StyleSheet,
	ScrollView,
	Image,
	Dimensions,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Text from '../utils/StyledText';
import { Icon } from '@ui-kitten/components';

const { width, height } = Dimensions.get('window');
const category = 0.034 * width;
export default function TopNav(props) {
	return (
		<View>
			<View
				style={{
					paddingHorizontal: 20,
					height: 64,
					flexDirection: 'row',
					justifyContent: 'space-between',

					alignItems: 'center',
				}}
			>
				<TouchableOpacity
					onPress={() => {
						props.navigation.goBack();
					}}
					style={{ flex: 1, alignItems: 'flex-start' }}
				>
					<Icon name="arrow-ios-back" width={24} height={24} fill="#FFF" />
				</TouchableOpacity>

				<View
					style={{
						alignItems: 'center',
						flex: 5,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Text
						bold
						style={{
							color: 'white',
							fontSize: 0.0437 * width > 18 ? 18 : 0.0437 * width,
						}}
					>
						{props.title}
					</Text>
				</View>
				<View
					style={{
						alignItems: 'flex-end',
						flex: 1,
						justifyContent: 'center',
					}}
				></View>
			</View>
		</View>
	);
}
