import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { StyleSheet } from 'react-native';
import {
	Ubuntu_300Light,
	Ubuntu_300Light_Italic,
	Ubuntu_400Regular,
	Ubuntu_400Regular_Italic,
	Ubuntu_500Medium,
	Ubuntu_500Medium_Italic,
	Ubuntu_700Bold,
	Ubuntu_700Bold_Italic,
} from '@expo-google-fonts/ubuntu';
import AppNavigator from './navigation/AppNavigator';
import Colors from './constants/Colors';
import {
	ApplicationProvider,
	IconRegistry,
	Layout,
	Text,
} from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { StatusBar } from 'expo-status-bar';
import moment from 'moment';
import 'moment/locale/id';
export default function App(props) {
	const [isLoadingComplete, setLoadingComplete] = useState(false);

	if (!isLoadingComplete && !props.skipLoadingScreen) {
		return (
			<AppLoading
				startAsync={loadResourcesAsync}
				onError={handleLoadingError}
				onFinish={() => handleFinishLoading(setLoadingComplete)}
			/>
		);
	} else {
		return (
			<>
				<ApplicationProvider mapping={mapping} theme={lightTheme}>
					<IconRegistry icons={EvaIconsPack} />

					<SafeAreaView style={styles.container}>
						<StatusBar style="light" translucent backgroundColor="#121212" />
						<AppNavigator />
					</SafeAreaView>
				</ApplicationProvider>
			</>
		);
	}
}

async function loadResourcesAsync() {
	await Promise.all([
		Asset.loadAsync([
			require('./assets/icon.png'),
			require('./assets/splash.png'),
			require('./assets/background.png'),
			require('./assets/onboardingBackground.png'),
			require('./assets/background.png'),
			require('./assets/category/indie.png'),
			require('./assets/category/jazz.png'),
			require('./assets/category/pop.png'),
			require('./assets/category/dangdut.jpg'),
			require('./assets/category/edm.jpg'),
		]),
		Font.loadAsync({
			Ubuntu_300Light,
			Ubuntu_300Light_Italic,
			Ubuntu_400Regular,
			Ubuntu_400Regular_Italic,
			Ubuntu_500Medium,
			Ubuntu_500Medium_Italic,
			Ubuntu_700Bold,
			Ubuntu_700Bold_Italic,
		}),
	]);
}

function handleLoadingError(error) {
	// In this case, you might want to report the error to your error reporting
	// service, for example Sentry
	console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
	setLoadingComplete(true);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
