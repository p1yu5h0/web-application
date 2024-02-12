import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllRoutes from "./routes";


function App() {
  return (
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  )
}

export default App;
