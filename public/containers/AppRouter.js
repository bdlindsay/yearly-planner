import React from "react"
import { Router, Route, browserHistory } from 'react-router'

import Home from './Home'
import LessonView from './LessonView'
import LessonCreator from '../components/LessonCreator'

// TODO have authentication live here?
// TODO make lesson creator it's own path?
// className="container-fluid"
const AppRouter = () => (
    <Router history={browserHistory} >
        <Route path="/" component={Home} />
        <Route path="/lessons/:grade" component={LessonView} />
    </Router>
)

export default AppRouter
