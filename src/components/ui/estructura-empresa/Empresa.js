import React, { useContext } from "react";

import GeneralContext from "../../../context/general/generalsContext";

const Empresa = ({
  empresa,
  mostrarFormEmpresa,
  mostrarModalEliminarEmpresa,
}) => {
  const { seleccionarEmpresa } = useContext(GeneralContext);

  return (
    <>
      <tbody>
        <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static  text-sm">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              RIF
            </span>
            {empresa.id}
          </td>
          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static text-sm">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              Descripción
            </span>
            {empresa.descripcion}
          </td>

          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static text-sm">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              Dirección
            </span>
            {empresa.direccion}
          </td>

          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static text-sm">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              Teléfono 1
            </span>
            {empresa.telefono1}
          </td>

          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static text-sm">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              Teléfono 2
            </span>
            {empresa.telefono2}
          </td>

          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static text-sm">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              Teléfono 3
            </span>
            {empresa.telefono3}
          </td>

          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static text-sm">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              Email
            </span>
            {empresa.email}
          </td>

          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static text-sm  ">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              Operación
            </span>
            <button
              className=" px-3 py-2 mr-2 border-blue-600 border text-blue-600 rounded transition duration-300 hover:bg-blue-600 hover:text-white focus:outline-none"
              onClick={() => {
                seleccionarEmpresa(empresa);
                mostrarFormEmpresa();
              }}
            >
              Editar
            </button>
            <button
              className=" px-3 py-2 font-bold  border-red-600 border text-red-600 rounded transition duration-300 hover:bg-red-600 hover:text-white focus:outline-none"
              onClick={() => {
                seleccionarEmpresa(empresa);
                mostrarModalEliminarEmpresa();
              }}
            >
              -
            </button>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default Empresa;
