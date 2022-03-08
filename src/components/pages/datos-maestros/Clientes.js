import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
// Para los Modales
import Rodal from "rodal";
import "rodal/lib/rodal.css";

import firebase from "../../../firebase"; //index
import GeneralContext from "../../../context/general/generalsContext";

import Cliente from "../../ui/datos-maestros/Cliente";

const Clientes = () => {
  const [clientesInfo, setClientes] = useState([]);
  const [impuestosInfo, setImpuestos] = useState([]);
  const [retencionesInfo, setRetenciones] = useState([]);
  const [zonasInfo, setZonas] = useState([]);
  const [preciosInfo, setPrecios] = useState([]);
  const [vendedoresInfo, setVendedores] = useState([]);
  const [visibleForm, setVisibleForm] = useState(false);
  const [visibleModalEliminar, setVisibleModalEliminar] = useState(false);
  const [q, setQ] = useState("");
  const { clienteseleccionado, seleccionarCliente } = useContext(
    GeneralContext
  );

  //Mejorar
  useEffect(() => {
    function manejarSnapshot(snapshot) {
      const clientes = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      // Almacenar los clientes en el estado
      setClientes(clientes);
    }

    function manejarSnapshot2(snapshot) {
      const impuestos = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      // almacenar los vendedores en el estado
      setImpuestos(impuestos);
    }

    function manejarSnapshot3(snapshot) {
      const retenciones = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      // almacenar los vendedores en el estado
      setRetenciones(retenciones);
    }

    function manejarSnapshot4(snapshot) {
      const zonas = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      // almacenar los vendedores en el estado
      setZonas(zonas);
    }

    function manejarSnapshot5(snapshot) {
      const precios = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      // almacenar los vendedores en el estado
      setPrecios(precios);
    }

    function manejarSnapshot6(snapshot) {
      const vendedores = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      // almacenar los vendedores en el estado
      setVendedores(vendedores);
    }

    const unsubscribe = firebase.db
      .collection("clientes")
      .onSnapshot(manejarSnapshot);

    const unsubscribe2 = firebase.db
      .collection("impuestos")
      .onSnapshot(manejarSnapshot2);

    const unsubscribe3 = firebase.db
      .collection("retenciones")
      .onSnapshot(manejarSnapshot3);

    const unsubscribe4 = firebase.db
      .collection("zonas")
      .onSnapshot(manejarSnapshot4);

    const unsubscribe5 = firebase.db
      .collection("precios")
      .onSnapshot(manejarSnapshot5);

    const unsubscribe6 = firebase.db
      .collection("vendedores")
      .onSnapshot(manejarSnapshot6);

    return () => {
      // Unmouting
      unsubscribe();
      unsubscribe2();
      unsubscribe3();
      unsubscribe4();
      unsubscribe5();
      unsubscribe6();
    };
  }, [clienteseleccionado]); //clienteseleccionado

  // Para validar rif y telefono
  const rifRegExp = /[J-V]\d{9}/;
  const phoneRegExp = /\d{4}[-]\d{7}/;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id:
        !!clienteseleccionado && !!clienteseleccionado.id
          ? clienteseleccionado.id
          : "",
      descripcion:
        !!clienteseleccionado && !!clienteseleccionado.descripcion
          ? clienteseleccionado.descripcion
          : "",
      direccion:
        !!clienteseleccionado && !!clienteseleccionado.direccion
          ? clienteseleccionado.direccion
          : "",
      telefono1:
        !!clienteseleccionado && !!clienteseleccionado.telefono1
          ? clienteseleccionado.telefono1
          : "",
      telefono2:
        !!clienteseleccionado && !!clienteseleccionado.telefono2
          ? clienteseleccionado.telefono2
          : "",
      email:
        !!clienteseleccionado && !!clienteseleccionado.email
          ? clienteseleccionado.email
          : "",
      impuesto:
        !!clienteseleccionado && !!clienteseleccionado.impuesto
          ? clienteseleccionado.impuesto
          : "",
      retencion:
        !!clienteseleccionado && !!clienteseleccionado.retencion
          ? clienteseleccionado.retencion
          : "",
      zona:
        !!clienteseleccionado && !!clienteseleccionado.zona
          ? clienteseleccionado.zona
          : "",
      precio:
        !!clienteseleccionado && !!clienteseleccionado.precio
          ? clienteseleccionado.precio
          : "",
    },
    validationSchema: Yup.object({
      id: Yup.string()
        .required("El id es obligatorio")
        .matches(rifRegExp, "Id inválido")
        .min(10, "El id debe tener 10 caracteres")
        .max(10, "El id debe tener 10 caracteres"),
      descripcion: Yup.string()
        .required("La descripción es obligatoria")
        .max(100, "La descripción debe tener máximo 100 caracteres"),
      direccion: Yup.string()
        .required("La dirección es obligatoria")
        .max(125, "La dirección debe tener máximo 105 caracteres"),
      telefono1: Yup.string()
        .required("El teléfono fijo es obligatorio")
        .matches(phoneRegExp, "Número telefónico inválido"),
      telefono2: Yup.string()
        .required("El teléfono celular es obligatorio")
        .matches(phoneRegExp, "Número telefónico inválido"),
      email: Yup.string()
        .required("El email es obligatorio")
        .email("Verifique que sea un email válido"),
      impuesto: Yup.string().required("El impuesto es obligatorio"),
      retencion: Yup.string().required("La retención es obligatoria"),
      zona: Yup.string().required("La zona es obligatoria"),
      precio: Yup.string().required("El tipo de precio es obligatorio"),
    }),
    onSubmit: (cliente, { resetForm }) => {
      // Se asigna un vendedor a un cliente si tienen la misma zona
      const vendedor = vendedoresInfo.find(
        (vendedor) => vendedor.zona === cliente.zona
      );

      // Se asigna un precio a un cliente segun la zona
      const precioAsignado = preciosInfo.find(
        (precio) => precio.descripcion === cliente.precio
      );

      // console.log(vendedor);
      // console.log(precioasignado);
      cliente.vendedor = vendedor;
      cliente.precioasignado = precioAsignado;

      try {
        clienteseleccionado !== null
          ? editarCliente(cliente)
          : agregarCliente(cliente);

        resetForm({ values: "" });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const agregarCliente = async (cliente) => {
    // try {
    await firebase.db.collection("clientes").doc(cliente.id).set(cliente);

    // Esconde el formulario
    setVisibleForm(false);
    // } catch (error) {
    //   console.log(error);
    // }
    // Redireccionar
    // navigate("/"); // cliente
  };

  const editarCliente = async (cliente) => {
    // Esconde el formulario
    setVisibleForm(false);

    await firebase.db.collection("clientes").doc(cliente.id).update(cliente);

    // Redireccionar
    // navigate("/"); // cliente
  };

  const eliminarCliente = async () => {
    // try {
    await firebase.db
      .collection("clientes")
      .doc(clienteseleccionado.id)
      .delete();

    hideModalEliminarCliente();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const mostrarFormCliente = () => {
    // Esconde el formulario
    setVisibleForm(!visibleForm);
  };

  const mostrarForm = () => {
    // Esconde el formulario
    setVisibleForm(true);
  };

  function showModalEliminarCliente() {
    setVisibleModalEliminar(true);
  }

  function hideModalEliminarCliente() {
    setVisibleModalEliminar(false);
  }

  function search(rows) {
    return rows.filter(
      (row) =>
        row.id.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.descripcion.toString().toLowerCase().indexOf(q.toLowerCase()) >
          -1 ||
        row.telefono1.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.telefono2.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.email.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.impuesto.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.retencion.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.zona.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.precio.toString().toLowerCase().indexOf(q.toLowerCase()) > -1
    );
  }

  return (
    <div className="">
      {visibleForm && (
        <div className="bg-white shadow-xl rounded px-8 pt-6 pb-8 flex flex-col my-2">
          <form onSubmit={formik.handleSubmit}>
            <div className="-mx-3 md:flex mb-6 ">
              <div className="md:w-1/6 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="id"
                >
                  RIF
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                  id="id"
                  type="text"
                  placeholder="J123456789"
                  value={formik.values.id}
                  onChange={
                    clienteseleccionado
                      ? () => formik.values.id
                      : formik.handleChange
                  } // No se puede editar id
                  onBlur={formik.handleBlur}
                />

                {formik.touched.id && formik.errors.id ? (
                  <div>
                    <p className="text-red-600 text-xs italic">
                      {formik.errors.id}
                    </p>
                  </div>
                ) : null}
              </div>
              <div className="md:w-2/6 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="descripcion"
                >
                  Descripción
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                  id="descripcion"
                  type="text"
                  placeholder=""
                  value={formik.values.descripcion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.descripcion && formik.errors.descripcion ? (
                  <div>
                    <p className="text-red-600 text-xs italic">
                      {formik.errors.descripcion}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="md:w-3/6 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="direccion"
                >
                  Dirección
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                  id="direccion"
                  type="text"
                  placeholder=""
                  value={formik.values.direccion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.direccion && formik.errors.direccion ? (
                  <div>
                    <p className="text-red-600 text-xs italic">
                      {formik.errors.direccion}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="-mx-3 md:flex mb-6 ">
              <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="telefono1"
                >
                  Teléfono fijo
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                  id="telefono1"
                  type="text"
                  placeholder="0212-1232323"
                  value={formik.values.telefono1}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.telefono1 && formik.errors.telefono1 ? (
                  <div>
                    <p className="text-red-600 text-xs italic">
                      {formik.errors.telefono1}
                    </p>
                  </div>
                ) : null}
              </div>
              <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="telefono2"
                >
                  Teléfono Celular
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                  id="telefono2"
                  type="text"
                  placeholder="0412-1232323"
                  value={formik.values.telefono2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.telefono2 && formik.errors.telefono2 ? (
                  <div>
                    <p className="text-red-600 text-xs italic">
                      {formik.errors.telefono2}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                  id="email"
                  type="text"
                  placeholder="JohnDoe@gmail.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.email && formik.errors.email ? (
                  <div>
                    <p className="text-red-600 text-xs italic">
                      {formik.errors.email}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="impuesto"
                >
                  Indicador de impuesto
                </label>
                <select
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 focus:outline-none focus:border-blue-500"
                  id="impuesto"
                  value={formik.values.impuesto}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">--Seleccione--</option>

                  {impuestosInfo
                    .sort(function (a, b) {
                      // Ordena por id
                      return a.id - b.id;
                    })
                    .map((impuestosInfo) => (
                      <option
                        key={impuestosInfo.id}
                        //antes descripcion
                        value={impuestosInfo.impuesto}
                      >
                        {impuestosInfo.id} - {impuestosInfo.descripcion}
                      </option>
                    ))}
                </select>

                {formik.touched.impuesto && formik.errors.impuesto ? (
                  <div>
                    <p className="text-red-600 text-xs italic">
                      {formik.errors.impuesto}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="retencion"
                >
                  Indicador de retención
                </label>
                <select
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 focus:outline-none focus:border-blue-500"
                  id="retencion"
                  value={formik.values.retencion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">--Seleccione--</option>

                  {retencionesInfo
                    .sort(function (a, b) {
                      // Ordena por id
                      return a.id - b.id;
                    })
                    .map((retencionesInfo) => (
                      <option
                        key={retencionesInfo.id}
                        //antes descripcion
                        value={retencionesInfo.retencion}
                      >
                        {retencionesInfo.id} - {retencionesInfo.descripcion}
                      </option>
                    ))}
                </select>

                {formik.touched.retencion && formik.errors.retencion ? (
                  <div>
                    <p className="text-red-600 text-xs italic">
                      {formik.errors.retencion}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="zona"
                >
                  Zona
                </label>
                <select
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 focus:outline-none focus:border-blue-500"
                  id="zona"
                  value={formik.values.zona}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">--Seleccione--</option>

                  {zonasInfo
                    .sort(function (a, b) {
                      // Ordena por id
                      return a.id - b.id;
                    })
                    .map((zonasInfo) => (
                      <option key={zonasInfo.id} value={zonasInfo.descripcion}>
                        {zonasInfo.id} - {zonasInfo.descripcion}
                      </option>
                    ))}
                </select>

                {formik.touched.zona && formik.errors.zona ? (
                  <div>
                    <p className="text-red-600 text-xs italic">
                      {formik.errors.zona}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="precio"
                >
                  Lista de precios
                </label>
                <select
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 focus:outline-none focus:border-blue-500"
                  id="precio"
                  value={formik.values.precio}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">--Seleccione--</option>

                  {preciosInfo
                    .sort(function (a, b) {
                      // Ordena por id
                      return a.id - b.id;
                    })
                    .map((preciosInfo) => (
                      <option
                        key={preciosInfo.id}
                        value={preciosInfo.descripcion}
                      >
                        {preciosInfo.id} - {preciosInfo.descripcion}
                      </option>
                    ))}
                </select>

                {formik.touched.precio && formik.errors.precio ? (
                  <div>
                    <p className="text-red-600 text-xs italic">
                      {formik.errors.precio}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex justify-center ">
              <input
                type="submit"
                className="bg-blue-500 hover:bg-blue-400 mt-5 p-2 text-white uppercase font-bold text-sm rounded md:w-1/4"
                value={
                  clienteseleccionado ? "Editar cliente" : "Agregar cliente"
                }
              />
            </div>
          </form>
        </div>
      )}

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
                mostrarFormCliente();
                seleccionarCliente(null);
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
              RIF
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
              Descripción
            </th>
            {/* <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
              Dirección
            </th> */}
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
              Teléfono 1
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
              Teléfono 2
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
              Email
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
              Impuesto
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
              Retención
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
              Zona
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
              Precios
            </th>

            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
              Operación
            </th>
          </tr>
        </thead>

        {search(clientesInfo)
          .sort(function (a, b) {
            // Ordena por id
            return a.id - b.id;
          })
          .map((clientesInfo) => (
            <Cliente
              key={clientesInfo.id}
              cliente={clientesInfo}
              mostrarFormCliente={() => mostrarForm()}
              mostrarModalEliminarCliente={() => showModalEliminarCliente()}
            />
          ))}
      </table>

      <div>
        <Rodal
          visible={visibleModalEliminar}
          onClose={() => hideModalEliminarCliente()}
          width={300}
          height={150}
        >
          <p className="block text-white bg-blue-600 font-bold text-center mt-5 mb-5">
            Desea eliminar este item?
          </p>
          <div className="text-center">
            <button
              className="px-3 py-2 mr-2 border-red-600 -600 border text-red-600 -600 rounded transition duration-300 hover:bg-red-600 -600 hover:text-white focus:outline-none"
              onClick={() => eliminarCliente()}
            >
              {" "}
              Eliminar
            </button>
          </div>
        </Rodal>
      </div>
    </div>
  );
};

export default Clientes;
