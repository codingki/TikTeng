import React, { useState, useEffect } from 'react';
import {
	View,
	ScrollView,
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native';
import Text from '../../components/utils/StyledText';
import TopNav from '../../components/navigation/SearchTopNav';
import Background from '../../components/global/Background';
import CategoryCard from '../../components/card/CategoryCard';
import ExploreCard from '../../components/card/ExploreCard';
import * as firebase from 'firebase';
import moment from 'moment';
var _ = require('lodash');
export default function App({ navigation }) {
	const [data, setData] = useState(null);
	const [count, setCount] = useState(10);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		getData(count);
	}, []);

	function getData(count) {
		const ref = firebase
			.database()
			.ref('shows')
			.orderByChild('date')
			.startAt(moment().format('YYYY-MM-DD'))
			.limitToFirst(count);
		ref.once('value', function (snapshot) {
			const data = snapshot.val();
			if (data !== null) {
				setData(_.sortBy(Object.values(data), ['date']));
				setLoading(false);
			} else {
				setData(null);
				setLoading(false);
			}
		});
	}
	return (
		<Background image={require('../../assets/background.jpg')}>
			<ScrollView>
				<TopNav title="TikTeng" navigation={navigation} />

				<View style={{ paddingHorizontal: 20, marginTop: 20 }}>
					<Text medium p2 style={{ color: 'white' }}>
						Oi, mau liat konser online apa nih?
					</Text>
				</View>

				<ScrollView
					horizontal
					style={{
						flex: 1,
						flexDirection: 'row',
						marginHorizontal: 20,
						marginTop: 20,
					}}
				>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate('Category', {
								category: 'Pop',
								name: 'pop',
							});
						}}
					>
						<CategoryCard
							image={require('../../assets/category/pop.png')}
							title="Pop"
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate('Category', {
								category: 'Jazz',
								name: 'jazz',
							});
						}}
					>
						<CategoryCard
							image={require('../../assets/category/jazz.png')}
							title="Jazz"
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate('Category', {
								category: 'Indie',
								name: 'indie',
							});
						}}
					>
						<CategoryCard
							image={require('../../assets/category/indie.png')}
							title="Indie"
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate('Category', {
								category: 'Electronic Dance Music',
								name: 'electronicMusic',
							});
						}}
					>
						<CategoryCard
							image={require('../../assets/category/edm.jpg')}
							title="EDM"
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate('Category', {
								category: 'Dangdut',
								name: 'dangdut',
							});
						}}
					>
						<CategoryCard
							image={require('../../assets/category/dangdut.jpg')}
							title="Dangdut"
						/>
					</TouchableOpacity>
				</ScrollView>

				<View
					style={{
						paddingHorizontal: 20,
						marginTop: 20,
						paddingVertical: 20,
						backgroundColor: 'rgba(0,0,0,0.2)',
					}}
				>
					<Text medium p2 style={{ color: 'white' }}>
						Konser online yang akan tayang
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
						data.map((item) => (
							<ExploreCard key={item.uid} item={item} navigation={navigation} />
						))
					)}
					{data && (
						<TouchableOpacity
							onPress={() => {
								setLoading(true);
								setCount(count + 5);
								getData(count + 5);
							}}
							style={{
								flex: 1,
								backgroundColor: 'rgba(255,255,255,0.2)',
								padding: 20,
								paddingVertical: 10,
								borderRadius: 12,
								marginTop: 15,
								flexDirection: 'row',
								justifyContent: 'center',
							}}
							disabled={loading}
						>
							{loading ? (
								<ActivityIndicator color="#fff" />
							) : (
								<Text
									bold
									p2
									style={{
										color: 'white',
									}}
								>
									More show
								</Text>
							)}
						</TouchableOpacity>
					)}
				</View>
			</ScrollView>
		</Background>
	);
}
