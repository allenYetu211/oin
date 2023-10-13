/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-05 17:50:50
 * @LastEditTime: 2023-10-02 12:38:15
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-web/src/app/app.tsx
 */
import { MapsComp } from './maps'

import { Route, Routes, Link } from 'react-router-dom'

export function App() {
	return (
		<div className="mb-20">
			<MapsComp />
		</div>
	)
}

export default App
