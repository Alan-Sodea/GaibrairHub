import { hookstate } from '@hookstate/core';
import type { User } from '../types';
import { MOCK_USERS } from '../data/mockData';

interface AppState {
  currentUser: User | null;
  darkMode: boolean;
  users: User[];
  newmail: String | undefined;
}

const initialState: AppState = {
  currentUser: null,
  darkMode: false,
  users: MOCK_USERS,
  newmail: undefined,
};

export const globalState = hookstate<AppState>(initialState);