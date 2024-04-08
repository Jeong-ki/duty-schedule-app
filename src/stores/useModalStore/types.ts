import {ITargetDay} from '@/utils/calendar/types';

interface IItem extends ITargetDay {
  memo: string;
  color: string;
}

export interface IModalState {
  isOpen: boolean;
  item: IItem;
  onOpen: (open: boolean) => void;
  setItem: (item: IItem) => void;
  resetItem: () => void;
}
