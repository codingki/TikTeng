import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import Text from '../../components/utils/StyledText';
import TopNav from '../../components/navigation/TopNav';
import Background from '../../components/global/Background';
import TiketCard from '../../components/card/MyTicketsCard';
import * as firebase from 'firebase';
const { width, height } = Dimensions.get('window');
var _ = require('lodash');
export default function App({ navigation }) {
	const [loading, setLoading] = useState(true);
	const [paid, setPaid] = useState(null);
	const [notPaid, setNotPaid] = useState(null);
	useEffect(() => {
		getUsersTickets();
	}, []);

	function getUsersTickets() {
		const user = firebase.auth().currentUser;
		const ref = firebase
			.database()
			.ref('invoice')
			.orderByChild('userUid')
			.equalTo(user.uid);
		ref.on('value', function (snapshot) {
			const data = snapshot.val();
			if (data !== null) {
				const tix = Object.values(data);
				const paid = _.reject(tix, ['paid', false]);
				const notPaid = _.reject(tix, ['paid', true]);
				setPaid(paid);
				setNotPaid(notPaid);
				setLoading(false);
			} else {
				setLoading(null);
			}
		});
	}
	return (
		<Background image={require('../../assets/background.jpg')}>
			<ScrollView>
				<TopNav title="My Tickets" />
				{loading ? (
					<View
						style={{
							marginTop: height / 2 - 64,
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<ActivityIndicator color="#fff" size="large" />
					</View>
				) : loading == null ? (
					<View
						style={{
							marginTop: height / 2 - 64,
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Text bold p1 style={{ color: 'white' }}>
							Belum ada tiket yang dibooking
						</Text>
					</View>
				) : (
					<>
						{paid.length !== 0 && (
							<View
								style={{
									paddingHorizontal: 20,
									marginTop: 20,
									marginBottom: 10,
								}}
							>
								<Text medium p2 style={{ color: 'white' }}>
									Yang sudah dibayar
								</Text>
							</View>
						)}

						{paid.map((item) => (
							<TiketCard navigation={navigation} key={item.uid} item={item} />
						))}

						{notPaid.length !== 0 && (
							<View
								style={{
									paddingHorizontal: 20,
									marginTop: 20,
									marginBottom: 10,
								}}
							>
								<Text medium p2 style={{ color: 'white' }}>
									Yang belum dibayar
								</Text>
							</View>
						)}
						{notPaid.map((item) => (
							<TiketCard navigation={navigation} key={item.uid} item={item} />
						))}
					</>
				)}
			</ScrollView>
		</Background>
	);
}
