export function highlightLinksInPage() {
	document.querySelectorAll('a[href]').forEach((link) => {
		(link as HTMLElement).style.backgroundColor = 'blue';
	});
}
