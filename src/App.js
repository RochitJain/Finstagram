import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Registration from "./Registration";
import Login from "./Login";
// import Header from "./Header";
import Document from "./Documents";
import ShortUrl from "./ShortUrl";
function App() {
  return (
    <div>
      <Router>
        {/* <Header /> */}
        <section className="container">
          <Routes>
            <Route exact path={"/"} element={<Login />} />
            <Route path={"/registration"} element={<Registration />} />
            <Route path={"/login/user"} element={<Document />} />
            <Route path={"/abc/:id"} element={<ShortUrl />} />
          </Routes>
        </section>
      </Router>
    </div>
  );
}

export default App;
