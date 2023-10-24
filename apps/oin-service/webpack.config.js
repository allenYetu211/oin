/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-05 18:22:16
 * @LastEditTime: 2023-10-24 10:24:31
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/webpack.config.js
 */
const { composePlugins, withNx } = require('@nx/webpack')
const path = require('path')

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
	// Update the webpack config as needed here.
	// e.g. `config.plugins.push(new MyPlugin())`

	// nestjs  在 nx 中断点功能失效问题。

	config.output.devtoolModuleFilenameTemplate = function (info) {
		const rel = path.relative(process.cwd(), info.absoluteResourcePath)
		return `webpack:///./${rel}`
	}
	return config
})
