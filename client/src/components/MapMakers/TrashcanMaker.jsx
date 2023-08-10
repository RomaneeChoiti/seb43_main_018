// import ReactDOM from 'react-dom/client';
// import { Provider, useSelector } from 'react-redux';
// import { store } from '../../store/UserSlice';
// import ModalTrashcan from '../Trashcan/ModalTrashcan';

const TrashcanMaker = () => {
	// const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	// const [, setTrashMarkers] = useState([]);
	// const memberId = useSelector((state) => state.auth.memberId);
	/* 
	const fetchTrashCans = useCallback(async () => {
		const response = TrashCanData();
		const trashData = response.data;
	}, []);
	*/
	// 클릭 이벤트 등록
	/*
			kakao.maps.event.addListener(trashMarker, 'click', () => {
				const root = document.getElementById('modal-root');
				ReactDOM.createRoot(root).render(
					<Provider store={store}>
						<ModalTrashcan
							trashCan={trashCan}
							isAuthenticated={isAuthenticated}
							memberId={memberId}
						/>
						,
					</Provider>,
				);
			});
			*/
	// trashMaker.setMap(map);
	// setTrashMarkers((prevState) => [...prevState, trashMarker]);
};

export default TrashcanMaker;
