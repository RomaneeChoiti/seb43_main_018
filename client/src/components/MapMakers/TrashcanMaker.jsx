import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../../store/UserSlice';
import ModalTrashcan from '../Trashcan/ModalTrashcan';
import TypeDivide from './TypeDivide';

const TrashcanMaker = ({ map }) => {
	const { kakao } = window;
	const [trashMakers, trashCans] = TypeDivide({ map });

	trashMakers.forEach((trashMarker, index) => {
		kakao.maps.event.addListener(trashMarker, 'click', () => {
			const root = document.getElementById('modal-root');
			ReactDOM.createRoot(root).render(
				<Provider store={store}>
					<ModalTrashcan trashCan={trashCans[index]} />
				</Provider>,
			);
		});
	});
};

export default TrashcanMaker;
