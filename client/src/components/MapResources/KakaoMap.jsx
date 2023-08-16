import { useEffect } from 'react';
import styled from 'styled-components';
import getCurrentPosition from './GeolocationUtils';
import UserMaker from '../MapMakers/UserMaker';
import TrashcanMaker from '../MapMakers/TrashcanMaker';

function KakaoMap() {
	const KAKAO_MAP_API_KEY = process.env.REACT_APP_KAKAO_MAP_API_KEY;

	useEffect(() => {
		const script = document.createElement('script');
		script.src = `https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${KAKAO_MAP_API_KEY}&autoload=false`;
		script.onload = () => {
			const { kakao } = window;
			kakao.maps.load(() => {
				const mapContainer = document.getElementById('map');
				getCurrentPosition().then((position) => {
					const [lat, lng] = [position.latitude, position.longitude];
					const options = {
						center: new kakao.maps.LatLng(lat, lng),
						level: 3,
					};
					const map = new kakao.maps.Map(mapContainer, options);

					UserMaker({ lat, lng, map });
					TrashcanMaker({ map });
				});
			});
		};
		document.head.appendChild(script);
	}, []);

	return (
		<MapStyle>
			<div id="map" className="map" />
		</MapStyle>
	);
}

const MapStyle = styled.div`
	height: 100vh;
	width: calc(100vw - 18.7em);
	align-items: center;
	justify-content: center;
	border-width: medium;
	.map {
		height: 100%;
	}
	@media (max-width: 768px) {
		width: 100vw;
		height: 65vh;
	}
`;

export default KakaoMap;
