import ClickTrashcan from './ClickTrashcan';
import TypeDivide from './TypeDivide';

const TrashcanMaker = async ({ map }) => {
	const [trashMakers, trashCans] = await TypeDivide({ map });
	ClickTrashcan([trashMakers, trashCans]);
};

export default TrashcanMaker;
