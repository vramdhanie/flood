import logo from "./images/logo.png";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Board from "./components/board/board";
import Cell from "./components/cell/cell";
import useGame from "./hooks/game";

function App() {
  const [cells, currentColour, setCurrentColour, yourCells] = useGame(6);

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
          <Board setCurrentColour={setCurrentColour}>
            {cells.map((cell) => (
              <Cell key={cell.id} {...cell} />
            ))}
          </Board>
        </Route>
      </Router>
    </div>
  );
}

export default App;
