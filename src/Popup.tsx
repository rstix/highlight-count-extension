import { highlightLinksInPage } from './utils/highlightLinksInPage';

const Popup = () => {
	const highlightLinks = () => {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			if (tabs[0]?.id) {
				chrome.scripting.executeScript({
					target: { tabId: tabs[0].id },
					func: highlightLinksInPage,
				});
			}
		});
	};

	return (
		<div className="p-4 space-y-4">
			<button
				onClick={highlightLinks}
				className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
			>
				Highlight Links
			</button>
		</div>
	);
};

export default Popup;
