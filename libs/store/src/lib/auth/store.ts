/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-10-11 10:09:28
 * @LastEditTime: 2023-10-11 10:47:01
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/libs/store/src/lib/auth/store.ts
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AuthTyps = { oin_token: string };

export interface AuthTypesConfigState {
  'oin-token': string;
}

const excludeKeys: string[] = [''];

const initialLoginState = {
  'oin-token': '',
};

const store = () => ({ ...initialLoginState } as AuthTypesConfigState);


export const useAuthStore = create<AuthTypesConfigState>()(
  persist(store, {
    name: 'auth',
    partialize: (state) =>
      Object.fromEntries(
        Object.entries(state).filter(([key]) => !excludeKeys.includes(key))
      ),
  })
);
