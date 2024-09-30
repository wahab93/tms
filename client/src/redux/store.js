import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'; // Import localStorage instead of sessionStorage

const persistConfig = {
    key: 'main-root',
    storage, // Use localStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware());

const persistor = persistStore(store);

export { persistor };

export default store;