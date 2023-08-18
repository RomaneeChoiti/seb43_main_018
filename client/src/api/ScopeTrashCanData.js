/* eslint-disable consistent-return */
/* eslint-disable no-console */
import axios from 'axios';
import getCurrentPosition from '../components/MapResources/GeolocationUtils';

const trashCanInfoAPI = process.env.REACT_APP_API_URL;

const ScopeTrashCanData = async () => {
	const trashcanData = await axios.get(`${trashCanInfoAPI}/trashCan`);
	const { latitude, longitude } = await getCurrentPosition();
	const degToRad = (degrees) => degrees * (Math.PI / 180);

	const earthRadius = 6371000;
	const ScopeTrashcan = trashcanData.data.reduce(
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
};

export default ScopeTrashCanData;
