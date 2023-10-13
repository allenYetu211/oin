/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-26 00:09:34
 * @LastEditTime: 2023-10-03 18:24:25
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/libs/maps/src/lib/gaode/index.ts
 */
import AMapLoader from '@amap/amap-jsapi-loader'

declare global {
	interface Window {
		_AMapSecurityConfig: any
	}
}

type WalkType = {
	time: number
	timer: number
}

window._AMapSecurityConfig = {
	securityJsCode: '54ef9c2dbeb72147559c8a597c742e1a',
}

const db = [
	[116.368904, 39.913423],
	[116.382122, 39.901176],
	[116.387271, 39.912501],
	[116.398258, 39.9046],
]
export class AMap {
	public M: any = null
	private AMap: any = null
	private _geolocationFunc: any
	private _currentLocaltion: number[] = []
	private _locationRecord: number[][] = []
	// public locationRecord: number[][] = db;
	private _pollIntervalId: NodeJS.Timer | undefined

	constructor(elemetn: HTMLElement) {
		this.init(elemetn)
	}

	private async init(elemetn: HTMLElement) {
		try {
			this.AMap = await AMapLoader.load({
				key: '205ec95b5747c97d95c4aaeb56cbbfc0', // 申请好的Web端开发者Key，首次调用 load 时必填
				version: '2.0', // 指定要加载的 JS API 的版本，缺省时默认为 1.4.15
				plugins: [''], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
			})
			this.M = await this._createMap(elemetn)
			this._geolocation()
		} catch (e) {
			console.log(e)
		}
	}

	public getMap() {
		return this.M
	}

	/**
	 * 本地坐标转换高德坐标地址
	 * @param lnglat
	 */
	public async localToMapLngLat(lnglat: number[]) {
		const response = await fetch(
			`https://restapi.amap.com/v3/assistant/coordinate/convert?locations=${lnglat.join(
				',',
			)}&coordsys=gps&key=a6cc963caea1f74232a7ba20ecf7022a`,
		)

		if (response.ok) {
			return response.json()
		}

		return Promise.reject('response error')
	}

	/**
	 * 外部接口定位当前位置中心点
	 * 1. 页面初始调用
	 * 2. 移动位置，定时轮训调用
	 * @param elemetn
	 * @returns
	 */
	public async setMapCenter(lnglat: number[]) {
		const result = await this.localToMapLngLat(lnglat)
		this.M.setCenter(result.locations)
		this.M.setZoom(17)
	}

	private async _createMap(elemetn: HTMLElement) {
		return new Promise((resolve, reject) => {
			try {
				const map = new this.AMap.Map(elemetn, {
					resizeEnable: true,
					zoom: 17,
					// zooms: [17, 17],
					// showIndoorMap: false, // 是否在有矢量底图的时候自动展示室内地图，PC默认true,移动端默认false
					// dragEnable: true, // 地图是否可通过鼠标拖拽平移，默认为true
					// keyboardEnable: false, //地图是否可通过键盘控制，默认为true
					// doubleClickZoom: false, // 地图是否可通过双击鼠标放大地图，默认为true
					// zoomEnable: false, //地图是否可缩放，默认值为true
					// rotateEnable: false, // 地图是否可旋转，3D视图默认为true，2D视图默认false
				})
				resolve(map)
			} catch (e) {
				reject()
			}
		})
	}

	// private _citySearch() {
	//   this.M.plugin('AMap.CitySearch', () => {
	//     var citySearch = new this.AMap.CitySearch();
	//     citySearch.getLocalCity(function (status: any, result: any) {
	//       if (status === 'complete' && result.info === 'OK') {
	//         // 查询成功，result即为当前所在城市信息
	//         console.log('result', result);
	//       }
	//     });
	//   });
	// }

