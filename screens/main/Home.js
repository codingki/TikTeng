import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Text from '../../components/utils/StyledText';
import TopNav from '../../components/navigation/TopNav';
import FestivalCard from '../../components/card/FestivalCard';
import Background from '../../components/global/Background';
import * as firebase from 'firebase';
import moment from 'moment';

var _ = require('lodash');
export default function App({ navigation }) {
	const [data, setData] = useState(null);
	const [preference, setPreference] = useState(null);
	const [filtered, setFiltered] = useState(null);

	useEffect(() => {
		getPreference();
		getData();
	}, []);

	useEffect(() => {
		load();
	}, [data, preference]);

	function filterData() {
		let datanya = data;
		if (
			preference.jazz == false &&
			preference.pop == false &&
			preference.indie == false &&
			preference.dangdut == false &&
			preference.electronicMusic == false
		) {
			datanya = datanya;
		} else {
			if (preference.jazz == false) {
				datanya = _.reject(datanya, { category: 'jazz' });
			}
			if (preference.pop == false) {
				datanya = _.reject(datanya, { category: 'pop' });
			}
			if (preference.indie == false) {
				datanya = _.reject(datanya, { category: 'indie' });
			}
			if (preference.dangdut == false) {
				datanya = _.reject(datanya, { category: 'dangdut' });
			}
			if (preference.electronicMusic == false) {
				datanya = _.reject(datanya, { category: 'electronicMusic' });
			}
		}

		return Object.values(datanya);
	}

	function getPreference() {
		const { uid } = firebase.auth().currentUser;
		const ref = firebase.database().ref('users/' + uid + '/preference');
		ref.once('value', function (snapshot) {
			const data = snapshot.val();
			if (data !== null) {
				setPreference(data);
			} else {
				setPreference(null);
			}
		});
	}

	function load() {
		if (data !== null && preference !== null) {
			setFiltered(filterData());
		}
	}

	function getData() {
		const ref = firebase
			.database()
			.ref('shows')
			.orderByChild('date')
			.startAt(moment().format('YYYY-MM-DD'));
		ref.once('value', function (snapshot) {
			const data = snapshot.val();
			if (data !== null) {
				setData(Object.values(data));
			} else {
				setData(null);
			}
		});
	}

	return (
		<Background image={require('../../assets/background.jpg')}>
			<TopNav title="TikTeng" />

			<View style={{ paddingHorizontal: 20, marginTop: 20 }}>
				<Text medium p2 style={{ color: 'white' }}>
					Kayanya kamu suka ini deh
				</Text>
			</View>
			{filtered == null ? (
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
				<FestivalCard navigation={navigation} data={filtered} />
			)}
		</Background>
	);
}
