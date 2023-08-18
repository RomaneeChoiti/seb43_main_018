import axios from 'axios';
import { useSelector } from 'react-redux';
import ScopeTrashCanData from './ScopeTrashCanData';

const VoteTrashcanAPI = (voteType, { trashCan }) => {
	const memberId = useSelector((state) => state.auth.memberId);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	if (isAuthenticated) {
		const data = {
			memberId,
			trashCanId: trashCan.id,
			voteType,
		};
		axios.post(`${ScopeTrashCanData}/votes`, data);
	}
};

export default VoteTrashcanAPI;
