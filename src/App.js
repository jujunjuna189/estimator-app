import { Route, Routes } from "react-router-dom";
import { Login, Product, Quotation } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<><Product /><Login /></>} />
      <Route path="/quotation" element={<Quotation />} />
    </Routes>
  );
}

export default App;
