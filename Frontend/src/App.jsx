import "./App.css";
import Header from "./component/Header.jsx";
import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
    <Toaster/>
      <div className="">
        <Header />
        <main className="pt-16 bg-black min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}
export default App;
