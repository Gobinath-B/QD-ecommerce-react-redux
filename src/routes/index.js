import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../container/Home";
import { AuthProvider } from "./authProvider";
import Login from "../container/login";
import Register from "../container/register";
import AuthMiddleware from "./authMiddileware";

export default function Router() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
                        path="*"
                        element={
                            <AuthMiddleware>
                                <Home />
                            </AuthMiddleware>
                        }
                    />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
