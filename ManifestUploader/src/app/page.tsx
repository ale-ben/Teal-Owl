import { RetrieveComponent } from "./component/retrieve";
import { UploadComponent } from "./component/upload";

export default async function Home() {
  return (
    <div className="grid grid-cols-2 gap-5 m-5">
      <div>
        <p className="text-center pb-3 text-3xl">Upload a new file</p>
        <UploadComponent />
      </div>
      <div>
        <p className="text-center pb-3 text-3xl">Retrive a file</p>
		<RetrieveComponent />
      </div>
    </div>
  );
}
