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

const { width, height } = Dimensions.get('window');
const category = 0.034 * width;
export default function TopNav(props) {
	const [search, setSearch] = useState('');
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
				<View style={{ flex: 1, alignItems: 'flex-start' }}></View>
				<View
					style={{
						alignItems: 'center',
						flex: 4,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<TextInput
						style={{
							flex: 1,
							backgroundColor: 'white',
							height: 30,
							textAlign: 'center',
							borderRadius: 5,
						}}
						placeholder="Search"
						value={search}
						onChangeText={(text) => {
							setSearch(text);
						}}
						onSubmitEditing={() => {
							props.navigation.navigate('Search', {
								search: search,
							});
						}}
					/>
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
