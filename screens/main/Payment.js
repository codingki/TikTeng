import React, { useEffect, useState } from 'react';
import {
	View,
	ScrollView,
	Image,
	TextInput,
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native';
import Text from '../../components/utils/StyledText';
import TopNav from '../../components/navigation/TopNavWithBack';
import Background from '../../components/global/Background';
import Colors from '../../constants/Colors';
import PerformerCard from '../../components/card/PerformerCard';
import TicketCard from '../../components/card/TicketCard';
import { Icon } from '@ui-kitten/components';
import moment from 'moment';
import * as firebase from 'firebase';
import numeral from 'numeral';
export default function App({ navigation, route }) {
	const { item } = route.params;
	const [show, setShow] = useState(null);

	useEffect(() => {
		getShowDetail();
	}, []);
	function getShowDetail() {
		const ref = firebase.database().ref('shows/' + item.ticket.showUid);
		ref.once('value', function (snapshot) {
			const data = snapshot.val();
			if (data !== null) {
				setShow(data);
			} else {
				setShow(null);
			}
		});
	}
	return (
		<Background image={require('../../assets/background.png')}>
			<ScrollView>
				<TopNav title="Payment" navigation={navigation} />
				<View
					style={{
						padding: 20,
						flexDirection: 'column',
					}}
				>
					{show == null ? (
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
							<Text bold p1 style={{ color: 'white' }}>
								{show.title}
							</Text>
							<View
								style={{
									flexDirection: 'row',
									marginTop: 5,
									alignItems: 'center',
								}}
							>
								<Icon
									name="calendar-outline"
									fill="#fff"
									width={20}
									height={20}
									style={{ marginRight: 5 }}
								/>
								<Text
									medium
									p2
									style={{
										color: 'white',
									}}
								>
									{moment(show.date).format('D MMMM YYYY')}
								</Text>
							</View>
						</>
					)}

					<TicketCard disabled item={item.ticket} />
				</View>

				<View
					style={{
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
						}}
					>
						Ini adalah acara online, link akan diberikan setelah proses
						pembayaran selesai.
					</Text>
					{item.ticket.bundling && (
						<Text
							p3
							style={{
								color: 'white',
								lineHeight: 20,
								marginTop: 10,
							}}
						>
							Pembayaran sudah termasuk kuota bonus, kode voucher kuota bonus
							akan diberikan bersama link untuk streaming.
						</Text>
					)}
				</View>
				<View
					style={{
						marginTop: 20,
						flexDirection: 'column',
						paddingHorizontal: 20,
					}}
				>
					<Text
						p2
						bold
						style={{
							color: 'white',
						}}
					>
						Total
					</Text>
					<View
						style={{
							marginTop: 20,
							flexDirection: 'column',
							paddingHorizontal: 20,
							paddingVertical: 20,
							backgroundColor: 'rgba(0,0,0,0.4)',
							borderRadius: 12,
						}}
					>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
							}}
						>
							<Text
								bold
								p3
								style={{
									color: 'white',
								}}
							>
								Nonton Semuanya
							</Text>
							<Text
								medium
								p3
								style={{
									color: 'white',
								}}
							>
								{numeral(item.ticket.price).format('0,0')}
							</Text>
						</View>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								marginTop: 10,
							}}
						>
							<Text
								bold
								p3
								style={{
									color: 'white',
								}}
							>
								Biaya admin
							</Text>
							<Text
								medium
								p3
								style={{
									color: 'white',
								}}
							>
								5.000
							</Text>
						</View>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								marginTop: 20,
							}}
						>
							<Text
								bold
								p1
								style={{
									color: 'white',
								}}
							>
								Total
							</Text>
							<Text
								bold
								p1
								style={{
									color: 'white',
								}}
							>
								{numeral(item.ticket.price + 5000).format('0,0')}
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>
			<TouchableOpacity
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
				onPress={() => {
					navigation.navigate('PaymentGateway', {
						show: show,
						invoice: item,
						total: item.ticket.price + 5000,
					});
				}}
			>
				<Text bold p2 style={{ color: 'white' }}>
					Bayar Sekarang
				</Text>
			</TouchableOpacity>
		</Background>
	);
}
