import { ManifestType } from '@teal-owl/types';
import { WMParagraph } from '../../models/parserTypes';
import Paragraph from './Paragraph';

interface props {
	manifest: ManifestType | undefined;
	watermarkList: WMParagraph[];
}

const Result = ({ manifest, watermarkList }: props) => {
	const tstamp = new Date(manifest?.timestamp ?? 0);

	return (
		<div className="text-white">
			<hr className="my-2"></hr>

			{manifest !== undefined ? (
				<div className="text-lg">
					<p>
						Author:{' '}
						<a className="italic text-xl">{manifest.author}</a>
					</p>
					<p>
						Document:{' '}
						<a className="italic text-xl">{manifest.document}</a>
					</p>
					<p>
						{' '}
						Publication date:{' '}
						<a className="italic text-xl">
							{tstamp.getFullYear()}{' '}
							{tstamp.toLocaleString('default', {
								month: 'long'
							})}{' '}
							{tstamp.getDate()}
						</a>
					</p>
					{manifest.source !== undefined && manifest.source !== '' ? (
						<p>
							Source:{' '}
							<a
								href={manifest.source}
								className="italic text-xl"
							>
								{manifest.source}
							</a>
						</p>
					) : (
						<></>
					)}
					{manifest.notes !== undefined && manifest.notes !== '' ? (
						<p>
							Notes:{' '}
							<a className="italic text-xl">{manifest.notes}</a>
						</p>
					) : (
						<></>
					)}
				</div>
			) : (
				<div>
					<p className='text-xl'>No manifest found</p>
					<p className='text-base'>The following paragraphs have a watermark but no corresponding manifest has been found.</p>
				</div>
			)}
			<a className="text-base">Paragraphs:</a>
			<div className="flex flex-col gap-2 mt-2">
				{watermarkList.map((wm) => (
					<Paragraph key={wm.id} paragraph={wm} />
				))}
			</div>
		</div>
	);
};

export default Result;
