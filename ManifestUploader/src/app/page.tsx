import { redirect } from 'next/navigation';

export default async function Home() {
	redirect('/retrieve');

	return (
		<div className="m-5">
			<p className="pb-3 text-center text-3xl">Home page</p>
		</div>
	);
}
