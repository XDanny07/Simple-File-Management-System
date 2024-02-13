import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import "../bootstrap_custom.css";
import ManipulateUpload from "./ManipulateUpload";

export default function UploadFunc() {
  var userfile;
  const [file, setFile] = useState({ taskfile: userfile, ready: false });
  const [filesize, setFilesize] = useState();

  // For Setting Formatted FileSize
  useEffect(() => {
    if (!file.taskfile) return;
    let xsize = file.taskfile.size / 1024;
    if (xsize % 1024 == 0) {
      xsize = xsize / 1024;
      setFilesize(`${xsize.toFixed(2)} MB`);
    } else {
      setFilesize(`${xsize.toFixed(2)} KB`);
    }
  }, [file.taskfile]);
  function removeManiUpl() {
    setFile({ ...file, ready: false });
  }
  return (
    <div className="max-w-screen">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (file.taskfile) setFile({ ...file, ready: true });
        }}
      >
        <div className="mx-auto flex flex-wrap justify-between items-center w-[500px] h-[250px] border rounded px-5 py-3 bg-slate-50">
          <h3 className="inline">Select A File To Upload : </h3>
          <input
            className="hidden"
            type="file"
            id="file"
            onChange={(e) => {
              setFile({ ...file, taskfile: e.target.files[0] });
            }}
          />
          <label
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1.5 px-4 rounded inline-flex items-center cursor-pointer"
            htmlFor="file"
          >
            Select
          </label>
          {file.taskfile ? (
            <div className="min-w-[250px]">
              <h5 className="mb-2">Details:</h5>
              <p className="ml-5 mb-0 font-medium">
                Name : {file.taskfile.name}
              </p>
              <p className="ml-5 font-medium">Size : {filesize}</p>
            </div>
          ) : null}
          <button className="mx-auto bg-slate-50 hover:bg-green-600 text-green-600 hover:text-slate-50 font-bold py-2 px-4 rounded inline-flex border-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              height="18px"
              width="18px"
              className="mr-1 mt-[2px]"
            >
              <path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
            </svg>
            <span>Upload File</span>
          </button>
        </div>
      </form>
      {file.ready ? (
        <ManipulateUpload file={file.taskfile} removeManiUpl={removeManiUpl} />
      ) : null}
    </div>
  );
}

export function UploadModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      width="200px"
      dialogClassName="custom-dialog"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Upload</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UploadFunc />
      </Modal.Body>
    </Modal>
  );
}

export function UploadBtn() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="inline">
      <button
        onClick={() => setModalShow(true)}
        className="bg-slate-50 hover:bg-green-600 text-green-600 hover:text-slate-50 font-bold py-2 px-4 rounded inline-flex items-center border-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          height="18px"
          width="18px"
          className="mr-2 mt-[2px]"
        >
          <path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
        </svg>
        <span>Upload File</span>
      </button>

      <UploadModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}
