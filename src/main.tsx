import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import client from "./apolloClient";
import App from "./App.tsx";
import "./index.css";
import AuthProvider from "./components/AuthProvider";
import DialogProvider from "./components/DialogProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <DialogProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DialogProvider>
    </AuthProvider>
  </ApolloProvider>
);
