import axios from 'axios';

export const trashCanInfoAPI = process.env.REACT_APP_API_URL;
let cachedTrashcanData;
const TrashcanData = async () => {
	if (!cachedTrashcanData) {
		const trashcanDatas = await axios.get(`${trashCanInfoAPI}/trashCan`);
		cachedTrashcanData = trashcanDatas;
	}
	return cachedTrashcanData.data;
};
export default TrashcanData;
