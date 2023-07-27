/* eslint-disable no-console */
import { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import { Provider, useSelector } from 'react-redux';
import Modal from '../Modal';
import ModalTrashcan from '../Trashcan/ModalTrashcan';
import { store } from '../../store/UserSlice';
import { kakaoMapAPI } from '../../api/MapPageAPI';
import getCurrentPosition from './GeolocationUtils';

function KakaoMap() {
	// const [, setIsLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [trashCans] = useState([]);
	const [, setTrashMarkers] = useState([]);

	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const memberId = useSelector((state) => state.auth.memberId);

	// 쓰레기통 로딩 중
	// useEffect(() => {
	// 	const timer = setInterval(() => {
	// 		setIsLoading((prevLoading) => !prevLoading);
	// 	}, 450);

	// 	return () => clearInterval(timer);
	// }, []);

	const loadKakaoMap = useCallback(() => {
		// 카카오맵 스크립트 읽어오기
		const script = document.createElement('script');
		script.src = `https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${kakaoMapAPI}`;
		script.onload = () => {
			const { kakao } = window;
			kakao.maps.load(
				() => {
					const mapContainer = document.getElementById('map');
					getCurrentPosition().then((position) => {
						const [lat, lng] = [position.latitude, position.longitude];
						const options = {
							center: new kakao.maps.LatLng(lat, lng),
							level: 3,
						};

						// 지도 객체를 생성
						const map = new kakao.maps.Map(mapContainer, options);

						// 유저 마커
						const userMarkerImage = new kakao.maps.MarkerImage(
							`${process.env.PUBLIC_URL}/assets/myLocationIcon.png`,
							new kakao.maps.Size(30),
							{ offset: new kakao.maps.Point(12, 35) },
						);
						const markerPosition = new kakao.maps.LatLng(lat, lng);
						const marker = new kakao.maps.Marker({
							position: markerPosition,
							image: userMarkerImage,
						});
						marker.setMap(map);

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
				},
				(error) => {
					// 위치 정보를 가져오지 못할 경우 처리
					console.error(error);
					setIsModalOpen(true);
				},
			);
		};
		document.head.appendChild(script);
	}, [trashCans, setTrashMarkers, setIsModalOpen]);

	useEffect(() => {
		loadKakaoMap();
	}, [loadKakaoMap]);
	// GPS OFF 모달창
	const handleModalConfirm = () => {
		setIsModalOpen(false);
	};
	return (
		<>
			<MapStyle>
				<div id="map" className="map" />
			</MapStyle>

			{isModalOpen && (
				<Modal
					message="GPS 기능이 꺼져 있으면 현재 위치를 가져올 수 없습니다. 
					<br>GPS 기능을 켜고 잠시 후에 다시 시도해주세요."
					handleConfirm={handleModalConfirm}
					handleCancel={handleModalConfirm}
				/>
			)}
			{/* {trashCans.length > 0 && (
				<LoadingMessageContainer>
					<LoadingMessage>
						주변 쓰레기통 찾는 중{isLoading ? '...' : '..'}
					</LoadingMessage>
				</LoadingMessageContainer>
			)} */}
		</>
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
// 로딩 메시지
// const LoadingMessage = styled.div`
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;
// 	height: 200px;
// 	font-size: 18px;
// 	font-weight: bold;
// `;
// const LoadingMessageContainer = styled.div`
// 	position: fixed;
// 	top: 0;
// 	left: 0;
// 	width: 100%;
// 	height: 100%;
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// 	z-index: 9999;
// 	background-color: rgba(255, 255, 255, 0.9);
// `;

export default KakaoMap;
