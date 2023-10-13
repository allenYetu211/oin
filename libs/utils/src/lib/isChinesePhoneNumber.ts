export const isChinesePhoneNumber = (phoneNumber: string) => {
	const regex = /^1[3456789]\d{9}$/
	return regex.test(phoneNumber)
}
