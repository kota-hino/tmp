import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MainPage from './component/container/MainPage';
import LendinglogPage from './component/container/LendinglogPage';
import EquipmentPage from './component/container/EquipmentPage';
import LendingreturningPage from './component/container/LendingreturningPage';
import LendingItemPage from "./component/container/LendingItemPage";

function App() {
  return(
    <BrowserRouter>
        <Switch>
          <Route exact path='/'><MainPage /></Route>
          <Route exact path='/lendinglog'><LendinglogPage /></Route>
          <Route exact path='/equipment/:id'><EquipmentPage /></Route>
          <Route exact path='/lendingreturning'><LendingreturningPage /></Route>
          <Route exact path='/lendingItemPage/:id'><LendingItemPage /></Route>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
