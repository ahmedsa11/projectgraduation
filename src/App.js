import react, { Component } from 'react';
import { Route,Switch ,Redirect} from 'react-router';
import './App.css';
import Forget from './components/forgetpass/forgetpass';
import NOT from './components/notfound';
import Verification from './components/verification/verification';
import Form from './components/form/form';
import Room from './components/video conference/videochat/room';
import Signlang from './components/video conference/videochat/signlanguage';
import Home from './components/video conference/home/home';
class App extends Component{
  render(){
  return (
    <react.Fragment>
       <Switch>
          <Route exact path="/" component={Form}/>
         <Route path="/notfound" component={NOT}/>
         <Route path="/forget" component={Forget}/>
         <Route path="/verification" component={Verification}/>
         <Route path="/signlang" component={Signlang}/>
         <Route path="/home" exact component={Home} />
        <Route path="/room/:roomId" component={Room} />
         <Redirect from="/form"to="/"/>
         <Redirect to="/notfound"/>
    
      </Switch> 
     
    </react.Fragment>
  );}
}

export default App;
