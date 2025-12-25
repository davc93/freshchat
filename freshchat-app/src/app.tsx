import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { Widget } from "./pages/widget";
import { Login } from "./pages/login";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Login />}></Route>
        <Route path="/widget" element={<Widget />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
