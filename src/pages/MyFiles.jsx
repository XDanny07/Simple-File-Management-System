import FileTable from "../components/FileTable";
import { UploadBtn } from "../components/UploadFunc";
import GetUserFiles from "../components/GetUserFiles";
import { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

export default function MyFiles() {
  const [isloading, setIsloading] = useState({ t1: true, t2: true });
  function phase1loading() {
    setIsloading({ ...isloading, t1: false });
  }
  function phase2loading() {
    setIsloading({ ...isloading, t2: false });
  }
  let files = GetUserFiles(phase1loading);

  return (
    <>
      {isloading.t1 && isloading.t2 ? (
        <Player
          autoplay
          loop
          src="https://assets10.lottiefiles.com/packages/lf20_x62chJ.json"
          style={{ height: "300px", width: "300px" }}
        ></Player>
      ) : (
        <div>
          <div className="flex justify-between items-end">
            <h1 className="mb-0 mt-10">MY FILES : </h1>
            <UploadBtn />
          </div>
          <FileTable files={files} phase2loading={phase2loading} />
        </div>
      )}
    </>
  );
}
