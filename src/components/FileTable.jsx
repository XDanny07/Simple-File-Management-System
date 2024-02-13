import { useEffect, useState } from "react";
import { simpletype } from "../shared";
import DeleteFile from "./DeleteFile";
import { Player } from "@lottiefiles/react-lottie-player";
import ViewFile from "./ViewFile";
export default function FileTable(props) {
  const [temp, setTemp] = useState({
    temp1: "",
    temp2: "",
    temp3: "",
    temp4: "",
  });
  if (props.files.length) {
    useEffect(() => {
      setTemp({
        temp1: document.getElementsByClassName("recover-1")[0].offsetWidth,
        temp2: document.getElementsByClassName("recover-2")[0].offsetWidth,
        temp3: document.getElementsByClassName("recover-3")[0].offsetWidth,
        temp4: document.getElementsByClassName("recover-4")[0].offsetWidth,
      });
      props.phase2loading();
    }, []);
  }

  return (
    <>
      {props.files.length > 0 ? (
        <div className="flex flex-col shadow-xl">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden max-w-screen">
                <table className="text-left min-w-screen text-sm font-light">
                  <thead className="block max-w-fit border font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className={`px-6 py-3`}>
                        #
                      </th>
                      <th
                        scope="col"
                        style={{ width: `${temp.temp1}px` }}
                        className="px-6  py-3"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        style={{ width: `${temp.temp2}px` }}
                        className="px-6  py-3"
                      >
                        Size
                      </th>
                      <th
                        scope="col"
                        style={{ width: `${temp.temp3}px` }}
                        className="px-6  py-3"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        style={{ width: `${temp.temp4}px` }}
                        className="px-6 py-3"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="block overflow-y-auto max-h-[350px]">
                    {props.files
                      ? props.files.map((file) => {
                          return (
                            <tr
                              key={file.id}
                              className="border transition duration-300 ease-in-out hover:bg-gray-100 dark:border-gray-500 dark:hover:bg-gray-200"
                            >
                              <td className="w-10 whitespace-nowrap px-6 py-1 font-medium">
                                1
                              </td>
                              <td className="recover-1  whitespace-nowrap px-6 py-1">
                                {file.name}
                              </td>
                              <td className="recover-2 whitespace-nowrap px-6 py-1">
                                {file.size}
                              </td>
                              <td className="recover-3 whitespace-nowrap px-6 py-1">
                                {simpletype[file.type]}
                              </td>
                              <td className="recover-4 whitespace-nowrap px-6 py-1">
                                <div className="flex space-between">
                                  <DeleteFile path={file.path} />
                                  <ViewFile path={file.path} />
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center ">
          <Player
            autoplay
            loop
            src="https://lottie.host/df745368-7bd3-4469-84eb-b09a6ae0f9c8/zV3oraHSsK.json"
            style={{
              height: "300px",
              width: "300px",
            }}
            className="p-0"
          ></Player>
          <h4>There's Nothing Here</h4>
        </div>
      )}
    </>
  );
}
