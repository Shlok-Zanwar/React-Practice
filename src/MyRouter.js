import React from 'react'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GalleryApp from './GalleryPage/GalleryApp';

function MyRouter() {

    return (
        <Router>
            <Switch>
                <Route path="/shlok" >
                </Route>
                <Route path="/nihar" >
                    <GalleryApp />
                </Route>
                <Route path="/" >
                    <div>
                        Hii
                    </div>
                </Route>
            </Switch>
        </Router>
    )
}

export default MyRouter;
