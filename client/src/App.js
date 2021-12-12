import Login from './Components/Login/Login';
import Main from './Components/Main/Main';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/main" exact element={<Main />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
