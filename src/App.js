import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import VilleCrud from './VilleCrud';
import villeshow from './villeshow';
import zoneshow from './zoneshow';
import zonecrud from './zonecrud';
import specialiteshow from './specialiteshow';
import specialitecrud from './specialitecrud';
import serieshow from './serieshow';
import seriecrud from './seriecrud';
import restaushow from './restaushow';
import restaucrud from './restaucrud';
class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
          
            <Route path='/' exact={true} component={Home}/>
            <Route path='/villes' exact={true} component={villeshow}/>
            <Route path='/villes/:id' component={VilleCrud}/>

             <Route path='/zone' exact={true} component={zoneshow}/> 
             <Route path='/zone/:id' exact={true} component={zonecrud}/> 

             <Route path='/specialite' exact={true} component={specialiteshow}></Route>
             <Route path='/specialite/:id' exact={true} component={specialitecrud}/> 


             <Route path='/serie' exact={true} component={serieshow}></Route>
             <Route path='/serie/:id' exact={true} component={seriecrud}/> 

             <Route path='/resto' exact={true} component={restaushow}></Route>
             <Route path='/resto/:id' exact={true} component={restaucrud}/> 
          </Switch>
        </Router>
    )
  }
}

export default App;