import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import './style/App.css';
import './style/styles.css'
import Loyout from "./components/view/Loyout";

function App() {
  return (
    <BrowserRouter basename="/jsonplaceholder">
      <Routes>
        <Route
          path={`/`} element={
            <Fragment>
              <Loyout path='home' />
            </Fragment>
          }
        />
        <Route
          path={`/users`} element={
            <Fragment>
              <Loyout path={'users'} />
            </Fragment>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
