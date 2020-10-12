import React, { useState, useEffect } from 'react';
import {
	ScrollView,
	ActivityIndicator,
	View,
	TouchableOpacity,
} from 'react-native';
import { WebView } from 'react-native-webview';
import base64 from 'base-64';
import Colors from '../../constants/Colors';
import Text from '../../components/utils/StyledText';
import TopNav from '../../components/navigation/TopNavWithBack';
import Background from '../../components/global/Background';
import { FontAwesome } from '@expo/vector-icons';
import * as firebase from 'firebase';
export default function App({ navigation, route }) {
	const [loading, setLoading] = useState(false);
	const { invoice, show, total } = route.params;
	const [user, setUser] = useState(false);
	const [mid, setMid] = useState(false);
	const u = firebase.auth().currentUser;
	useEffect(() => {
		firebase
			.database()
			.ref('users/' + u.uid)
			.once('value')
			.then(async function (snapshot) {
				const data = snapshot.val();
				midtrans(data).then((data) => {
					setMid(data);
					if (data.error_messages) {
						alert('Tagihan ini sudah dibayar');
					}
				});
			});
	}, []);
	async function midtrans(user) {
		const url = 'https://app.sandbox.midtrans.com/snap/v1/transactions';
		const serverKey = 'SB-Mid-server-6zAlKGcTJi-6XExDUt79J31l:';
		const base64Key = base64.encode(serverKey);

		const data = {
			transaction_details: {
				order_id: invoice.uid,
				gross_amount: total,
			},
			item_details: [
				{
					id: invoice.ticket.uid,
					price: invoice.ticket.price,
					quantity: 1,
					name: show.title + ' - ' + invoice.ticket.performer,
					category: 'Online Show',
					merchant_name: show.title,
				},
				{
					id: 'Admin Fee',
					price: 5000,
					quantity: 1,
					name: 'Admin Fee',
					category: 'Cut Fee',
					merchant_name: 'TikTeng',
				},
			],
			customer_details: {
				first_name: user.name,
				email: user.email,
				phone: user.phoneNumber,
			},
		};

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Basic ' + base64Key,
			},
			body: JSON.stringify(data),
		});
		return response.json();
	}

	async function check() {
		const url = `https://api.sandbox.midtrans.com/v2/${invoice.uid}/status`;
		const serverKey = 'SB-Mid-server-6zAlKGcTJi-6XExDUt79J31l:';
		const base64Key = base64.encode(serverKey);

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Basic ' + base64Key,
			},
		});
		return response.json();
	}

	return (
		<Background image={require('../../assets/background.png')}>
			<TopNav title="Bayar Sekarang" navigation={navigation} />
			{!mid ? (
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<ActivityIndicator color="#fff" size="large" />
				</View>
			) : (
				<>
					<WebView
						source={{
							uri: mid.redirect_url,
						}}
						style={{ flex: 1 }}
					/>

					<TouchableOpacity
						onPress={() => {
							setLoading(true);
							check().then((data) => {
								if (data.status_code == 200) {
									firebase
										.database()
										.ref('invoice/' + invoice.uid)
										.update({
											paid: true,
										})
										.then(function () {
											setLoading(false);
											navigation.replace('TicketDetail', {
												item: invoice,
											});
										})
										.catch(function (error) {
											alert(error);
										});
								} else {
									setLoading(false);
									alert('Hmmm, kamu belum bayar nih');
								}
							});
						}}
						style={{
							backgroundColor: Colors.primary,
							padding: 20,
							paddingVertical: 15,

							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
						disabled={loading}
					>
						<Text
							bold
							p2
							style={{
								color: 'white',
							}}
						>
							Cek Pembayaran
						</Text>
						{loading ? (
							<ActivityIndicator color="#fff" />
						) : (
							<FontAwesome name="check-square" size={20} color="white" />
						)}
					</TouchableOpacity>
				</>
			)}
		</Background>
	);
}
