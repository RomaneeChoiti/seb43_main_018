import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import { Provider, useSelector } from 'react-redux';
import ModalTrashcan from '../Trashcan/ModalTrashcan';
import { store } from '../../store/UserSlice';
import getCurrentPosition from './GeolocationUtils';
import UserMaker from '../MapMakers/UserMaker';

function KakaoMap() {
	const [trashCans] = useState([]);
	const [, setTrashMarkers] = useState([]);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const memberId = useSelector((state) => state.auth.memberId);

	useEffect(() => {
		getCurrentPosition().then((position) => {
			const [lat, lng] = [position.latitude, position.longitude];
			const { kakao } = window;
			const mapContainer = document.getElementById('map');
			const options = {
				center: new kakao.maps.LatLng(lat, lng),
				level: 3,
			};
			// 맵 생성
			const map = new kakao.maps.Map(mapContainer, options);
			// 왜 됐는지 원인 찾기.
			UserMaker({ lat, lng, map });

			// 쓰레기통 마커
			trashCans.forEach((trashCan) => {
				if (!trashCan) return; // 쓰레기통이 없는 경우 건너뜀
				// 500m 반경 내의 쓰레기통만 표시
				const trashMarkerPosition = new kakao.maps.LatLng(
					trashCan.Latitude,
					trashCan.Longitude,
				);
				const trashCanMarkerImage =
					trashCan.canType === '재활용'
						? new kakao.maps.MarkerImage(
								`${process.env.PUBLIC_URL}/assets/RecycleIcon.png`,
								new kakao.maps.Size(30),
								{ offset: new kakao.maps.Point(12, 35) },
						  )
						: new kakao.maps.MarkerImage(
								`${process.env.PUBLIC_URL}/assets/TrashCanIcon.png`,
								new kakao.maps.Size(30),
								{ offset: new kakao.maps.Point(12, 35) },
						  );
				const trashMarker = new kakao.maps.Marker({
					position: trashMarkerPosition,
					image: trashCanMarkerImage,
				});

				// 클릭 이벤트 등록
				kakao.maps.event.addListener(trashMarker, 'click', () => {
					const root = document.getElementById('modal-root');
					ReactDOM.createRoot(root).render(
						<Provider store={store}>
							<ModalTrashcan
								trashCan={trashCan}
								isAuthenticated={isAuthenticated}
								memberId={memberId}
							/>
							,
						</Provider>,
					);
				});
				trashMarker.setMap(map);
				setTrashMarkers((prevState) => [...prevState, trashMarker]);
			});
		});
	});

	return (
		<MapStyle>
			<div id="map" className="map" />
		</MapStyle>
	);
}

// 맵사이즈
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
