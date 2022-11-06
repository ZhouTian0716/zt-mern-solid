import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Redux Setup
import { store } from "./redux/store";
import { Provider } from "react-redux";

// 👻 Redux toolkit way of working, instead of useEffect in each component
// Initial State fetched on App loading
import { fetchPosts } from "./redux/reducers/postsSlice";
store.dispatch(fetchPosts());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>

  /* <React.StrictMode>
<Provider store={store}>
  <App />
</Provider>
</React.StrictMode> */
);
