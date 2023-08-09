const UserMaker = ({ lat, lng, map }) => {
	const { kakao } = window;
	// 마커 이미지
	const userMarkerImage = new kakao.maps.MarkerImage(
		`${process.env.PUBLIC_URL}/assets/myLocationIcon.png`,
		new kakao.maps.Size(30),
		{ offset: new kakao.maps.Point(12, 35) },
	);
	// 마커 위치
	const userMarkerPosition = new kakao.maps.LatLng(lat, lng);
	// 마커 생성
	const userMarker = new kakao.maps.Marker({
		position: userMarkerPosition,
		image: userMarkerImage,
	});
	userMarker.setMap(map);
};

export default UserMaker;
