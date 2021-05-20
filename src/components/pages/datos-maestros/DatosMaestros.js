import React from "react";

import Materiales from "./Materiales";
import Clientes from "./Clientes";

const Tabs = ({ color }) => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
      <div className="w-screen ml-16">
        <div className="">
          <p className="text-gray-800 font-semibold text-xl uppercase bg-gray-200 text-center flex-auto px-5 py-5 rounded">
            Datos Maestros
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
                Materiales
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
                Clientes
              </a>
            </li>
          </ul>
          {/* <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded "> */}
          {/* <div className="px-2 py-5 flex-auto"> */}
          <div className="tab-content tab-space">
            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
              <Materiales />
            </div>
            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
              <Clientes />
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
