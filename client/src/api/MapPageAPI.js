/* eslint-disable consistent-return */
/* eslint-disable no-console */
import axios from 'axios';

export const trashCanInfoAPI = process.env.REACT_APP_API_URL;
export const kakaoMapAPI = process.env.REACT_APP_KAKAO_MAP_API_KEY;

const TrashCanData = async () => {
	try {
		const response = await axios.get(`${trashCanInfoAPI}/trashCan`);
		return response;
	} catch (error) {
		console.error(error);
	}
};

//  Vote Data

export default TrashCanData;
