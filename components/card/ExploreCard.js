import React from 'react';
import {
	StyleSheet,
	View,
	Image,
	Dimensions,
	TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Text from '../utils/StyledText';
import Colors from '../../constants/Colors';
import moment from 'moment';
const { width, height } = Dimensions.get('window');
const w = width - 60;
const fxw = w / 3;
export default function (props) {
	const item = props.item;
	return (
		<TouchableOpacity
			style={{
				flexDirection: 'row',
				marginTop: 20,
			}}
			onPress={() => {
				props.navigation.navigate('Detail', {
					item: item,
				});
			}}
		>
			<Image
				style={{
					flex: 2,
					borderRadius: 12,
				}}
				source={{ uri: item.poster }}
			/>
			<View
				style={{
					flexDirection: 'column',
					flex: 5,
					paddingHorizontal: 14,
					paddingVertical: 12,
					height: 130,
				}}
			>
				<Text
					bold
					p1
					style={{
						color: 'white',
					}}
				>
					{item.title}
				</Text>
				<Text medium p3 style={{ color: 'white', marginTop: 5 }}>
					{moment(item.date).format('D MMMM YYYY')}
				</Text>
				{item.ketengan && (
					<View
						style={{
							marginTop: 5,
							paddingVertical: 2,
							paddingHorizontal: 6,
							borderRadius: 4,
							backgroundColor: Colors.primary,
							justifyContent: 'center',
							alignItems: 'center',
							width: 85,
						}}
					>
						<Text medium style={{ fontSize: 10, color: '#fff' }}>
							Bisa Ketengan
						</Text>
					</View>
				)}
			</View>
		</TouchableOpacity>
	);
}
