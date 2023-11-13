"use client";
import { uploadObjectToIPFS } from "@/serverActions/ipfs";
import { useState, useEffect } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";

function compareFiles(file1: File, file2: File): boolean {
  return (
    file1.name === file2.name &&
    file1.size === file2.size &&
    file1.type === file2.type
  );
}

export function UploadComponent() {
  const [acceptedList, setAcceptedList] = useState<File[]>([]);
  const [rejectedList, setRejectedList] = useState<FileRejection[]>([]);
  const [uploadedURLs, setUploadedURLs] = useState<string[]>([]);
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    accept: {
      "application/json": [".json"],
    },
    maxFiles: 5,
  });

  useEffect(() => {
    const newFiles = acceptedFiles.filter(
      (file) => !acceptedList.includes(file)
    ); //FIXME: File comparison is not working (different objects)
    setAcceptedList([...acceptedList, ...newFiles]);
  }, [acceptedFiles]);

  useEffect(() => {
    const newFiles = fileRejections.filter(
      (file) => !rejectedList.includes(file)
    ); //FIXME: File comparison is not working (different objects)
    setRejectedList([...rejectedList, ...newFiles]);
  }, [fileRejections]);

  return (
    <div>
      <div
        {...getRootProps({
          className: "flex items-center justify-center w-full",
        })}
      >
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <AiOutlineCloudUpload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />

            {isDragActive ? (
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                Drop file here to upload
              </p>
            ) : (
              <>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Only JSON files generated by{" "}
                  <span className="font-semibold">Teal-Owl Publisher</span> are
                  supported. Max 5 files.
                </p>
              </>
            )}
          </div>
          <input {...getInputProps()} />
        </label>
      </div>
      <div className="mt-5">
        <p className="text-xl">Accepted files:</p>
        <ul className="max-w-md space-y-1 list-disc list-inside ">
          {acceptedList.map((file) => (
            <li key={file.name}>
              {" "}
              {file.name} ({file.size}){" "}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5">
        <p className="text-xl">Rejected files:</p>
        <ul className="max-w-md space-y-1 list-disc list-inside ">
          {rejectedList.map((file) => (
            <li key={file.file.name}>
              {" "}
              {file.file.name} ({file.file.size}):
              <ol className="pl-5 mt-2 space-y-1 list-disc list-inside">
                {file.errors.map((error) => (
                  <li key={error.code}>{error.message}</li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
      </div>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <div className="mt-5">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          onClick={() => {
            acceptedList.forEach((file) => {
              // Log to console file content
              file.text().then(async (text) => {
                const cid = await uploadObjectToIPFS(JSON.parse(text));
                setUploadedURLs([...uploadedURLs, file.name + ": " + cid]);
              });
            });
            setAcceptedList([]);
            setRejectedList([]);
          }}
        >
          Upload
        </button>
        <button
          type="button"
          className="text-white bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
          onClick={() => {
            setAcceptedList([]);
            setRejectedList([]);
          }}
        >
          Clear
        </button>
      </div>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <p className="text-xl">Uploaded files:</p>
      <ul className="max-w-md space-y-1 list-disc list-inside ">
		{uploadedURLs.map((url) => (
			<li key={url}>{url}</li>
		))}
	  </ul>
    </div>
  );
}
