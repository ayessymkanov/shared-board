import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Signin from "./routes/Signin";
import Home from "./routes/Home";
import Signup from "./routes/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Layout>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/join" element={<Signup />} />
        <Route path="*" element={<div>not found</div>} />
      </Routes>
    </Layout>
  );
}

export default App;
