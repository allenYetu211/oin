/*
 * @Author: error: git config user.name & please set dead value or install git
 * @Email:  error: git config user.email & please set dead value or install git
 * @Date: 2023-09-05 17:50:50
 * @LastEditTime: 2023-10-03 17:01:45
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-web/src/main.tsx
 */
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles.css'
import App from './app/app'

import { NextUIProvider } from '@nextui-org/react'
// import VConsole from 'vconsole';

// new VConsole();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<StrictMode>
		<NextUIProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</NextUIProvider>
	</StrictMode>,
)
