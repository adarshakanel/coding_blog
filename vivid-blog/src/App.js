import { HomePage } from "./Pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Blog } from "./Pages/Blog";
import { Page404 } from "./Pages/Page404";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:slug" element={<Blog />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
