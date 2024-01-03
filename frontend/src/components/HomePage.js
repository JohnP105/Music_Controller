import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/">
            <p>This is the home page</p>
          </Route>
          <Route path="/join" element={RoomJoinPage} />
          <Route path="/create" element={CreateRoomPage} />
        </Routes>
      </Router>
    );
  }
}