import './style/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment } from "react";

function App() {
  return (
    <BrowserRouter basename="/jsonplaceholder">
      <Routes>
        <Route
          path={`/`} element={
            <Fragment>
              holas
            </Fragment>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
