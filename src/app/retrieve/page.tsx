import { getName } from '@/serverActions/contractProviderUtils';
import { retrieveFormSubmitHandler } from '@/serverActions/retrieveActions';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import { Input } from '@nextui-org/input';

/**
 * @param searchParams - The query parameters from the URL.
 * error param:
 * 	- 'allEmpty' - All fuelds are empty.
 *  - 'missingAuthorID - Missing Author ID.
 *  - 'missingDocumentID' - Missing Document ID.
 * 	- 'invalid' - Data entered is invalid.
 *
 * params:
 * - authorID - The author ID.
 * - documentID - The document ID.
 * - manifestID - The manifest ID.
 */
interface RetrieveProps {
	searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Retrieve({ searchParams }: RetrieveProps) {
	const contractName = await getName();

	const error = searchParams && (searchParams.error as string | undefined);

	const documentID =
		searchParams && (searchParams.documentID as string | undefined);
	const authorID =
		searchParams && (searchParams.authorID as string | undefined);
	const manifestID =
		searchParams && (searchParams.manifestID as string | undefined);

	return (
		<div className="m-5">
			<p className="pb-10 text-center text-3xl">Retrieve a manifest</p>
			<form className="flex flex-col" action={retrieveFormSubmitHandler}>
				<div className="flex flex-row gap-5">
					<Input
						label="Author ID"
						name="authorID"
						defaultValue={authorID}
						errorMessage={
							error && error === 'missingAuthorID'
								? 'You have to specify both Autor ID and Document ID (or use Manifest ID)'
								: ''
						}
						isInvalid={
							error !== undefined && error === 'missingAuthorID'
						}
					/>
					<Input
						label="Document ID"
						name="documentID"
						defaultValue={documentID}
						errorMessage={
							error && error === 'missingDocumentID'
								? 'You have to specify both Autor ID and Document ID (or use Manifest ID)'
								: ''
						}
						isInvalid={
							error !== undefined && error === 'missingDocumentID'
						}
					/>
				</div>
				<p className="flex text-center justify-center m-5">OR</p>
				<div>
					<Input
						label="Manifest ID"
						name="manifestID"
						defaultValue={manifestID}
					/>
				</div>
				<div className="flex justify-end mt-5">
					<Button type="submit" color="primary">
						Retrieve
					</Button>
				</div>
			</form>
			<Divider className="my-5" />
			{error !== undefined ? (
				<div className="mb-5">
					<p className="text-xl text-red-400">Error</p>
					<p>
						{error === 'allEmpty'
							? 'All fields are empty.'
							: error === 'missingAuthorID'
								? 'You have to specify both Autor ID and Document ID (or use Manifest ID)'
								: error === 'missingDocumentID'
									? 'You have to specify both Autor ID and Document ID (or use Manifest ID)'
									: error === 'invalid'
										? 'Data entered is invalid.'
										: ''}
					</p>
				</div>
			) : (
				<></>
			)}
			<p className="text-xl">How to use</p>
			<p>
				Please either specify both <a className="italic">Author ID</a>{' '}
				and <a className="italic">Document ID</a> or specify{' '}
				<a className="italic">Manifest ID.</a>
				<br />
				Note that if you specify <a className="italic">Manifest ID</a>,
				all the other fields will be ignored.
			</p>
			<p className="text-xl mt-5">Contract Name: {contractName}</p>
		</div>
	);
}
