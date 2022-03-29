import react, { Component } from "react";
import { Route, Switch, Redirect } from "react-router";
import "./App.css";
import NOT from "./components/notfound";
import Form from "./components/form/form";
import Room from "./components/video conference/videochat/room";
import Home from "./components/video conference/home/home";
import Setting from "./components/setting/setting";
class App extends Component {
  render() {
    return (
      <react.Fragment>
        <Switch>
          <Route exact path="/" component={Form} />
          <Route path="/home" component={Home} />
          <Route path="/room/:roomId" component={Room} />
          <Route path="/setting" component={Setting} />
          <Route path="/notfound" component={NOT} />
          {/* <Redirect from="/form" to="/" /> */}
          <Redirect to="/notfound" />
        </Switch>
      </react.Fragment>
    );
  }
}

export default App;
