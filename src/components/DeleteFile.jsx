import { storage } from "../firebase";
import { ref, deleteObject } from "firebase/storage";
import { Player } from "@lottiefiles/react-lottie-player";
export default function DeleteFile(props) {
  function removefile() {
    const deleteRef = ref(storage, props.path);
    deleteObject(deleteRef)
      .then((response) => {
        alert("File Deleted Successfully");
        if (window.location.pathname === "/MyFiles") {
          window.location.replace(window.location.href);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <button
      onClick={() => {
        removefile();
      }}
    >
      <Player
        hover
        src="https://lottie.host/27f5dc7b-657c-46d1-aa52-27cc347a8640/T2MGGM5PmS.json"
        style={{
          height: "48px",
          width: "48px",
        }}
      ></Player>
    </button>
  );
}
