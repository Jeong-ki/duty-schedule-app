import {create} from 'zustand';
import type {IUserState} from './types';

export const useUserStore = create<IUserState>(set => ({
  user: null,
  setUser: user => set({user}),
  logout: () => set({user: null}),
}));
