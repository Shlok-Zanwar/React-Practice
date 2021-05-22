import React from 'react'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Example } from './Example';
import GalleryApp from './GalleryPage/GalleryApp';

function MyRouter() {

    return (
        <Router>
            <Switch>
                <Route path="/shlok" >
                    <div>
                    <Example />
                    </div>
                </Route>
                <Route path="/nihar" >
                    <div>
                        <>
                            <GalleryApp />
                        </>
                    </div>
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
