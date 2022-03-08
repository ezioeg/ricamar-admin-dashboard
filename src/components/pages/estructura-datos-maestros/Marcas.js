import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
// Para los Modales
import Rodal from "rodal";
import "rodal/lib/rodal.css";

import firebase from "../../../firebase"; //index
import GeneralContext from "../../../context/general/generalsContext";

import Marca from "../../ui/estructura-datos-maestros/Marca";

const Marcas = () => {
  const [marcasInfo, setMarcasInfo] = useState([]);
  const [visibleForm, setVisibleForm] = useState(false);
  const [visibleModalEliminar, setVisibleModalEliminar] = useState(false);
  const [q, setQ] = useState("");
  const { marcaseleccionada, seleccionarMarca } = useContext(GeneralContext);

  useEffect(() => {
    function manejarSnapshot(snapshot) {
      const marcas = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      // Almacenar los marcas en el estado
      setMarcasInfo(marcas);
    }

    const unsubscribe = firebase.db
      .collection("marcas")
      .onSnapshot(manejarSnapshot);

    return () => {
      // Unmouting
      unsubscribe();
    };
  }, [marcaseleccionada]); //marcaseleccionada

  // Validacion y leer los datos del formulario
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id:
        !!marcaseleccionada && !!marcaseleccionada.id
          ? marcaseleccionada.id
          : "",
      descripcion:
        !!marcaseleccionada && !!marcaseleccionada.descripcion
          ? marcaseleccionada.descripcion
          : "",
    },
    validationSchema: Yup.object({
      id: Yup.string()
        .required("El id es obligatorio")
        .min(2, "El id debe tener 2 caracteres")
        .max(2, "El id debe tener 2 caracteres"),
      descripcion: Yup.string()
        .required("La descripción es obligatoria")
        .min(5, "La descripción debe tener al menos 5 caracteres")
        .max(30, "La descripción debe tener máximo 30 caracteres"),
    }),
    onSubmit: (marca, { resetForm }) => {
      try {
        marcaseleccionada !== null ? editarMarca(marca) : agregarMarca(marca);

        resetForm({ values: "" });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const agregarMarca = async (marca) => {
    // Esconde el formulario
    setVisibleForm(false);

    await firebase.db
      .collection("marcas")
      .doc(marca.id)
      .set({ descripcion: marca.descripcion });

    // Redireccionar
    // navigate("/"); // marca
  };

  const editarMarca = async (marca) => {
    // console.log(marcaId);

    await firebase.db
      .collection("marcas")
      .doc(marca.id)
      .update({ descripcion: marca.descripcion });

    // Esconde el formulario
    setVisibleForm(false);
    // Redireccionar
    // navigate("/"); // marca
  };

  const eliminarMarca = async () => {
    // try {
    await firebase.db.collection("marcas").doc(marcaseleccionada.id).delete();

    hideModalEliminarMarca();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const mostrarFormMarca = () => {
    // Esconde el formulario
    setVisibleForm(!visibleForm);
  };

  const mostrarForm = () => {
    // Esconde el formulario
    setVisibleForm(true);
  };

  function showModalEliminarMarca() {
    setVisibleModalEliminar(true);
  }

  function hideModalEliminarMarca() {
    setVisibleModalEliminar(false);
  }

  function search(rows) {
    return rows.filter(
      (row) =>
        row.id.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.descripcion.toString().toLowerCase().indexOf(q.toLowerCase()) > -1
    );
  }

  return (
    <div className=" ">
      {visibleForm && (
        <div className="bg-white shadow-xl rounded px-8 pt-6 pb-8 flex flex-col my-2">
          <form onSubmit={formik.handleSubmit}>
            <div className="-mx-3 md:flex mb-6 ">
              <div className="md:w-1/5 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="id"
                >
                  Id
                </label>

                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                  id="id"
                  type="text"
                  placeholder="xx"
                  value={formik.values.id}
                  onChange={
                    marcaseleccionada
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

              <div className="md:w-4/5 px-3">
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

            <div className="flex justify-center ">
              <input
                type="submit"
                className="bg-blue-500 hover:bg-blue-400 mt-5 p-2 text-white uppercase font-bold text-sm rounded md:w-1/4"
                value={marcaseleccionada ? "Editar marca" : "Agregar marca"}
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
                mostrarFormMarca();
                seleccionarMarca(null);
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
              Operación
            </th>
          </tr>
        </thead>

        {search(marcasInfo)
          .sort(function (a, b) {
            // Ordena por id
            return a.id - b.id;
          })
          .map((marcasInfo) => (
            <Marca
              key={marcasInfo.id}
              marca={marcasInfo}
              mostrarFormMarca={() => mostrarForm()}
              mostrarModalEliminarMarca={() => showModalEliminarMarca()}
            />
          ))}
      </table>

      <div>
        <Rodal
          visible={visibleModalEliminar}
          onClose={() => hideModalEliminarMarca()}
          width={300}
          height={150}
        >
          <p className="block text-white bg-blue-600 font-bold text-center mt-5 mb-5">
            Desea eliminar este item?
          </p>
          <div className="text-center">
            <button
              className="px-3 py-2 mr-2 border-red-600 -600 border text-red-600 -600 rounded transition duration-300 hover:bg-red-600 -600 hover:text-white focus:outline-none"
              onClick={() => eliminarMarca()}
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

export default Marcas;
