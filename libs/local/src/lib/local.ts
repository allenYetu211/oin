/*
 * @Author: error: git config user.name & please set dead value or install git
 * @Email:  error: git config user.email & please set dead value or install git
 * @Date: 2023-10-01 11:28:32
 * @LastEditTime: 2023-10-01 11:44:46
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @FilePath: /oin/libs/local/src/lib/local.ts
 */
export const ObtainLocal = (callback?: (ll: [number, number]) => void) => {
	return new Promise((resolve, reject) => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				function (position) {
					// 处理位置信息
					const latitude = position.coords.latitude
					const longitude = position.coords.longitude
					// callback && callback([longitude, latitude]);

					resolve([longitude, latitude])
				},
				function (error) {
					// 处理错误情况
					switch (error.code) {
						case error.PERMISSION_DENIED:
							// console.log('用户拒绝了位置请求');
							reject('用户拒绝了位置请求')
							break
						case error.POSITION_UNAVAILABLE:
							// console.log('无法获取位置信息');
							reject('无法获取位置信息')
							break
						case error.TIMEOUT:
							// console.log('获取位置信息超时');
							reject('获取位置信息超时')
							break
						default:
							// console.log('发生未知错误');
							reject('发生未知错误')
							break
					}
				},
			)
		} else {
			reject('浏览器不支持Geolocation')
			// console.log('浏览器不支持Geolocation API');
		}
	})
}
