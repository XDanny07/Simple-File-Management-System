import { Navbar } from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from "./pages/Upload";
import MyFiles from "./pages/MyFiles";
import Collection from "./pages/Collection";
export default function App() {
  return (
    <BrowserRouter>
      <div className="">
        <Navbar>
          <Routes>
            <Route path="/Upload" element={<Upload />}></Route>
            <Route path="/MyFiles" element={<MyFiles />}></Route>
            <Route path="/Collection" element={<Collection />}></Route>
          </Routes>
        </Navbar>
      </div>
    </BrowserRouter>
  );
}
