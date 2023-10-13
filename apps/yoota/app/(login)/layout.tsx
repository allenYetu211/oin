/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-06-24 16:45:54
 * @LastEditTime: 2023-10-08 17:19:37
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/yoota/app/(login)/layout.tsx
 */
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Oin Login',
	description: '',
};

export default function Layout({ children }: any) {
	return <div className="h-screen w-screen overflow-auto">{children}</div>;
}
