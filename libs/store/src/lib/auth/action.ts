/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-10-11 10:09:32
 * @LastEditTime: 2023-10-11 11:03:41
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/libs/store/src/lib/auth/action.ts
 */
import { useAuthStore, AuthTypesConfigState } from './store';

const setSetting = useAuthStore.setState;

/**
 * ------------------------------------------------------------------------------------------
 * 设置 Auth 信息
 * ------------------------------------------------------------------------------------------
 */
export const setAuthOinState = (newState: Partial<AuthTypesConfigState>) => {
	setSetting(() => ({ ...newState }));
};

/**
 * ------------------------------------------------------------------------------------------
 * 获取 整体 oin 内容信息
 * ------------------------------------------------------------------------------------------
 */
export const getAuthOinState = (state: keyof AuthTypesConfigState) => {
	return useAuthStore.getState()[state];
};
