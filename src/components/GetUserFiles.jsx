import { useEffect, useState } from "react";
import { storage } from "../firebase";
import { ref, listAll, getMetadata, getDownloadURL } from "firebase/storage";
var Uid = 1;
export default function GetUserFiles(phase1loading) {
  const [files, setFiles] = useState([]);
  function filesize(file) {
    let xsize = file / 1024;
    if (xsize % 1024 == 0) {
      xsize = xsize / 1024;
      xsize = `${xsize.toFixed(2)} MB`;
    } else {
      xsize = `${xsize.toFixed(2)} KB`;
    }
    return xsize;
  }
  var promises;
  useEffect(() => {
    const getref = ref(storage, "person1/");
    listAll(getref).then(async (response) => {
      promises = response.items.map((item) => {
        return new Promise((resolve) => {
          const rf = ref(storage, item.fullPath);

          getMetadata(rf).then((file) => {
            const data = {
              id: Uid++,
              name: file.name,
              type: file.contentType,
              size: filesize(file.size),
              path: file.fullPath,
            };
            setFiles((prev) => [...prev, data]);
            resolve();
          });
        });
      });
      await Promise.allSettled(promises).then(() => {
        phase1loading();
      });
    });
  }, []);
  return files;
}
