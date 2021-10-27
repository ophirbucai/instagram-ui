import './App.scss';
import Register from "./Register/Register";
import { Route, Switch, useHistory } from 'react-router-dom';
import { useState, createContext, useEffect } from "react";
import Header from './Header/Header';
import { me } from "./services/userService";
export const UserContext = createContext();

function App() {
    const history = useHistory();
    const [user, setUser] = useState({});

    useEffect(() => {
        me()
            .then(loggedUser => {
                if (!isLoggedIn(loggedUser)) {
                    history.push('./register');
                    return;
                }
                setUser(loggedUser);
            })
            .catch(err => console.log(err));
    }, [history])

    function isLoggedIn(user) {
        return user.hasOwnProperty('_id');
    }

  return (
    <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
            { isLoggedIn(user) && <Header />}
            <Switch>
                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </div>
    </UserContext.Provider>
  );
}

export default App;
