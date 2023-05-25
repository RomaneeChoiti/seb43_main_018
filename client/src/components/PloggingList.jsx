import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { URL_PLOGGING } from '../routesURL';
import useDate from '../hooks/useDate';
import Modal from './Modal';

function PloggingList({ data }) {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const [ismodalOpen, setIsModalOpen] = useState(false);
	const handleConfirm = () => {
		setIsModalOpen(false);
	};
	return (
		<Table>
			<thead>
				<tr>
					<th>제목</th>
					<th className="none">작성자</th>
					<th className="none">작성일</th>
					<th className="none">좋아요</th>
				</tr>
			</thead>
			{data && (
				<tbody>
					{data.map((el) => (
						<tr key={el.p_id}>
							<th title={el.p_title} className="title">
								<div className="titleWraper">
									<img
										src={`https://api.dicebear.com/6.x/thumbs/svg?seed=${el.username}&scale=90&size=60&shapeColor=0a5b83,1c799f,69d2e7,f1f4dc&backgroundColor=0a5b83,69d2e7,f1f4dc`}
										alt="Profile"
									/>
									{isAuthenticated && (
										<Link to={`${URL_PLOGGING}/${el.p_id}`}>{el.p_title}</Link>
									)}
									{isAuthenticated || (
										<button
											type="button"
											className="memberModalOpen titleWraper"
											onClick={() => setIsModalOpen(true)}
										>
											{el.p_title}
										</button>
									)}
								</div>
							</th>
							<th className="none">{el.username}</th>
							<th className="none">
								<time>{useDate(el.createdAt)[0]}</time>
							</th>
							<th className="none">
								{el.checkLike ? (
									<p>
										<span>💙</span>
										{el.likes}
									</p>
								) : (
									<p>
										<span>🤍</span>
										{el.likes}
									</p>
								)}
							</th>
							<div className="bottom">
								<th>{el.username}</th>
								<th>
									<time>{useDate(el.createdAt)[0].slice(-8)}</time>
								</th>
								<th>
									{el.checkLike ? (
										<p>
											<span>💙</span>
											{el.likes}
										</p>
									) : (
										<p>
											<span>🤍</span>
											{el.likes}
										</p>
									)}
								</th>
							</div>
						</tr>
					))}
				</tbody>
			)}
			{(!data || data.length === 0) && (
				<p className="empty">게시물이 없습니다.</p>
			)}
			{ismodalOpen && (
				<Modal
					message="회원만 읽을 수 있습니다."
					cancel={false}
					handleConfirm={handleConfirm}
				/>
			)}
		</Table>
	);
}

const Table = styled.table`
	width: 100%;
	font-size: var(--large);
	table-layout: fixed;
	min-height: 371px;
	// 테이블 항목
	thead > tr {
		font-size: 19px;
		font-weight: 800;
		color: var(--main-color);
		line-height: 35px;
		background-color: #80808021;
		border: 0px !important;
		margin: 0px 0px 20px 0px;
	}

	// 기본뷰 테이블 열 비율
	tr {
		display: flex;
		padding: 15px 10px;
		align-items: center;
		border: 1px solid black;
		margin: 0px 20px 20px 20px;
	}

	tr th:nth-child(1) {
		flex: 7;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	tr th:nth-child(2) {
		flex: 3;
	}
	tr th:nth-child(3) {
		flex: 2;
	}
	tr th:nth-child(4) {
		flex: 2;
	}

	//하트랑 댓글 색상
	span {
		font-weight: 800;
		font-size: 20px;
	}

	p:last-child {
		font-size: var(--large) !important;
	}

	.memberModalOpen {
		border: 0;
		outline: 0;
		background-color: transparent;
	}
	// 게시글 없는 경우
	.empty {
		text-align: center;
		color: #b3b3b3;
		padding: 154px 0px;
	}

	// 반응형
	.bottom {
		display: none;
	}

	.titleWraper {
		display: flex;
		font-size: var(--sub-title);
		align-items: center;
		> * {
			margin: 10px 0px 10px 40px;
		}
	}
	.titleWraper:hover {
		color: var(--main-color);
	}

	img {
		border-radius: 50%;
	}
	@media (max-width: 768px) {
		.none {
			display: none;
		}
		tr {
			flex-direction: column;
		}
		.title {
			text-align: left;
		}
		.bottom {
			color: #b3b3b3;
			margin-top: 10px;
			display: flex;
			justify-content: right;
			align-items: center;
			margin-left: auto;
			margin-right: 20px;
		}
		.bottom th {
			flex: 0 1 auto !important;
			margin-left: 15px;
		}
		.titleWraper {
			> * {
				margin: 10px 0px 10px 20px;
			}
		}
	}
`;

export default PloggingList;
