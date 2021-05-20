import React, { useContext } from "react";

import GeneralContext from "../../../context/general/generalsContext";

const Material = ({
  material,
  mostrarFormMaterial,
  mostrarModalEliminarMaterial,
}) => {
  const { seleccionarMaterial } = useContext(GeneralContext);

  return (
    <>
      <tbody>
        <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static  text-sm">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              ID
            </span>
            {material.id}
          </td>
          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static text-sm">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              Descripción
            </span>
            {material.descripcion}
          </td>

          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static text-sm">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              Marca
            </span>
            {material.marca}
          </td>

          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static text-sm">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              Medida
            </span>
            {material.medida}
          </td>

          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static text-sm">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              Grupo
            </span>
            {material.grupoarticulo}
          </td>

          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static text-sm">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              Múltiplo
            </span>
            {material.multiploventa}
          </td>

          {/* <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static text-sm">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              Clasificación
            </span>
            {material.clasificacion}
          </td> */}

          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static text-sm">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              Existencia
            </span>
            {material.existencia}
          </td>
          {/* 
          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static text-sm">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              Detalles
            </span>
            {material.detalles}
          </td> */}

          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static text-sm">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              USD 1
            </span>
            {material.preciousd1}
          </td>

          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static text-sm">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              USD 2
            </span>
            {material.preciousd2}
          </td>

          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static text-sm">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              USD 3
            </span>
            {material.preciousd3}
          </td>
          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static text-sm">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              USD 4
            </span>
            {material.preciousd4}
          </td>

          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static text-sm">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              Status
            </span>
            {material.status}
          </td>

          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static text-sm  ">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              Operación
            </span>
            <button
              className=" px-3 py-2 mr-2 border-blue-600 border text-blue-600 rounded transition duration-300 hover:bg-blue-600 hover:text-white focus:outline-none"
              onClick={() => {
                seleccionarMaterial(material);
                mostrarFormMaterial();
              }}
            >
              Editar
            </button>
            <button
              className=" px-3 py-2 font-bold  border-red-600 border text-red-600 rounded transition duration-300 hover:bg-red-600 hover:text-white focus:outline-none"
              onClick={() => {
                seleccionarMaterial(material);
                mostrarModalEliminarMaterial();
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

export default Material;
