const UserMaker = ({ lat, lng, map }) => {
	const { kakao } = window;

	const userMarkerImage = new kakao.maps.MarkerImage(
		`${process.env.PUBLIC_URL}/assets/myLocationIcon.png`,
		new kakao.maps.Size(30),
		{ offset: new kakao.maps.Point(12, 35) },
	);

	const userMarkerPosition = new kakao.maps.LatLng(lat, lng);

	const userMarker = new kakao.maps.Marker({
		position: userMarkerPosition,
		image: userMarkerImage,
	});

	userMarker.setMap(map);
};

export default UserMaker;
