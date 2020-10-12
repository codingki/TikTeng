import React, { useState, useEffect } from 'react';
import {
	View,
	ScrollView,
	Image,
	TextInput,
	ActivityIndicator,
	Clipboard,
	TouchableOpacity,
} from 'react-native';
import Text from '../../components/utils/StyledText';
import TopNav from '../../components/navigation/TopNavWithBack';
import Background from '../../components/global/Background';
import Colors from '../../constants/Colors';
import PerformerCard from '../../components/card/PerformerCard';
import TicketCard from '../../components/card/MyTicketsCard';
import { Icon } from '@ui-kitten/components';
import * as firebase from 'firebase';
import * as WebBrowser from 'expo-web-browser';
export default function App({ navigation, route }) {
	const { item } = route.params;
	const [loading, setLoading] = useState(null);
	const [data, setData] = useState(null);

	useEffect(() => {
		getData();
	}, []);

	function getData() {
		const ref = firebase.database().ref('tickets/' + item.ticket.uid);
		ref.on('value', function (snapshot) {
			const data = snapshot.val();
			if (data !== null) {
				setData(data);

				setLoading(false);
			} else {
				setLoading(null);
				setData(false);
			}
		});
	}
	async function openBrowser(link) {
		await WebBrowser.openBrowserAsync(link);
	}
	return (
		<Background image={require('../../assets/background.jpg')}>
			<ScrollView>
				<TopNav title="Ticket Detail" navigation={navigation} />

				<TicketCard disabled item={item} />
				{item.ticket.bundling && (
					<View
						style={{
							marginTop: 20,
							flexDirection: 'column',
							paddingHorizontal: 20,
							paddingVertical: 20,
							backgroundColor: 'rgba(0,0,0,0.4)',
						}}
					>
						<Text
							medium
							p2
							style={{
								color: 'white',
							}}
						>
							Reddem Kuota
						</Text>
						<Text
							p3
							style={{
								color: 'white',
								lineHeight: 20,
								marginTop: 5,
							}}
						>
							Silahkan masukan kode unik untuk kuota gratisnya
						</Text>

						<View
							style={{
								marginTop: 10,
								padding: 10,
								alignItems: 'center',
								backgroundColor: 'rgba(255,255,255,0.2)',
								borderRadius: 8,
							}}
						>
							{data !== null ? (
								<Text
									style={{ color: 'white', fontSize: 14, textAlign: 'center' }}
								>
									8512-1245-5238-6923
								</Text>
							) : (
								<ActivityIndicator color="#fff" size="large" />
							)}
						</View>
					</View>
				)}

				<View
					style={{
						marginTop: 20,
						flexDirection: 'column',
						paddingHorizontal: 20,
						paddingVertical: 20,
						backgroundColor: 'rgba(0,0,0,0.4)',
					}}
				>
					<Text
						p3
						style={{
							color: 'white',
							lineHeight: 20,
							marginBottom: 20,
						}}
					>
						Mohon simpan link sebaik-baiknya dan rahasiakan, karena satu link
						hanya bisa diakses satu device. Selamat Menonton!
					</Text>
					<View
						style={{
							padding: 10,

							alignItems: 'center',
							backgroundColor: 'rgba(255,255,255,0.2)',
							borderRadius: 8,
						}}
					>
						{data !== null ? (
							<Text
								style={{ color: 'white', fontSize: 14, textAlign: 'center' }}
							>
								{data.link}
							</Text>
						) : (
							<ActivityIndicator color="#fff" size="large" />
						)}
					</View>
					{data !== null && (
						<View
							style={{
								flexDirection: 'row',
								marginTop: 20,
							}}
						>
							<TouchableOpacity
								style={{
									backgroundColor: 'rgba(255, 255, 255, 0.2)',
									padding: 10,
									flex: 1,
									alignItems: 'center',
									borderRadius: 8,
								}}
								onPress={() => {
									Clipboard.setString(data.link);
								}}
								disabled={data !== null ? false : true}
							>
								<Text
									medium
									p3
									style={{
										color: 'white',
									}}
								>
									Copy link
								</Text>
							</TouchableOpacity>
							<View
								style={{
									width: 10,
								}}
							/>

							<TouchableOpacity
								style={{
									backgroundColor: Colors.primary,
									padding: 10,
									flex: 1,
									alignItems: 'center',
									borderRadius: 8,
								}}
								disabled={data !== null ? false : true}
								onPress={() => {
									openBrowser(data.link);
								}}
							>
								<Text
									medium
									p3
									style={{
										color: 'white',
									}}
								>
									Buka link
								</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
			</ScrollView>
		</Background>
	);
}
