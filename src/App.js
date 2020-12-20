import { useState, useEffect } from "react";

import logo from "./images/logo.png";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Board from "./components/board/board";

function App() {
  const [cells, setCells] = useState([]);

  useEffect(() => {
    const c = new Array(1600);
    const d = c.fill(0).map((_, i) => ({
      id: i,
      bg: `cell.${Math.floor(Math.random() * 8)}`,
    }));
    setCells(d);
  }, []);

  return (
    <div className="App">
      <Router>
        <Route path="/" exact>
          <header className="App-header">
            <Link to="/play">
              <img src={logo} className="App-logo" alt="logo" />
            </Link>
          </header>
        </Route>
        <Route path="/play">
          <Board cells={cells} />
        </Route>
      </Router>
    </div>
  );
}

export default App;
