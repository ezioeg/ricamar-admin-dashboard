import React from "react";

import DatosEmpresa from "./DatosEmpresa";
import ZonasVenta from "./ZonasVenta";
import TiposDocumento from "./TiposDocumento";
import Vendedores from "./Vendedores";

const Tabs = ({ color }) => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
      <div className="w-screen ml-16">
        <div className="">
          <p className="text-gray-800 font-semibold text-xl uppercase bg-gray-200 text-center flex-auto px-5 py-5 rounded">
            Estructura de la Empresa
          </p>
          <ul
            className="flex mb-0 list-none flex-wrap pt-2 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center text-sm uppercase">
              <a
                className={
                  "font-bold  px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-" + color + "-500"
                    : "text-" + color + "-500 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Datos de la Empresa
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center text-sm uppercase">
              <a
                className={
                  " font-bold  px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-" + color + "-500"
                    : "text-" + color + "-500 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Zonas de Venta
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center text-sm uppercase">
              <a
                className={
                  "font-bold  px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 3
                    ? "text-white bg-" + color + "-500"
                    : "text-" + color + "-500 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                Tipos de Documento
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center text-sm uppercase">
              <a
                className={
                  "font-bold  px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 4
                    ? "text-white bg-" + color + "-500"
                    : "text-" + color + "-500 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(4);
                }}
                data-toggle="tab"
                href="#link4"
                role="tablist"
              >
                Vendedores
              </a>
            </li>
          </ul>
          {/* <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded "> */}
          {/* <div className="px-2 py-5 flex-auto"> */}
          <div className="tab-content tab-space">
            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
              <DatosEmpresa />
            </div>
            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
              <ZonasVenta />
            </div>
            <div className={openTab === 3 ? "block" : "hidden"} id="link3">
              <TiposDocumento />
            </div>
            <div className={openTab === 4 ? "block" : "hidden"} id="link4">
              <Vendedores />
            </div>
          </div>
          {/* </div> */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default function EstructuraEmpresa() {
  return (
    <>
      <Tabs color="blue" />
    </>
  );
}