	private _geolocation() {
		this.AMap.plugin('AMap.Geolocation', () => {
			const geolocation = new this.AMap.Geolocation({
				showCircle: false, //定位成功后用圆圈表示定位精度范围，默认：true
				enableHighAccuracy: true, //是否使用高精度定位，默认:true
				timeout: 10000, //超过10秒后停止定位，默认：5s
				showButton: true, //显示定位按钮，默认：true
				buttonPosition: 'RT', //定位按钮的停靠位置
				buttonOffset: new this.AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
				convert: true,
				/**
         *
         *  是否禁止使用浏览器Geolocation定位，默认值为0，可选值0-3
            0: 可以使用浏览器定位
            1: 手机设备禁止使用浏览器定位
            2: PC上禁止使用浏览器定位
            3: 所有终端禁止使用浏览器定位
         */
				noIpLocate: 0,
				GeoLocationFirst: true, // 默认为false，设置为true的时候可以调整PC端为优先使用浏览器定位，失败后使用IP定位
				zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
			})

			this.M.addControl(geolocation)

			const func = (callback?: (result: any) => void) => {
				geolocation.getCurrentPosition((status: any, result: any) => {
					if (status == 'complete') {
						/**
						 * 在此回调函数当中需要拿到对应的坐标，然后添加到路径当中。
						 */
						callback && callback(result)
					} else {
						onError(result)
					}
				})
			}
			/** 存储触控方法 */
			this._geolocationFunc = func
			func()

			function onError(data: any) {
				console.log(`定位失败: ${data.message}`)
			}
		})
	}

	/**
	 * 轮训触发，获取当前的定位信息
	 */
	private _pollWatchLocationPosition() {
		this.M.setZoom(17)
		this._pollIntervalId = setInterval(() => {
			this._geolocationFunc &&
				this._geolocationFunc((result: any) => {
					/** 记录轨迹 */
					const lnglat = [result.position.lng, result.position.lat]
					this._currentLocaltion = lnglat
					this._drawWalkLine(lnglat)
				})
		}, 5000)
	}

	/**
	 * 修改内容
	 */
	private _createDrawPolyline(line: number[][]) {
		const g_lnglat = this._tGaodeLnglat(line)
		const polylines = new this.AMap.Polyline({
			path: g_lnglat,
			borderWeight: 2, // 线条宽度，默认为 1
			strokeColor: 'red', // 线条颜色
			lineJoin: 'round', // 折线拐点连接处样式
		})
		return polylines
	}

	/**
	 * 实时运动轨迹记录
	 */
	private _drawWalkLine(lnglat: number[]) {
		// 先删除已经绘制的线条， 在添加一条新的线条
		if (this._locationRecord.length) {
			this._locationRecord.push(lnglat)
		} else {
			this.M.remove(this._locationRecord)
			this._locationRecord.unshift(lnglat)
		}

		this.M.setCenter(lnglat)

		const polyline = this._createDrawPolyline(this._locationRecord)

		this.M.add(polyline)
	}

	/**
	 * 开始运动
	 */
	public startMoveRecord() {
		// 开始监听定位
		this._pollWatchLocationPosition()
		// 本地模拟测试
		// this.TestRecording()
	}

	/**
	 * 停止运动
	 */
	public endMoveRecord(walk: WalkType) {
		if (this._pollIntervalId) {
			clearInterval(this._pollIntervalId)
			this._seveLocalWalkHistory(walk)
		}
	}

	/**
	 * 历史线路查看
	 */
	public historyDrawMapLine(line: number[][]) {
		const polyline = this._createDrawPolyline(line)
		this.M.add(polyline)
		this.M.setCenter(line[0])
		this.M.setFitView()
	}

	/**
	 * 转换成高德坐标
	 */
	private _tGaodeLnglat(line: number[][]) {
		return line.map((item) => new this.AMap.LngLat(item[0], item[1]))
	}

	/**
	 * Test recording
	 */
	public TestRecording() {
		this._pollIntervalId = setInterval(() => {
			// 截取 db 第一位，添加至 locationRecord
			const firstLnglat = db.shift()
			if (!firstLnglat) {
				this._pollIntervalId && clearInterval(this._pollIntervalId)
				return
			}
			this._drawWalkLine(firstLnglat as number[])
		}, 2000)
	}

	/**
	 * 存储 localStorage
	 */
	private _seveLocalWalkHistory(walk: WalkType) {
		const storeWalkHistory = this.getLocalWalkHistory()
		let walkHistory = []
		if (storeWalkHistory) {
			if (Array.isArray(storeWalkHistory)) {
				walkHistory = storeWalkHistory
			} else {
				walkHistory = []
			}
		}
		walkHistory.push({
			...walk,
			walkRecord: this._locationRecord,
		})
		localStorage.setItem('walkHistory', JSON.stringify(walkHistory))
		this._locationRecord = []
	}

	/**
	 * 获取本地 localwalkhistory
	 */
	public getLocalWalkHistory() {
		const walkHistory = localStorage.getItem('walkHistory')
		return JSON.parse(walkHistory || '[]')
	}
}
