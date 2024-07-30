import React from "react";
import { BrowserRouter, Route, Router } from "react-router-dom";
import Wallet from "./pages/Wallet";
import ViewAllTask from "./pages/ViewAllTask";
import CreateTask from "./pages/CreateTask";
import DeleteTask from "./pages/DeleteTask";
import UpdateTask from "./pages/UpdateTask";
import ViewTask from "./pages/ViewTask";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Router>
          <Route path="/" element={Wallet} />
          <Route path="/view-all-tasks" element={ViewAllTask} />
          <Route path="/create-task" element={CreateTask} />
          <Route path="/deleteTask" element={DeleteTask} />
          <Route path="update-task" element={UpdateTask} />
          <Route path="view-task" element={ViewTask} />
        </Router>
      </BrowserRouter>
    </>
  );
};
