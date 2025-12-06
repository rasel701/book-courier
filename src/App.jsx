import { Button } from "@mui/material";
import React from "react";
import Navber from "./Components/Navber";

const App = () => {
  return (
    <div>
      <Navber />
      <h2>Hello</h2>
      <Button variant="contained">Click me</Button>
    </div>
  );
};

export default App;
