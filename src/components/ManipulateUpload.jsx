import { useEffect, useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import ProgressBar from "react-bootstrap/ProgressBar";
import Popup from "reactjs-popup";

var storageRef;
var uploadtask;
export default function ManipulateUpload(props) {
  const [prog, setProg] = useState(0);
  const [progressbarcolor, setProgressbarcolor] = useState("success");
  const [uplstate, setUplstate] = useState({ paures: false, cancel: false });

  function pause_resume() {
    if (uplstate.paures) {
      setProgressbarcolor("success");
      uploadtask.resume();
      return;
    }
    setProgressbarcolor("warning");
    uploadtask.pause();
  }
  function cancel() {
    uploadtask.cancel();
    props.removeManiUpl();
  }
  function report(id) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-apikey":
          "96a3e859d6f0ca2abf9eb1ba7528f4c1716ad5b2be2d10b3746a7d6090eb1dae",
      },
    };

    fetch(`https://www.virustotal.com/api/v3/analyses/${id}`, options)
      .then((response) => response.json())
      .then((response) => console.log(response.data.attributes.stats))
      .catch((err) => console.error(err));
  }
  useEffect(() => {
    const form = new FormData();
    form.append("file", props.file);

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "x-apikey":
          "96a3e859d6f0ca2abf9eb1ba7528f4c1716ad5b2be2d10b3746a7d6090eb1dae",
      },
    };

    options.body = form;

    fetch("https://www.virustotal.com/api/v3/files", options)
      .then((response) => response.json())
      .then((data) => {
        report(data.data.id);
      })

      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    storageRef = ref(storage, `/person1/${props.file.name}`);
    uploadtask = uploadBytesResumable(storageRef, props.file);
    console.log(props.file.type);
    uploadtask.on(
      "state_changed",
      (snap) => {
        var byt = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProg(byt);
      },
      (err) => {
        console.log(err);
      },
      (done) => {
        props.removeManiUpl();
        <Popup trigger={done} position="right center">
          <div>Popup content here !!</div>
        </Popup>;
        if (window.location.pathname === "/MyFiles") {
          window.location.replace(window.location.href);
        }
      }
    );
  }, []);

  return (
    <div className="mt-2 p-2 border rounded bg-slate-50">
      <ProgressBar
        variant={progressbarcolor}
        animated
        now={prog}
        label={`${prog.toFixed(0)}%`}
      />
      <div className="mt-2">
        <button
          onClick={() => {
            setUplstate({ ...uplstate, paures: !uplstate.paures });
            pause_resume();
          }}
          type="button"
          className="btn btn-outline-primary mr-2"
        >
          {uplstate.paures ? "Resume" : "Pause"}
        </button>
        <button
          onClick={() => {
            setUplstate({ ...uplstate, cancel: true });
            cancel();
          }}
          type="button"
          className="btn btn-outline-danger"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
