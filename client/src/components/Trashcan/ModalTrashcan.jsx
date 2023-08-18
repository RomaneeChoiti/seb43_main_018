import { useState } from 'react';
import styled from 'styled-components';
import VoteTrashcanAPI from '../../api/VoteTrashcanAPI';
import { Button } from '../../styles/Buttons';
import handleLoadDirections from './DirectionTrashcan';
import handleLoadRoadView from './RoadView';

function ModalTrashcan({ trashCan }) {
	const [TrashCanModalOpen, setTrashCanModalOpen] = useState(true);

	const handleCloseTrashCanModal = () => {
		setTrashCanModalOpen(false);
	};

	const handleVoteCount = (voteType) => {
		VoteTrashcanAPI(voteType, { trashCan });
	};

	return (
		TrashCanModalOpen && (
			<ModalContainer onClick={handleCloseTrashCanModal}>
				<Modal>
					<ModalHeader>
						<ModalTitle>{trashCan.Address}</ModalTitle>
					</ModalHeader>
					<BtnContent>
						<TrashModalButton onClick={() => handleLoadRoadView({ trashCan })}>
							로드뷰
						</TrashModalButton>
						<TrashModalButton
							onClick={() => handleLoadDirections({ trashCan })}
						>
							길찾기
						</TrashModalButton>
						<LikeDislikeContainer>
							<LikeButton type="button" onClick={() => handleVoteCount('LIKE')}>
								좋아요 : {trashCan.likeCount}
							</LikeButton>
							<DislikeButton
								type="button"
								onClick={() => handleVoteCount('DISLIKE')}
							>
								싫어요 : {trashCan.dislikeCount}
							</DislikeButton>
						</LikeDislikeContainer>
					</BtnContent>
				</Modal>
			</ModalContainer>
		)
	);
}
const ModalContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 999;
`;

const Modal = styled.div`
	width: 450px;
	background-color: white;
	padding: 50px;
	border-radius: 10px;
	box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
	@media (max-width: 768px) {
		width: 250px;
		padding: 25px;
	}
`;

const ModalHeader = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	margin-bottom: 20px;
	font-size: 20px;
	@media (max-width: 768px) {
		width: 180px;
		font-size: 12px;
	}
`;

const ModalTitle = styled.h3`
	margin: 0;
	margin-left: 10%;
	margin-right: auto;
	text-align: center;
`;

const BtnContent = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
const LikeDislikeContainer = styled.div`
	display: flex;
`;

const TrashModalButton = styled(Button)`
	width: 85%;
	margin-bottom: 5px;
	height: 50px;
	@media (max-width: 768px) {
		width: 100px;
	}
`;
const LikeButton = styled(TrashModalButton)`
	width: 142px;
	@media (max-width: 768px) {
		width: 50px;
	}
`;

const DislikeButton = styled(TrashModalButton)`
	width: 142px;
	margin-left: 10px;
	@media (max-width: 768px) {
		width: 50px;
		margin-left: 2px;
	}
`;

export default ModalTrashcan;
