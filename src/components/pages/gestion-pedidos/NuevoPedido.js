import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";

// Para los Modales
import Rodal from "rodal";
import "rodal/lib/rodal.css";

import firebase from "../../../firebase"; //index
import GeneralContext from "../../../context/general/generalsContext";

import CrearPedido from "../../ui/gestion-pedidos/CrearPedido";
import PedidoCreado from "../../ui/gestion-pedidos/PedidoCreado";
import EditarPedido from "../../ui/gestion-pedidos/EditarPedido";

const NuevoPedido = () => {
  const [nuevosPedidosInfo, setNuevosPedidos] = useState([]);
  const [visibleTable, setVisibleTable] = useState(false);
  const [visibleForm, setVisibleForm] = useState(false);
  const [visibleEditForm, setVisibleEditForm] = useState(false);
  const [visibleModalEliminar, setVisibleModalEliminar] = useState(false);
  const [q, setQ] = useState("");

  const {
    nuevopedidoseleccionado,
    seleccionarNuevoPedido,
    // cantidadTotal,
    // cantidadtotal,
  } = useContext(GeneralContext);

  //Mejorar
  useEffect(() => {
    function manejarSnapshot(snapshot) {
      const nuevosPedidos = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setNuevosPedidos(nuevosPedidos);
    }

    const unsubscribe = firebase.db
      .collection("pedidos")
      .onSnapshot(manejarSnapshot);

    return () => {
      // Unmouting
      unsubscribe();
    };
  }, [nuevopedidoseleccionado]); //nuevopedidoseleccionado

  const eliminarPedido = async () => {
    // try {
    await firebase.db
      .collection("pedidos")
      .doc(nuevopedidoseleccionado.id)
      .delete();

    hideModalEliminarPedido();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const mostrarCrearFormPedido = () => {
    // Esconde el formulario
    setVisibleForm(!visibleForm);
    setVisibleTable(!visibleTable);
  };

  const mostrarEditarFormPedido = () => {
    // Esconde el formulario
    setVisibleEditForm(!visibleEditForm);
    setVisibleTable(!visibleTable);
  };

  function showModalEliminarPedido() {
    setVisibleModalEliminar(true);
  }

  function hideModalEliminarPedido() {
    setVisibleModalEliminar(false);
  }

  function search(rows) {
    return rows.filter(
      (row) =>
        row.id.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.status.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.cliente.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.vendedor.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.subtotal.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.total.toString().toLowerCase().indexOf(q.toLowerCase()) > -1
    );
  }

  return (
    <div className="">
      {visibleForm && (
        <CrearPedido mostrarCrearFormPedido={() => mostrarCrearFormPedido()} />
      )}

      {visibleEditForm && (
        <EditarPedido
          mostrarEditarFormPedido={() => mostrarEditarFormPedido()}
        />
      )}

      {!visibleTable && (
        <>
          <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white">
            <div className="flex justify-between">
              <div className="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
                <div className="flex flex-wrap items-stretch w-full h-full mb-6 relative">
                  <div className="flex">
                    <span className="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                      <svg
                        width="18"
                        height="18"
                        className="w-4 lg:w-auto"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z"
                          stroke="#455A64"
                          // stroke-linecap="round"
                          // stroke-linejoin="round"
                        />
                        <path
                          d="M16.9993 16.9993L13.1328 13.1328"
                          stroke="#455A64"
                          // stroke-linecap="round"
                          // stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none lg:text-md text-gray-800"
                    placeholder="Buscar"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                  />
                </div>
              </div>

              <div className=" w-5/12 text-left text-xl text-orange-600 flex items-center justify-end ">
                <button
                  className=" font-bold flex justify-center items-center h-10 w-10 border-blue-600 border-2 text-blue-600 rounded-full transition duration-300 hover:bg-blue-600 hover:text-white focus:outline-none"
                  onClick={() => {
                    mostrarCrearFormPedido();
                    seleccionarNuevoPedido(null);
                  }}
                >
                  {!visibleForm ? "+" : "-"}
                </button>
              </div>
            </div>
          </div>

          <table className="border-collapse w-full shadow-xl rounded-lg">
            <thead>
              <tr>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 text-xs border border-gray-300 hidden lg:table-cell">
                  Pedido
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
                  Fecha
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
                  Status
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
                  Cliente
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
                  Vendedor
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
                  Subtotal
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
                  Descuento
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
                  Impuesto
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
                  Total
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
                  Operación
                </th>
              </tr>
            </thead>

            {search(nuevosPedidosInfo)
              .sort(function (a, b) {
                // Ordena por fecha
                return new Date(b.fecha) - new Date(a.fecha);
              })
              .map((nuevosPedidosInfo) => (
                <PedidoCreado
                  key={nuevosPedidosInfo.id}
                  nuevopedido={nuevosPedidosInfo}
                  mostrarEditarFormPedido={() => mostrarEditarFormPedido()}
                  mostrarModalEliminarPedido={() => showModalEliminarPedido()}
                />
              ))}
          </table>

          <div>
            <Rodal
              visible={visibleModalEliminar}
              onClose={() => hideModalEliminarPedido()}
              width={300}
              height={150}
            >
              <p className="block text-white bg-blue-600 font-bold text-center mt-5 mb-5">
                Desea eliminar este item?
              </p>
              <div className="text-center">
                <button
                  className="px-3 py-2 mr-2 border-red-600 -600 border text-red-600 -600 rounded transition duration-300 hover:bg-red-600 -600 hover:text-white focus:outline-none"
                  onClick={() => eliminarPedido()}
                >
                  {" "}
                  Eliminar
                </button>
              </div>
            </Rodal>
          </div>
        </>
      )}
    </div>
  );
};

export default NuevoPedido;
