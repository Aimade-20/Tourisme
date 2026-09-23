import { BrowserRouter, Routes, Route } from "react-router-dom";
import RihlaHeader from "./components/Header";
import HomePage from "../src/pages/HomePage"


function App() {
  return (
    <BrowserRouter>
      <RihlaHeader />
            <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
