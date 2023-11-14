import { RetrieveComponent } from './component/retrieve';
import { UploadComponent } from './component/upload';

export default async function Home() {
	return (
		<div className="m-5 grid grid-cols-2 gap-5">
			<div>
				<p className="pb-3 text-center text-3xl">Upload a new file</p>
				<UploadComponent />
			</div>
			<div>
				<p className="pb-3 text-center text-3xl">Retrive a file</p>
				<RetrieveComponent />
			</div>
		</div>
	);
}
