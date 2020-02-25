import ConfirmModal from './ConfirmModal';
import { createConfirmation } from 'react-confirm';

const confirm = createConfirmation(ConfirmModal)

export default (confirmation, options = {}) => confirm({ confirmation, options })
