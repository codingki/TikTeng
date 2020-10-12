import React, { useState } from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import Text from '../utils/StyledText';
import moment from 'moment';
var numeral = require('numeral');
import * as firebase from 'firebase';
import { StackActions } from '@react-navigation/native';
export default function (props) {
	const [loading, setLoading] = useState(false);
	const item = props.item;
	const clickTicket = (dataTicket) => {
		const ref = firebase.database().ref('invoice');
		const u = firebase.auth().currentUser;
		const userRef = firebase.database().ref('users/' + u.uid);
		userRef.once('value', function (snapshot) {
			var key = ref.push().key;
			const ticket = {
				ticket: dataTicket,
				uid: key,
				timeStamp: moment().format(),
				paid: false,
				user: {
					uid: snapshot.val().uid,
					email: snapshot.val().email,
					name: snapshot.val().name,
					phoneNumber: snapshot.val().phoneNumber,
				},
				userUid: snapshot.val().uid,
			};
			ref
				.child(key)
				.update(ticket)
				.then(function () {
					props.navigation.dispatch(
						StackActions.replace('Payment', {
							item: ticket,
						})
					);
				})
				.catch(function (error) {
					alert(error);
				});
		});
	};
	return (
		<TouchableOpacity
			style={{
				flexDirection: 'row',
				backgroundColor: 'rgba(255,255,255,0.2)',
				marginTop: 20,
				borderRadius: 12,
				flex: 1,
			}}
			onPress={() => {
				clickTicket(item);
			}}
			disabled={props.disabled}
		>
			<View
				style={{
					width: 20,
					backgroundColor: item.full
						? 'rgba(212,167,23,0.8)'
						: 'rgba(233,69,96,0.7)',

					borderBottomLeftRadius: 12,
					borderTopLeftRadius: 12,
				}}
			/>
			<View
				style={{
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<View
					style={{
						flexDirection: 'column',
						paddingHorizontal: 15,
						paddingVertical: 15,
					}}
				>
					<Text medium p2 style={{ color: 'white' }}>
						{item.performer}
					</Text>
					<Text medium p2 style={{ color: 'white' }}>
						{moment(item.date + ' ' + item.timeStart).format('HH:mm')} -{' '}
						{moment(item.date + ' ' + item.timeEnd).format('HH:mm')}
					</Text>
				</View>

				<Text bold p1 style={{ color: 'white', paddingRight: 20 }}>
					{numeral(item.price).format('0,0')}
				</Text>
			</View>
		</TouchableOpacity>
	);
}
