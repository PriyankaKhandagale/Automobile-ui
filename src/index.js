import React from 'react'
import ReactDom from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter } from 'react-router-dom'
import { legacy_createStore, } from 'redux'
import { Provider } from 'react-redux'
import myCartReducer from './store/reducers'

const myCartStore = legacy_createStore(myCartReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDom.createRoot(document.getElementById('root')).render(
    <Provider store={myCartStore}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>)
