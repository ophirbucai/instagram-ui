import './App.scss';
import Register from "./Register/Register";
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Switch>
            <Route path="/register">
                <Register />
            </Route>
        </Switch>
    </div>
  );
}

export default App;
