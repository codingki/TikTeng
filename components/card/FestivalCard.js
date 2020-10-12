import * as React from 'react';
import {
	StatusBar,
	Image,
	FlatList,
	Dimensions,
	Animated,
	View,
	StyleSheet,
	SafeAreaView,
} from 'react-native';
const { width } = Dimensions.get('screen');
import {
	FlingGestureHandler,
	Directions,
	State,
	TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Text from '../../components/utils/StyledText';
import Colors from '../../constants/Colors';
// https://www.creative-flyers.com
import moment from 'moment';

const OVERFLOW_HEIGHT = 95;
const SPACING = 10;
const ITEM_WIDTH = width - 100;
const ITEM_HEIGHT = ITEM_WIDTH * 1.5;
const VISIBLE_ITEMS = 3;

const OverflowItems = ({ data, scrollXAnimated }) => {
	const inputRange = [-1, 0, 1];
	const translateY = scrollXAnimated.interpolate({
		inputRange,
		outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
	});
	return (
		<View
			style={{
				height: OVERFLOW_HEIGHT,
				overflow: 'hidden',
				marginTop: 15,
				marginHorizontal: 20,

				backgroundColor: 'rgba(255,255,255,0.1)',
				borderRadius: 8,
			}}
		>
			<Animated.View style={{ transform: [{ translateY }] }}>
				{data.map((item, index) => {
					return (
						<View
							style={{
								height: OVERFLOW_HEIGHT,
								paddingHorizontal: 15,
								paddingVertical: 25,
							}}
							key={index}
						>
							{item.bundling && (
								<Text
									style={{
										backgroundColor: 'transparent',
										fontSize: 10,
										color: 'white',
										position: 'absolute',
										top: 0,
										right: 0,
										paddingHorizontal: 10,
										paddingVertical: 3,
										backgroundColor: 'rgba(0,248,248,0.7)',
										borderTopLeftRadius: 0,
										borderBottomRightRadius: 0,
										borderBottomLeftRadius: 12,
										borderTopRightRadius: 12,
									}}
									medium
								>
									Gratis kuota streaming
								</Text>
							)}

							<Text bold p1 style={{ color: 'white' }} numberOfLines={1}>
								{item.title}
							</Text>

							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									marginTop: 2,
								}}
							>
								<Text medium style={{ fontSize: 14, color: 'white' }}>
									{moment(item.date).format('D MMMM YYYY')}
								</Text>

								{item.ketengan && (
									<View
										style={{
											paddingVertical: 2,
											paddingHorizontal: 6,
											borderRadius: 4,
											backgroundColor: Colors.primary,
											justifyContent: 'center',
											alignItems: 'center',
											marginLeft: 5,
										}}
									>
										<Text medium style={{ fontSize: 10, color: '#fff' }}>
											Bisa Ketengan
										</Text>
									</View>
								)}
							</View>
						</View>
					);
				})}
			</Animated.View>
		</View>
	);
};

export default function App(props) {
	const [data, setData] = React.useState(props.data);
	const scrollXIndex = React.useRef(new Animated.Value(0)).current;
	const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
	const [index, setIndex] = React.useState(0);
	const setActiveIndex = React.useCallback((activeIndex) => {
		scrollXIndex.setValue(activeIndex);
		setIndex(activeIndex);
	});

	React.useEffect(() => {
		if (index === data.length - VISIBLE_ITEMS - 1) {
			// get new data
			// fetch more data
			const newData = [...data, ...data];
			setData(newData);
		}
	});

	React.useEffect(() => {
		Animated.spring(scrollXAnimated, {
			toValue: scrollXIndex,
			duration: 100,
			useNativeDriver: true,
		}).start();
	});

	return (
		<>
			<FlingGestureHandler
				key="left"
				direction={Directions.LEFT}
				onHandlerStateChange={(ev) => {
					if (ev.nativeEvent.state === State.END) {
						if (index === data.length - 1) {
							return;
						}
						setActiveIndex(index + 1);
					}
				}}
			>
				<FlingGestureHandler
					key="right"
					direction={Directions.RIGHT}
					onHandlerStateChange={(ev) => {
						if (ev.nativeEvent.state === State.END) {
							if (index === 0) {
								return;
							}
							setActiveIndex(index - 1);
						}
					}}
				>
					<SafeAreaView style={styles.container}>
						<OverflowItems data={data} scrollXAnimated={scrollXAnimated} />

						<FlatList
							data={data}
							keyExtractor={(_, index) => String(index)}
							horizontal
							inverted
							contentContainerStyle={{
								flex: 1,
								justifyContent: 'center',
								padding: 20,
							}}
							scrollEnabled={false}
							removeClippedSubviews={false}
							CellRendererComponent={({
								item,
								index,
								children,
								style,
								...props
							}) => {
								const newStyle = [style, { zIndex: data.length - index }];
								return (
									<View style={newStyle} index={index} {...props}>
										{children}
									</View>
								);
							}}
							renderItem={({ item, index }) => {
								const inputRange = [index - 1, index, index + 1];
								const translateX = scrollXAnimated.interpolate({
									inputRange,
									outputRange: [50, 0, -100],
								});
								const scale = scrollXAnimated.interpolate({
									inputRange,
									outputRange: [0.8, 1, 1.3],
								});
								const opacity = scrollXAnimated.interpolate({
									inputRange,
									outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
								});

								return (
									<Animated.View
										style={{
											position: 'absolute',
											left: -ITEM_WIDTH / 2,
											opacity,
											transform: [
												{
													translateX,
												},
												{ scale },
											],
										}}
									>
										<TouchableWithoutFeedback
											onPress={() => {
												props.navigation.navigate('Detail', {
													item: item,
												});
											}}
										>
											<Image
												source={{ uri: item.poster }}
												style={{
													width: ITEM_WIDTH,
													height: ITEM_HEIGHT,
													borderRadius: 12,
												}}
											/>
										</TouchableWithoutFeedback>
									</Animated.View>
								);
							}}
						/>
					</SafeAreaView>
				</FlingGestureHandler>
			</FlingGestureHandler>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	title: {
		fontSize: 28,
		fontWeight: '900',
		textTransform: 'uppercase',
		letterSpacing: -1,
	},
	location: {
		fontSize: 16,
	},
	date: {
		fontSize: 12,
	},
	itemContainer: {
		height: OVERFLOW_HEIGHT,
		padding: SPACING * 2,
	},
	itemContainerRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	overflowContainer: {
		height: OVERFLOW_HEIGHT,
		overflow: 'hidden',
	},
});
