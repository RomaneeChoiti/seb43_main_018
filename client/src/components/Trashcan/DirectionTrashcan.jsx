const handleLoadDirections = ({ trashCan }) => {
	const startLat = 37.497942;
	const startLng = 127.027621;
	const destinationLat = trashCan.Latitude;
	const destinationLng = trashCan.Longitude;
	window.open(
		`https://map.kakao.com/link/to/,${trashCan.설치위치},${destinationLat},${destinationLng},${startLat},${startLng}`,
		'_blank',
	);
};
export default handleLoadDirections;
