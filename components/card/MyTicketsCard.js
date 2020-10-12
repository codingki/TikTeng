import React, { useEffect, useState } from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import Text from '../utils/StyledText';
import moment from 'moment';
import * as firebase from 'firebase';
var numeral = require('numeral');
export default function (props) {
	const [show, setShow] = useState('');
	const item = props.item;
	const ticket = item.ticket;
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
		<TouchableOpacity
			onPress={() => {
				props.navigation.navigate(item.paid ? 'TicketDetail' : 'Payment', {
					item: item,
				});
			}}
			disabled={props.disabled}
		>
			<View
				style={{
					flexDirection: 'column',
					marginHorizontal: 20,
					backgroundColor: 'rgba(255,255,255,0.2)',
					marginTop: 20,
					borderRadius: 12,
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						paddingHorizontal: 15,
						backgroundColor: ticket.full
							? 'rgba(255,198,11,0.7)'
							: 'rgba(233,69,96,0.7)',
						justifyContent: 'space-between',
						alignItems: 'center',
						height: 32,
						borderTopLeftRadius: 12,
						borderTopRightRadius: 12,
					}}
				>
					<Text numberOfLines={1} bold p3 style={{ color: 'white', flex: 4 }}>
						{show.title}
					</Text>
					<Text p3 style={{ color: 'white', flex: 2, textAlign: 'right' }}>
						{moment(show.date).format('D MMM YYYY')}
					</Text>
				</View>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						padding: 15,
						paddingVertical: 10,
					}}
				>
					<View
						style={{
							flexDirection: 'column',
						}}
					>
						<Text medium p2 style={{ color: 'white' }}>
							{ticket.performer}
						</Text>
						<Text medium p2 style={{ color: 'white' }}>
							{moment(ticket.date + ' ' + ticket.timeStart).format('HH:mm')} -{' '}
							{moment(ticket.date + ' ' + ticket.timeEnd).format('HH:mm')}
						</Text>
					</View>
					<Text bold p1 style={{ color: 'white' }}>
						{numeral(ticket.price).format('0,0')}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}
