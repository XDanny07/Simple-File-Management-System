import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { useNavigate } from "react-router-dom";
export default function ViewFile(props) {
  const navigate = useNavigate();
  function View() {
    const storageRef = ref(storage, props.path);
    getDownloadURL(storageRef)
      .then((link) => {
        window.location.replace(link);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <button className="mt-[3px] max-w-max" onClick={View}>
      <FontAwesomeIcon
        icon={faDownload}
        size="sm"
        style={{
          "--fa-primary-color": "#0955d7",
          "--fa-secondary-color": "#0955d7",
        }}
      />
    </button>
  );
}
