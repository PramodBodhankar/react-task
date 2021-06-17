// import { createStore } from 'redux';
// import reducer from './rootReducer';
// const store = createStore(reducer);
// export default store;

import { createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
import reducer from './rootReducer';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/es/storage';
// import { createLogicMiddleware } from 'redux-logic';
// import logic from './rootLogic';
// import {IN_DEV} from './configuration.jsx';
/**
 * Singleton class to intialize the configure store and add middleware.
 */
const StoreSingleton = {
    instance: null,
    get storeInstance() {
        if (!this.instance) {
            this.instance = {
                store: null,
                persist: null,
                storeAndPersistance() {
                    if (this.store != null) {
      
                        return;
                    }
         
                    // const config = {
                    //     key: 'root',

                    //     whitelist: ['campaign','projectSettings', 'campaignFilter'], //add the reducers you dont want to persisit in the store after session break
                    //     storage,
                    // };
                    // const reduce = persistReducer(config, reducer);
                    // const deps = { // optional injected dependencies for logic
                    //     // anything you need to have available in your logic
                    //     Abc: window.Abc,

                    // };
                    // const logicMiddleware = createLogicMiddleware(logic, deps);
                    // const middleware = [logicMiddleware];

                    // if (IN_DEV) {
                    //     middleware.push(logger);
                    // }
                    this.store = createStore(reducer);
                    // this.store = createStore(
                    //     reducer,
                    //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
                    //     applyMiddleware(...middleware)
                    // );
                    // this.persistor = persistStore(this.store);
                },
                getStorePersistInstance() {
                    // let persist = this.persistor;
                    let store = this.store;
                    return { store };
                }
            };
        }
        return this.instance;
    }
}
;
const instance = StoreSingleton.storeInstance;
instance.storeAndPersistance();
export default instance.getStorePersistInstance();
