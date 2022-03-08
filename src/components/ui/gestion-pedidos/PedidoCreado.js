import React, { useContext } from "react";

import GeneralContext from "../../../context/general/generalsContext";

const PedidoCreado = ({
  nuevopedido,
  mostrarEditarFormPedido,
  mostrarModalEliminarPedido,
}) => {
  const { seleccionarNuevoPedido } = useContext(GeneralContext);

  return (
    <>
      <tbody>
        <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static  text-sm">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              Pedido
            </span>
            {nuevopedido.id}
          </td>
          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static text-sm">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              Fecha
            </span>
            {new Date(nuevopedido.fecha).toLocaleDateString("es-ES")}{" "}
            {new Date(nuevopedido.fecha).toLocaleTimeString([], {
              timeStyle: "short",
            })}
          </td>

          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static text-sm">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              Status
            </span>
            {nuevopedido.status}
          </td>

          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static text-sm">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              Cliente
            </span>
            {nuevopedido.cliente}
          </td>

          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static text-sm">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              Vendedor
            </span>
            {nuevopedido.vendedor}
          </td>

          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static text-sm">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              Subtotal
            </span>
            {nuevopedido.subtotal.toFixed(2)}
          </td>

          {nuevopedido.descuentoporcentual ? (
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static text-sm">
              <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
                Descuento
              </span>
              {nuevopedido.descuentoporcentual}
            </td>
          ) : (
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static text-sm">
              <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
                Descuento
              </span>
              {nuevopedido.descuentovalor}
            </td>
          )}

          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static text-sm">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              Impuesto
            </span>
            {nuevopedido.iva.toFixed(2)}
          </td>
          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static text-sm">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              Total
            </span>
            {nuevopedido.total.toFixed(2)}
          </td>

          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static text-sm px-6">
            <span className="lg:hidden absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
              Operación
            </span>
            <button
              className=" px-3 py-2 mr-2 border-blue-600 border text-blue-600 rounded transition duration-300 hover:bg-blue-600 hover:text-white focus:outline-none"
              onClick={() => {
                seleccionarNuevoPedido(nuevopedido);
                mostrarEditarFormPedido();
              }}
            >
              Editar
            </button>
            <button
              className=" px-3 py-2 font-bold  border-red-600 border text-red-600 rounded transition duration-300 hover:bg-red-600 hover:text-white focus:outline-none"
              onClick={() => {
                seleccionarNuevoPedido(nuevopedido);
                mostrarModalEliminarPedido();
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

export default PedidoCreado;
