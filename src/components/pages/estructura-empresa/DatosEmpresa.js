import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
// Para los Modales
import Rodal from "rodal";
import "rodal/lib/rodal.css";

import firebase from "../../../firebase"; //index
import GeneralContext from "../../../context/general/generalsContext";

import Empresa from "../../ui/estructura-empresa/Empresa";

const DatosEmpresa = () => {
  const [empresaInfo, setEmpresaInfo] = useState([]);
  const [visibleForm, setVisibleForm] = useState(false);
  const [visibleModalEliminar, setVisibleModalEliminar] = useState(false);
  const [q, setQ] = useState("");
  const { empresaseleccionada, seleccionarEmpresa } = useContext(
    GeneralContext
  );

  useEffect(() => {
    function manejarSnapshot(snapshot) {
      const empresas = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      // Almacenar los empresas en el estado
      setEmpresaInfo(empresas);
    }

    const unsubscribe = firebase.db
      .collection("empresas")
      .onSnapshot(manejarSnapshot);

    return () => {
      // Unmouting
      unsubscribe();
    };
  }, [empresaseleccionada]); //empresaseleccionada

  //Hook para redireccionar
  // const navigate = useNavigate();

  // Validacion rif y telefono
  const rifRegExp = /[J-V]\d{9}/;
  const phoneRegExp = /\d{4}[-]\d{7}/;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id:
        !!empresaseleccionada && !!empresaseleccionada.id
          ? empresaseleccionada.id
          : "",
      email:
        !!empresaseleccionada && !!empresaseleccionada.email
          ? empresaseleccionada.email
          : "",
      descripcion:
        !!empresaseleccionada && !!empresaseleccionada.descripcion
          ? empresaseleccionada.descripcion
          : "",
      direccion:
        !!empresaseleccionada && !!empresaseleccionada.direccion
          ? empresaseleccionada.direccion
          : "",
      telefono1:
        !!empresaseleccionada && !!empresaseleccionada.telefono1
          ? empresaseleccionada.telefono1
          : "",
      telefono2:
        !!empresaseleccionada && !!empresaseleccionada.telefono2
          ? empresaseleccionada.telefono2
          : "",
      telefono3:
        !!empresaseleccionada && !!empresaseleccionada.telefono3
          ? empresaseleccionada.telefono3
          : "",
    },
    validationSchema: Yup.object({
      id: Yup.string()
        .required("El rif es obligatorio")
        .matches(rifRegExp, "RIF inválido")
        .min(10, "El rif debe tener 10 caracteres")
        .max(10, "El rif debe tener 10 caracteres"),
      email: Yup.string()
        .required("El email es obligatorio")
        .email("Verifique que sea un email válido"),
      descripcion: Yup.string()
        .required("La descripción es obligatoria")
        .max(50, "La descripción debe tener máximo 50 caracteres"),
      direccion: Yup.string()
        .required("La dirección es obligatoria")
        .max(105, "La dirección debe tener máximo 105 caracteres"),
      telefono1: Yup.string()
        .required("El teléfono fijo es obligatorio")
        .matches(phoneRegExp, "Número telefónico inválido"),
      telefono2: Yup.string()
        .required("El teléfono celular es obligatorio")
        .matches(phoneRegExp, "Número telefónico inválido"),
      telefono3: Yup.string()
        .required("Otro teléfono celular es obligatorio")
        .matches(phoneRegExp, "Número telefónico inválido"),
    }),
    onSubmit: (empresa, { resetForm }) => {
      try {
        empresaseleccionada !== null
          ? editarEmpresa(empresa)
          : agregarEmpresa(empresa);

        resetForm({ values: "" });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const agregarEmpresa = async (empresa) => {
    // Esconde el formulario
    setVisibleForm(false);

    await firebase.db.collection("empresas").doc(empresa.id).set(empresa);

    // Redireccionar
    // navigate("/"); // empresa
  };

  const editarEmpresa = async (empresa) => {
    // Esconde el formulario
    setVisibleForm(false);

    await firebase.db.collection("empresas").doc(empresa.id).update(empresa);

    // Redireccionar
    // navigate("/"); // empresa
  };

  const eliminarEmpresa = async () => {
    // try {
    await firebase.db
      .collection("empresas")
      .doc(empresaseleccionada.id)
      .delete();

    hideModalEliminarEmpresa();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const mostrarFormEmpresa = () => {
    // Esconde el formulario
    setVisibleForm(!visibleForm);
  };

  const mostrarForm = () => {
    // Esconde el formulario
    setVisibleForm(true);
  };

  function showModalEliminarEmpresa() {
    setVisibleModalEliminar(true);
  }

  function hideModalEliminarEmpresa() {
    setVisibleModalEliminar(false);
  }

  function search(rows) {
    return rows.filter(
      (row) =>
        row.id.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.email.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.descripcion.toString().toLowerCase().indexOf(q.toLowerCase()) >
          -1 ||
        row.direccion.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.telefono1.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.telefono2.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.telefono3.toString().toLowerCase().indexOf(q.toLowerCase()) > -1
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
                  Rif
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                  id="id"
                  type="text"
                  placeholder="J123456789"
                  value={formik.values.id}
                  onChange={
                    empresaseleccionada
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
              <div className="md:w-full px-3">
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
            </div>

            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-full px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="direccion"
                >
                  Dirección
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
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
            <div className="-mx-3 md:flex mb-2">
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
                  Teléfono Celular 1
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
                  htmlFor="telefono3"
                >
                  Teléfono Celular 2
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                  id="telefono3"
                  type="text"
                  placeholder="0416-1232323"
                  value={formik.values.telefono3}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.telefono3 && formik.errors.telefono3 ? (
                  <div>
                    <p className="text-red-600 text-xs italic">
                      {formik.errors.telefono3}
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
                  empresaseleccionada ? "Editar empresa" : "Agregar empresa"
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
                mostrarFormEmpresa();
                seleccionarEmpresa(null);
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
              RIF
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-sm border-gray-300 hidden lg:table-cell">
              Descripción
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-sm border-gray-300 hidden lg:table-cell">
              Dirección
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-sm border-gray-300 hidden lg:table-cell">
              Teléfono 1
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-sm border-gray-300 hidden lg:table-cell">
              Teléfono 2
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-sm border-gray-300 hidden lg:table-cell">
              Teléfono 3
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-sm border-gray-300 hidden lg:table-cell">
              Email
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-sm border-gray-300 hidden lg:table-cell">
              Operación
            </th>
          </tr>
        </thead>

        {search(empresaInfo)
          .sort(function (a, b) {
            // Ordena por id
            return a.id - b.id;
          })
          .map((empresaInfo) => (
            <Empresa
              key={empresaInfo.id}
              empresa={empresaInfo}
              mostrarFormEmpresa={() => mostrarForm()}
              mostrarModalEliminarEmpresa={() => showModalEliminarEmpresa()}
            />
          ))}
      </table>

      <div>
        <Rodal
          visible={visibleModalEliminar}
          onClose={() => hideModalEliminarEmpresa()}
          width={300}
          height={150}
        >
          <p className="block text-white bg-blue-600 font-bold text-center mt-5 mb-5">
            Desea eliminar este item?
          </p>
          <div className="text-center">
            <button
              className="px-3 py-2 mr-2 border-red-600 -600 border text-red-600 -600 rounded transition duration-300 hover:bg-red-600 -600 hover:text-white focus:outline-none"
              onClick={() => eliminarEmpresa()}
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

export default DatosEmpresa;
