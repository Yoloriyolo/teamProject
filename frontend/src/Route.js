import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Recommend from "./page/Homepage/Recommend";
import Check from './page/Homepage/Check';
import LoginPage from './page/LoginPage/LoginPage';
import Main from './page/MainPage/MainPage';


function route() {
    return (
        <div className="Route">

            <Router>

                <div>
                    <hr />
                    <Switch>

                        <Route path="/" exact={true} component={Main} />
                        <Route path="/Main" exact={true} component={Main} />
                        <Route path="/Login" component={LoginPage} />
                        <Route path="/Check" component={Check} />
                        <Route path="/Recommend" component={Recommend} />
                    </Switch>

                </div>

            </Router>

        </div>
    )
}

export default route