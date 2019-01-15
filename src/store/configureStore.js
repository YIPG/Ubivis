import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducer from '../reducers';

// 永続化の設定
const persistConfig = {
    key: 'root', // Storageに保存されるキー名を指定する
    storage, // 保存先としてlocalStorageがここで設定される
    whitelist: ['auth', 'main'] // Stateは`auth`と'profile'のみStorageに保存する
    // blacklist: ['visibilityFilter'] // `visibilityFilter`は保存しない
  }

// 永続化設定されたReducerとして定義
const persistedReducer = persistReducer(persistConfig, reducer)

// Redux-dev Toolの設定
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    persistedReducer,
    /* preloadedState, */
    composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store)
export default store
