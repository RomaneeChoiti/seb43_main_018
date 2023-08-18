const handleLoadRoadView = ({ trashCan }) => {
	const roadViewUrl = `https://map.kakao.com/link/roadview/${trashCan.Latitude},${trashCan.Longitude}`;
	window.open(roadViewUrl);
};
export default handleLoadRoadView;
