import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, ActivityIndicator } from 'react-native';
import Text from '../../components/utils/StyledText';
import TopNav from '../../components/navigation/TopNavWithBack';
import Background from '../../components/global/Background';
import Colors from '../../constants/Colors';
import PerformerCard from '../../components/card/PerformerCard';
import TicketCard from '../../components/card/TicketCard';
import moment from 'moment';
import * as firebase from 'firebase';

var _ = require('lodash');

export default function App({ navigation, route }) {
	const { item } = route.params;
	const [data, setData] = useState(null);
	useEffect(() => {
		getTickets();
	}, []);

	function getTickets() {
		const ref = firebase
			.database()
			.ref('tickets')
			.orderByChild('showUid')
			.equalTo(item.uid);
		ref.once('value', function (snapshot) {
			const data = snapshot.val();
			if (data !== null) {
				setData(Object.values(data));
			} else {
				setData(null);
			}
		});
	}

	function performer(data) {
		const ilangin = _.reject(data, ['full', true]);
		const sort = _.sortBy(ilangin, ['timeStart']);

		return sort;
	}

	function full(data) {
		const ilangin = _.reject(data, ['full', false]);

		return ilangin;
	}

	return (
		<Background image={require('../../assets/background.jpg')}>
			<ScrollView>
				<TopNav title="Show Detail" navigation={navigation} />

				<View
					style={{
						flexDirection: 'row',
						margin: 20,
					}}
				>
					<Image
						style={{
							flex: 1,
							borderRadius: 12,
						}}
						source={{ uri: item.poster }}
					/>
					<View
						style={{
							flexDirection: 'column',
							flex: 2,
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
						{item.bundling && (
							<View
								style={{
									marginTop: 5,
									paddingVertical: 2,
									borderRadius: 4,
									backgroundColor: 'rgba(0,248,248,0.7)',
									justifyContent: 'center',
									alignItems: 'center',
									width: 130,
								}}
							>
								<Text medium style={{ fontSize: 10, color: '#fff' }}>
									Gratis kuota streaming
								</Text>
							</View>
						)}
					</View>
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
						{item.description}
					</Text>
					<Text
						bold
						p2
						style={{
							color: 'white',
							marginTop: 10,
						}}
					>
						Perfomance by:
					</Text>
					{data == null ? (
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
							{performer(data).map((item) => (
								<PerformerCard key={item.uid} item={item} />
							))}
							<View
								style={{
									flexDirection: 'column',
									paddingVertical: 20,
								}}
							>
								<Text bold p2 style={{ color: 'white' }}>
									Full Show
								</Text>
								{full(data).map((item) => (
									<TicketCard
										navigation={navigation}
										item={item}
										key={item.uid}
									/>
								))}
							</View>
							<View
								style={{
									flexDirection: 'column',
									marginTop: 10,
								}}
							>
								<Text bold p2 style={{ color: 'white' }}>
									Tiket Ketengan
								</Text>
								{performer(data).map((item) => (
									<TicketCard
										navigation={navigation}
										item={item}
										key={item.uid}
									/>
								))}
							</View>
						</>
					)}
				</View>
			</ScrollView>
		</Background>
	);
}
