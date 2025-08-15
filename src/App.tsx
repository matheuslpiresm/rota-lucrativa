import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Settings from "./pages/Settings"


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/settings" element={<Settings />} />

        </Route>
      </Routes >
    </BrowserRouter >
  )
}
