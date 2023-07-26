/* eslint-disable no-console */
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import TrashCanData from '../../api/MapPageAPI';
import getCurrentPosition from '../MapResources/GeolocationUtils';

function NearbyTrashCanList() {
	const [trashCans, setTrashCans] = useState([]);

	const fetchTrashCans = useCallback(async () => {
		try {
			const response = await TrashCanData();
			const { latitude, longitude } = await getCurrentPosition();
			const sortedTrashCans = response.data
				.map((trashCan) => {
					const distance =
						Math.sqrt(
							(latitude - trashCan.Latitude) ** 2 +
								(longitude - trashCan.Longitude) ** 2,
						) * 100000;
					return { ...trashCan, distance };
				})
				.sort((a, b) => {
					return a.distance - b.distance;
				});
			// 중복된 Address 제거
			const uniqueTrashCans = sortedTrashCans.filter(
				(trashCan, index, self) =>
					index === self.findIndex((t) => t.Address === trashCan.Address),
			);
			const limitedTrashCans = uniqueTrashCans.slice(0, 10);
			setTrashCans(limitedTrashCans);
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		fetchTrashCans();
	}, []);

	return (
		<ListWapper>
			<List>
				{trashCans.map((trashCan, index) => (
					<ListItem key={trashCan.id}>
						<Rank>{index + 1}</Rank>
						<Name>{trashCan.Address}</Name>
						<Distance>
							{trashCan.distance ? `${trashCan.distance.toFixed(0)}m` : '-'}
						</Distance>
					</ListItem>
				))}
			</List>
		</ListWapper>
	);
}
// 거리 (82m) 동일한 위치
const ListWapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 300px;
	background-color: #ffffff;
	.distanceText {
		border-bottom: 0.5px solid gray;
		height: 2.7em;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-right: 20px;
	}
	@media (max-width: 768px) {
		top: calc(100% - 200px);
		width: 100%;
	}
`;
const List = styled.ul`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const ListItem = styled.li`
	height: 52.5px;
	width: 265px;
	padding: 20px 0 35px 0;
	margin: 10px 0;
	font-size: var(--base);
	font-weight: 400;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 0.5px solid gray;
	@media (max-width: 768px) {
		width: 90%;
	}
`;
const Rank = styled.div`
	width: 30px;
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: skyblue;
	color: white;
	border-radius: 50%;
	flex-shrink: 0; /* 추가 */
`;
const Name = styled.div`
	margin-left: 10px;
	flex-grow: 1;
	line-height: 1.15;
	width: 200px;
	@media (max-width: 768px) {
		text-align: center;
	}
`;
const Distance = styled.div`
	margin: 0 0 0 3px;
	flex-grow: 1;
	color: skyblue;
	@media (max-width: 768px) {
		text-align: center;
	}
`;
export default NearbyTrashCanList;
