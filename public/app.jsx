import React from "react"
import ReactDOM from 'react-dom'
import Home from './containers/home'
import LessonView from './containers/lessonView'
import LessonCreator from './components/LessonCreator'
import { Router, Route, browserHistory } from 'react-router'

class App extends React.Component {
    // TODO have authentication live here
    // <Route path="/create" component={LessonCreator} />
    // Route CurriculumTabs
    // Redirect to login if not loggin in
    // this holds onto the config file

    render() {
        return (
            <div className="container-fluid">
                <Router history={browserHistory} >
                    <Route path="/" component={Home} />
                    <Route path="/lessons/:grade" component={LessonView} />
                </Router>
            </div>
        )

    }
}

ReactDOM.render(<App/>, document.getElementById('content'));
