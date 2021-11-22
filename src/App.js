import Register from "./routes/Register/Register";
import { Route, Switch, useHistory } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import Header from "./components/Header/Header";
import Login from "./routes/Login/Login";
import { me } from "./services/userService";
import Feed from "./routes/Feed/Feed";
import Search from "./routes/Search/Search";
import Profile from "./routes/Profile/Profile";
import PostPage from "./routes/PostPage/PostPage";
import PostCreate from "./routes/PostCreate/PostCreate";
export const UserContext = createContext({});
export const ThemeContext = createContext({});

function App() {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const watch = (change) => {
      const isDark = change.matches;
      setDarkTheme(isDark);
    };
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", watch);
    watch(window.matchMedia("(prefers-color-scheme: dark)"));
    return () =>
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", watch);
  }, []);

  useEffect(() => {
    darkTheme
      ? document.body.classList.add("Dark")
      : document.body.classList.remove("Dark");
  }, [darkTheme]);

  useEffect(() => {
    me()
      .then((loggedUser) => {
        if (!isLoggedIn(loggedUser)) {
          history.push("/sign-in");
          return;
        }
        setUser(loggedUser);
      })
      .catch((err) => console.log(err));
  }, [history]);

  function isLoggedIn(user) {
    return user.hasOwnProperty("_id");
  }

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          {isLoggedIn(user) && <Header />}
          <Switch>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/sign-in">
              <Login />
            </Route>
            <Route path="/post/create">
              <PostCreate />
            </Route>
            <Route path="/post/:id">
              <PostPage />
            </Route>
            <Route path="/profile/:username">
              <Profile />
            </Route>
            <Route path="/">
              <Feed />
            </Route>
          </Switch>
        </div>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
