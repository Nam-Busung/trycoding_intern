import React from 'react';
import ReactDOM from 'react-dom';
//import EditApp from './EditApp';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { createStore } from 'redux';
import rootReducer from './rootReducer';
import { Provider } from 'react-redux'
import { Router} from 'react-router';
import { createBrowserHistory } from 'history';
import Root from './Rootrouter';


 const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
// //크롬 리덕스 개발자 도구 적용
 const history =  createBrowserHistory();
 const store = createStore(rootReducer, devTools);
// console.log(store.getState()); //store에 내장 된 state를 가져오는 메서드


ReactDOM.render(
     <Provider store={store}>
       <Router history={history}>
        <Root />
       </Router>
    </Provider>
    , document.getElementById('root')
);
serviceWorker.unregister();



