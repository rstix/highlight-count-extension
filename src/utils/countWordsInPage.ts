export const countWordsInPage = () => {
	const bodyText = document.body.innerText || '';
	const wordsArray = bodyText.trim().split(/\s+/);

	return wordsArray.filter((word) => word.length > 0).length;
};
