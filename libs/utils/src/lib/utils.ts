export const convertToTimeFormat = (number: number) => {
	if (typeof number !== 'number' || number < 0) {
		return '无效输入';
	}

	const minutes = Math.floor(number / 60);
	const seconds = number % 60;

	const formattedMinutes = String(minutes).padStart(2, '0');
	const formattedSeconds = String(seconds).padStart(2, '0');

	return `${formattedMinutes}:${formattedSeconds}`;
};
