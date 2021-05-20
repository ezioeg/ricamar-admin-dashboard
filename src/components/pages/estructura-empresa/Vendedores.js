import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
// Para los Modales
import Rodal from "rodal";
import "rodal/lib/rodal.css";

import firebase from "../../../firebase"; //index
import GeneralContext from "../../../context/general/generalsContext";

import Vendedor from "../../ui/estructura-empresa/Vendedor";

const Vendedores = () => {
  const [vendedorInfo, setVendedorInfo] = useState([]);
  const [zonasInfo, setZonasInfo] = useState([]);
  const [visibleForm, setVisibleForm] = useState(false);
  const [visibleModalEliminar, setVisibleModalEliminar] = useState(false);
  const [q, setQ] = useState("");
  const { vendedorseleccionado, seleccionarVendedor } = useContext(
    GeneralContext
  );

  useEffect(() => {
    function manejarSnapshot(snapshot) {
      const vendedores = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      // almacenar los vendedores en el estado
      setVendedorInfo(vendedores);
    }

    function manejarSnapshot2(snapshot) {
      const zonas = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      // almacenar los vendedores en el estado
      setZonasInfo(zonas);
    }

    const unsubscribe = firebase.db
      .collection("vendedores")
      .onSnapshot(manejarSnapshot);

    const unsubscribe2 = firebase.db
      .collection("zonas")
      .onSnapshot(manejarSnapshot2);

    return () => {
      // Unmouting
      unsubscribe();
      unsubscribe2();
    };
  }, [vendedorseleccionado]); //vendedorseleccionado

  //Hook para redireccionar
  // const navigate = useNavigate();

  // Validacion y leer los datos del formulario
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id:
        !!vendedorseleccionado && !!vendedorseleccionado.id
          ? vendedorseleccionado.id
          : "",
      email:
        !!vendedorseleccionado && !!vendedorseleccionado.email
          ? vendedorseleccionado.email
          : "",
      descripcion:
        !!vendedorseleccionado && !!vendedorseleccionado.descripcion
          ? vendedorseleccionado.descripcion
          : "",
      usuario:
        !!vendedorseleccionado && !!vendedorseleccionado.usuario
          ? vendedorseleccionado.usuario
          : "",
      zona:
        !!vendedorseleccionado && !!vendedorseleccionado.zona
          ? vendedorseleccionado.zona
          : "",
    },
    validationSchema: Yup.object({
      id: Yup.string()
        .required("El id es obligatorio")
        .min(4, "El id debe tener 4 caracteres")
        .max(4, "El id debe tener 4 caracteres"),
      email: Yup.string()
        .email("Verifique que sea un email válido")
        .required("El email es obligatorio")
        .min(14, "El email no válido "),
      descripcion: Yup.string()
        .required("La descripción es obligatoria")
        .max(50, "La descripción debe tener maximo 50 caracteres"),
      usuario: Yup.string()
        .required("El usuario es obligatorio")
        .max(25, "El usuario debe tener maximo 25 caracteres"),
      zona: Yup.string().required("La zona es obligatoria"),
    }),
    onSubmit: (vendedor, { resetForm }) => {
      try {
        vendedorseleccionado !== null
          ? editarVendedor(vendedor)
          : agregarVendedor(vendedor);

        resetForm({ values: "" });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const agregarVendedor = async (vendedor) => {
    // Esconde el formulario
    setVisibleForm(false);

    await firebase.db.collection("vendedores").doc(vendedor.id).set({
      email: vendedor.email,
      descripcion: vendedor.descripcion,
      usuario: vendedor.usuario,
      zona: vendedor.zona,
    });

    // Redireccionar
    // navigate("/"); // vendedor
  };

  const editarVendedor = async (vendedor) => {
    // console.log(vendedorId);

    await firebase.db.collection("vendedores").doc(vendedor.id).update({
      email: vendedor.email,
      descripcion: vendedor.descripcion,
      usuario: vendedor.usuario,
      zona: vendedor.zona,
    });

    // Esconde el formulario
    setVisibleForm(false);
    // Redireccionar
    // navigate("/"); // vendedor
  };

  const eliminarVendedor = async () => {
    // try {
    await firebase.db
      .collection("vendedores")
      .doc(vendedorseleccionado.id)
      .delete();

    hideModalEliminarVendedor();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const mostrarFormVendedor = () => {
    // Esconde el formulario
    setVisibleForm(!visibleForm);
  };

  const mostrarForm = () => {
    // Esconde el formulario
    setVisibleForm(true);
  };

  function showModalEliminarVendedor() {
    setVisibleModalEliminar(true);
  }

  function hideModalEliminarVendedor() {
    setVisibleModalEliminar(false);
  }

  function search(rows) {
    return rows.filter(
      (row) =>
        row.id.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.email.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.descripcion.toString().toLowerCase().indexOf(q.toLowerCase()) >
          -1 ||
        row.usuario.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.zona.toString().toLowerCase().indexOf(q.toLowerCase()) > -1
    );
  }

  return (
    <div className="">
      {visibleForm && (
        <div className="bg-white shadow-xl rounded px-8 pt-6 pb-8 flex flex-col my-2">
          <form onSubmit={formik.handleSubmit}>
            <div className="-mx-3 md:flex mb-6 ">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="id"
                >
                  Id Vendedor
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                  id="id"
                  type="text"
                  placeholder="xxxx"
                  value={formik.values.id}
                  onChange={
                    vendedorseleccionado
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
              <div className="md:w-1/2 px-3 ">
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
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="descripcion"
                >
                  Descripción
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
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

              <div className="md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="usuario"
                >
                  Usuario
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                  id="usuario"
                  type="text"
                  placeholder=""
                  value={formik.values.usuario}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.usuario && formik.errors.usuario ? (
                  <div>
                    <p className="text-red-600 text-xs italic">
                      {formik.errors.usuario}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3">
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
            </div>

            <div className="flex justify-center ">
              <input
                type="submit"
                className="bg-blue-500 hover:bg-blue-400 mt-5 p-2 text-white uppercase font-bold text-sm rounded md:w-1/4"
                value={
                  vendedorseleccionado ? "Editar vendedor" : "Agregar vendedor"
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
                mostrarFormVendedor();
                seleccionarVendedor(null);
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
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 text-sm border border-gray-300 hidden lg:table-cell">
              ID
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-sm border-gray-300 hidden lg:table-cell">
              Descripción
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-sm border-gray-300 hidden lg:table-cell">
              Usuario
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-sm border-gray-300 hidden lg:table-cell">
              Zona
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-sm border-gray-300 hidden lg:table-cell">
              Email
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-sm border-gray-300 hidden lg:table-cell">
              Operación
            </th>
          </tr>
        </thead>

        {search(vendedorInfo)
          .sort(function (a, b) {
            // Ordena por id
            return a.id - b.id;
          })
          .map((vendedorInfo) => (
            <Vendedor
              key={vendedorInfo.id}
              vendedor={vendedorInfo}
              mostrarFormVendedor={() => mostrarForm()}
              mostrarModalEliminarVendedor={() => showModalEliminarVendedor()}
            />
          ))}
      </table>

      <div>
        <Rodal
          visible={visibleModalEliminar}
          onClose={() => hideModalEliminarVendedor()}
          width={300}
          height={150}
        >
          <p className="block text-white bg-blue-600 font-bold text-center mt-5 mb-5">
            Desea eliminar este item?
          </p>
          <div className="text-center">
            <button
              className="px-3 py-2 mr-2 border-red-600 -600 border text-red-600 -600 rounded transition duration-300 hover:bg-red-600 -600 hover:text-white focus:outline-none"
              onClick={() => eliminarVendedor()}
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

export default Vendedores;
