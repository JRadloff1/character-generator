import Home from "./Views/Home";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
