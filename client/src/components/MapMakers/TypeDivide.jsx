import ScopeTrashCanData from '../../api/ScopeTrashCanData';

const TypeDivide = async ({ map }) => {
	const { kakao } = window;
	const trashMakers = [];
	const trashCans = [];

	const response = await ScopeTrashCanData();
	response.forEach((trashCan) => {
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

		const trashMaker = new kakao.maps.Marker({
			position: trashMarkerPosition,
			image: trashCanMarkerImage,
		});

		trashMaker.setMap(map);
		trashMakers.push(trashMaker);
		trashCans.push(trashCan);
	});

	return [trashMakers, trashCans];
};

export default TypeDivide;
