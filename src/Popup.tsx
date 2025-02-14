import { useState } from 'react';

import { highlightLinksInPage } from './utils/highlightLinksInPage';
import { countWordsInPage } from './utils/countWordsInPage';

const Popup = () => {
	const [wordCount, setWordCount] = useState<number | null>(null);

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

	const countWords = () => {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			if (tabs[0]?.id) {
				chrome.scripting.executeScript(
					{
						target: { tabId: tabs[0].id },
						func: countWordsInPage,
					},
					(results) => {
						if (results && results.length > 0) {
							const [result] = results;
							setWordCount(result.result!);
						}
					}
				);
			}
		});
	};

	return (
		<div className="p-4 space-y-4 w-52">
			<button
				onClick={highlightLinks}
				className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
			>
				Highlight Links
			</button>

			<button
				onClick={countWords}
				className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
			>
				Count Words
			</button>
			{wordCount && (
				<div className="mt-2 flex flex-col items-center space-y-1">
					<h3 className="text-lg font-bold">Word Count</h3>
					<p className="text-base">{wordCount} words</p>
				</div>
			)}
		</div>
	);
};

export default Popup;
