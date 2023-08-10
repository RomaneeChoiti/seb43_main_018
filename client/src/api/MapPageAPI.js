/* eslint-disable consistent-return */
/* eslint-disable no-console */
import axios from 'axios';
import getCurrentPosition from '../components/MapResources/GeolocationUtils';

export const trashCanInfoAPI = process.env.REACT_APP_API_URL;
export const kakaoMapAPI = process.env.REACT_APP_KAKAO_MAP_API_KEY;

const TrashCanData = async () => {
	try {
		const { latitude, longitude } = await getCurrentPosition();
		const degToRad = (degrees) => degrees * (Math.PI / 180);
		const trashCanResponse = await axios.get(`${trashCanInfoAPI}/trashCan`);

		const earthRadius = 6371000;
		const ScopeTrashcan = trashCanResponse.data.reduce(
			(filteredTrashCans, trashCan) => {
				const latDiffRad = degToRad(latitude - trashCan.Latitude);
				const lngDiffRad = degToRad(longitude - trashCan.Longitude);
				const distance =
					earthRadius * Math.sqrt(latDiffRad ** 2 + lngDiffRad ** 2);

				if (distance <= 1000) {
					filteredTrashCans.push({ ...trashCan, distance });
				}
				return filteredTrashCans;
			},
			[],
		);
		ScopeTrashcan.sort((a, b) => a.distance - b.distance);
		return ScopeTrashcan;
	} catch (error) {
		console.error(error);
	}
};

//  Vote Data

export default TrashCanData;
