import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import NotFound from "./pages/NotFound";
import LayoutLoaders from "./components/layout/Loaders";

const Home = lazy(() => import("./pages/Home"));
const Groups = lazy(() => import("./pages/Groups"));
const Chat = lazy(() => import("./pages/Chat"));
const Login = lazy(() => import("./pages/Login"));

let user: boolean = false;

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoaders />}>
        <Routes>

          <Route
            path="/"
            element={
              <ProtectRoute user={user}>
                {" "}
                <Home />{" "}
              </ProtectRoute>
            }
          />

          <Route
            path="/groups"
            element={
              <ProtectRoute user={user}>
                <Groups />
              </ProtectRoute>
            }
          />

          <Route
            path="/chat/:chatId"
            element={
              <ProtectRoute user={user}>
                <Chat />
              </ProtectRoute>
            }
          />

          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
