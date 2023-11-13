"use client";

import { downloadObjectFromIPFS } from "@/serverActions/ipfs";
import { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";

export function RetrieveComponent() {
  const textinRef = useRef<HTMLInputElement>(null);
  const [retrievedObj, setRetrievedObj] = useState<object>();

  return (
    <div>
      <div className="flex items-center">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <input
            type="text"
            id="simple-search"
            ref={textinRef}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Search CID..."
            required
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800"
          onClick={async () => {
            const cid = textinRef.current?.value;
            if (cid) {
              console.log("cid", cid);
              const res = await downloadObjectFromIPFS(cid);
              try {
                setRetrievedObj(JSON.parse(res));
              } catch (e) {
				console.log("error", e);
				setRetrievedObj({"error": "Unable to parse JSON"});
              }
              console.log("res", retrievedObj);
            }
          }}
        >
          <BsSearch className="w-4 h-4" />
          <span className="sr-only">Search</span>
        </button>
      </div>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      {JSON.stringify(retrievedObj)}
    </div>
  );
}
