import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import Dashboard from "./Tabs/Dashboard";
import EntryList from "./Tabs/EntryList";
import SharePrice from "./Tabs/SharePrice";
import Header from "./Components/Header";
import "./index.css";
// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="App bg-gray-800 p-4">
            <div className="App-header">
              <Header />
              <Routes>
                <Route path="/" element={<SharePrice />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/entrylist" element={<EntryList />}></Route>
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
