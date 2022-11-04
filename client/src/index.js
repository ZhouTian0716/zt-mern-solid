import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Redux Setup
import { store } from "./redux/store";
import { Provider } from "react-redux";

// 👻 Reducers
import { fetchPosts } from "./redux/reducers/posts"
// import reducers from './reducers'

// Initial State fetched on App loading
store.dispatch(fetchPosts());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
