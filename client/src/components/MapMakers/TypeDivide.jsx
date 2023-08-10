/* const { useCallback } = require("react");

const TypeDivide = useCallback(() => {
	const [trashCans, setTrashCans] = useState([]);
	trashCans.forEach((trashCan) => {
		if (!trashCan) return;
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

		// 마커 생성
		const trashMaker = new kakao.maps.Marker({
			position: trashMarkerPosition,
			image: trashCanMarkerImage,
		});
	});
}, [trashCans, setTrashCans]);
*/
