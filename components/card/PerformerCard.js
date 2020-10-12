import React from 'react';
import { View, Dimensions } from 'react-native';
import Text from '../utils/StyledText';
import moment from 'moment';
export default function (props) {
	const item = props.item;
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: 'rgba(255,255,255,0.2)',
				padding: 20,
				paddingVertical: 10,
				borderRadius: 12,
				marginTop: 15,
				flexDirection: 'row',
				justifyContent: 'space-between',
			}}
		>
			<Text
				bold
				p2
				style={{
					color: 'white',
				}}
			>
				{item.performer}
			</Text>
			<Text
				medium
				p2
				style={{
					color: 'white',
				}}
			>
				{moment(item.date + ' ' + item.timeStart).format('HH:mm')} -{' '}
				{moment(item.date + ' ' + item.timeEnd).format('HH:mm')}
			</Text>
		</View>
	);
}
