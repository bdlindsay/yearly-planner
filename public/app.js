import React from "react"
import ReactDOM from 'react-dom'

import { AppContainer } from 'react-hot-loader'
import styles from "./styles/styles.css"
import AppRouter from "./containers/AppRouter"

const renderApp = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('content')
    );
}
renderApp(AppRouter)

if (module.hot) {
    module.hot.accept('./containers/AppRouter', () => {
        renderApp(AppRouter)
    })
}
