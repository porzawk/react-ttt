import "./App.css";
import "antd/dist/antd.css";
import { Home } from "./Pages/Home";
import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    <ToastProvider placement="top-center" autoDismiss autoDismissTimeout={3000}>
      <Home />
    </ToastProvider>
  );
}

export default App;
