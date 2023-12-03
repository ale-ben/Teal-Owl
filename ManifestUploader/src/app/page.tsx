import { redirect } from 'next/navigation';

export default function Home() {
	redirect('/upload');
	return (
		<div className="m-5">
			<p className="pb-3 text-center text-3xl">Home page</p>
		</div>
	);
}
