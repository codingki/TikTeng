import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

export default function (props) {
	return (
		<Text
			{...props}
			style={[
				props.style,
				{
					fontFamily: props.bold
						? 'Ubuntu_700Bold'
						: props.medium
						? 'Ubuntu_500Medium'
						: props.light
						? 'Ubuntu_300Light'
						: 'Ubuntu_400Regular',
					fontSize: props.p1
						? 18
						: props.p2
						? 16
						: props.p3
						? 14
						: props.style.fontSize,
				},
			]}
		/>
	);
}
