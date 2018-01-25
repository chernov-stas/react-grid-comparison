import React from 'react';
import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom';
import App from './containers/App';
import AddUser from './containers/AddUser';
import UserTable from './containers/UserTable';
import UserGrid from './containers/UserGrid';
import NotFound from './components/NotFound';

const routes = (
    <Router>
        <div>
            <p>
                <NavLink to="/add" activeClassName="link-active">Redux forms</NavLink>
                {' '}
                <NavLink to="/users" activeClassName="link-active">React-table</NavLink>
                {' '}
                <NavLink to="/users-grid" activeClassName="link-active">React-data-grid</NavLink>
            </p>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/add" exact component={AddUser} />
                <Route path="/users" exact component={UserTable} />
                <Route path="/users-grid" exact component={UserGrid} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
);

export default routes;
