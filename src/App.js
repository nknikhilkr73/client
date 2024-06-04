import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import About from "./components/About";
import AllStudentsData from "./components/AllStudentsData";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import TodoList from "./components/TodoList";

import Admin from "./components/Admin";
import IndividualData from "./components/IndividualData";
import Quiz from "./components/Quiz";
import DataState from "./context/datas/DataState";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <>
      <DataState>

        <NoteState>
          <Router>
            <Navbar />
            <div className="container">

              <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/about" element={<About />}></Route>
                <Route exact path="/details" element={<AllStudentsData />}></Route>
                <Route exact path="/student" element={<IndividualData />}></Route>
                <Route exact path="/admin" element={<Admin />}></Route>
                <Route exact path="/todo" element={<TodoList />}></Route>
                <Route exact path="/login" element={<Login />} ></Route>
                <Route exact path="/signup" element={<Signup />} ></Route>
                <Route exact path="/quiz" element={<Quiz />} ></Route>
                {/* <Route exact path="/adminLogin" element={<Admin />} ></Route> */}
              </Routes>

            </div>
          </Router>

        </NoteState >

      </DataState>
    </>
  );
}

export default App;
