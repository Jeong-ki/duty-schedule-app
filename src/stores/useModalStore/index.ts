import {create} from 'zustand';
import {IModalState} from './types';

const initialItem = {
  day: 0,
  month: 0,
  year: 0,
  memo: '',
  color: '',
};

export const useModalStore = create<IModalState>(set => ({
  isOpen: false,
  item: initialItem,
  onOpen: (open: boolean) => set({isOpen: open}),
  setItem: item => set({item: item}),
  resetItem: () => set({item: initialItem}),
}));
