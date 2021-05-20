import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router";

import Login from "./components/pages/Login";
import Sidebar from "./components/ui/Sidebar";

import firebase from "./firebase"; // Desde el index. Y aqui se utilizan para envolver toda la app con firebase
import GeneralState from "./context/general/generalsState";
import EstructuraEmpresa from "./components/pages/estructura-empresa/EstructuraEmpresa";
import EstructuraDatosMaestrosMateriales from "./components/pages/estructura-datos-maestros/EstructuraDatosMaestrosMateriales";
import EstructuraDatosMaestrosClientes from "./components/pages/estructura-datos-maestros/EstructuraDatosMaestrosClientes";
import EstructuraDatosMaestrosPedidos from "./components/pages/estructura-datos-maestros/EstructuraDatosMaestrosPedidos";
import EstructuraDatosMaestrosCobros from "./components/pages/estructura-datos-maestros/EstructuraDatosMaestrosCobros";
import DatosMaestros from "./components/pages/datos-maestros/DatosMaestros";
import GestionPedidos from "./components/pages/gestion-pedidos/GestionPedidos";

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line
  }, []);

  if (initializing) return null;

  return (
    <>
      <GeneralState>
        {!user ? (
          <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
            <Routes>
              <Route path="/" exact element={<Login />} />
            </Routes>
          </div>
        ) : (
          <div className=" ">
            <Sidebar />
            <div className="flex justify-center p-2">
              <Routes>
                <Route path="/" exact element={<EstructuraEmpresa />} />
                <Route
                  path="/estructura-datos-maestros/materiales"
                  exact
                  element={<EstructuraDatosMaestrosMateriales />}
                />
                <Route
                  path="/estructura-datos-maestros/clientes"
                  exact
                  element={<EstructuraDatosMaestrosClientes />}
                />
                <Route
                  path="/estructura-datos-maestros/pedidos"
                  exact
                  element={<EstructuraDatosMaestrosPedidos />}
                />
                <Route
                  path="/estructura-datos-maestros/cobros"
                  exact
                  element={<EstructuraDatosMaestrosCobros />}
                />
                <Route
                  path="/datos-maestros"
                  exact
                  element={<DatosMaestros />}
                />
                <Route
                  path="/gestion-pedidos"
                  exact
                  element={<GestionPedidos />}
                />
              </Routes>
            </div>
          </div>
        )}
      </GeneralState>
    </>
  );
}

export default App;
