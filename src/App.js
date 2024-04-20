import Router from "./routes";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  return (
    <div className="App">
      <Provider store={store} />
      <Router />
    </div>
  );
}

export default App;
