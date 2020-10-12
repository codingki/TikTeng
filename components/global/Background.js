import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
export default function (props) {
	return (
		<View style={styles.container}>
			<StatusBar style="light" translucent backgroundColor="#16191F" />
			<ImageBackground
				source={props.image}
				style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}
			>
				{props.children}
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
});
