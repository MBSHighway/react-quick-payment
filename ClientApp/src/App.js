import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './containers/Home';
import './front.css'

export default class App extends React.Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
            </Layout>
        );
    }
}
