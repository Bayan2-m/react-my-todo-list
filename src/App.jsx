
import "./App.css";
import { TodoWrapper } from "./Components/TodoWrapper";
import { Toaster } from "react-hot-toast";

function App() {
   
  return (
    <div className="App">
       <Toaster />
      <TodoWrapper />
    </div>
  );
}

export default App;

