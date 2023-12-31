import { FaHandPointLeft } from 'react-icons/fa';
import { VerificationStatus, WMParagraph } from '../../models/parserTypes';

interface props {
	paragraph: WMParagraph;
}

function statusColor(status: VerificationStatus | undefined): string {
	switch (status) {
		case VerificationStatus.VALID:
			return 'text-green-500';
		case VerificationStatus.INVALID:
			return 'text-red-500';
		case VerificationStatus.UNKNOWN:
			return 'text-yellow-500';
		default:
			return 'text-gray-500';
	}
}

const Paragraph = ({ paragraph }: props) => {
	return (
		<div className="flex flex-row text-sm gap-2 items-center">
			<button
				type="button"
				className="p-2 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-300 hover:border-gray-400"
				onClick={async () => {
					console.log('Higlighting paragraph', paragraph.id);

					const queryOptions = {
						active: true,
						currentWindow: true
					};
					const tabs = await chrome.tabs.query(queryOptions);
					const tab = tabs[0];

					if (tab.id) {
						chrome.tabs
							.sendMessage(tab.id, {
								event: 'highlight',
								paragraphId: paragraph.id
							})
							.catch((error): void => {
								console.error('Teal-Owl', error); //TODO: Add error handling
							});
					}
				}}
			>
				<FaHandPointLeft className="text-lg" />
			</button>
			<div>
				Status:{' '}
				<a
					className={statusColor(
						paragraph.watermark?.verificationStatus
					)}
				>
					{paragraph.watermark?.verificationStatus}
				</a>
			</div>
		</div>
	);
};

export default Paragraph;
