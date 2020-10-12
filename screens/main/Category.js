import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import Text from '../../components/utils/StyledText';
import TopNav from '../../components/navigation/SearchWIthBackTopNav';
import Background from '../../components/global/Background';
import CategoryCard from '../../components/card/CategoryCard';
import ExploreCard from '../../components/card/ExploreCard';
import moment from 'moment';
import * as firebase from 'firebase';
var _ = require('lodash');
export default function App({ navigation, route }) {
	const { category, name } = route.params;
	const [data, setData] = useState(null);
	useEffect(() => {
		getData();
	}, []);

	function getData() {
		const ref = firebase
			.database()
			.ref('shows')
			.orderByChild('category')
			.equalTo(name);
		ref.once('value', function (snapshot) {
			const data = snapshot.val();
			if (data !== null) {
				setData(_.sortBy(Object.values(data), ['date']));
			} else {
				setData(null);
			}
		});
	}
	return (
		<Background image={require('../../assets/background.jpg')}>
			<ScrollView>
				<TopNav title="Search" navigation={navigation} />

				<View
					style={{
						paddingHorizontal: 20,
						paddingVertical: 20,
						backgroundColor: 'rgba(0,0,0,0.2)',
					}}
				>
					<Text medium p2 style={{ color: 'white' }}>
						{category}
					</Text>

					{data == null ? (
						<View
							style={{
								flex: 1,
								marginTop: 20,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<ActivityIndicator color="#fff" size="large" />
						</View>
					) : (
						data.map((item) => (
							<ExploreCard key={item.uid} item={item} navigation={navigation} />
						))
					)}
				</View>
			</ScrollView>
		</Background>
	);
}
