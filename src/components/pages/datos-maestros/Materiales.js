import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
// Para los Modales
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import FileUploader from "react-firebase-file-uploader";

import firebase from "../../../firebase"; //index
import GeneralContext from "../../../context/general/generalsContext";

import Material from "../../ui/datos-maestros/Material";

const Materiales = () => {
  // State para la imagen
  const [subiendo, setSubiendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [urlimagen, setUrlimagen] = useState("");
  const [materialesInfo, setMateriales] = useState([]);
  const [marcasInfo, setMarcas] = useState([]);
  const [articulosInfo, setArticulos] = useState([]);
  const [medidasInfo, setMedidas] = useState([]);
  const [visibleForm, setVisibleForm] = useState(false);
  const [visibleModalEliminar, setVisibleModalEliminar] = useState(false);
  const [q, setQ] = useState("");
  const { materialseleccionado, seleccionarMaterial } = useContext(
    GeneralContext
  );

  //Mejorar
  useEffect(() => {
    function manejarSnapshot(snapshot) {
      const materiales = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      // Almacenar los materiales en el estado
      setMateriales(materiales);
    }

    function manejarSnapshot2(snapshot) {
      const marcas = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      // almacenar los vendedores en el estado
      setMarcas(marcas);
    }

    function manejarSnapshot3(snapshot) {
      const articulos = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      // almacenar los vendedores en el estado
      setArticulos(articulos);
    }

    function manejarSnapshot4(snapshot) {
      const medidas = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      // almacenar los vendedores en el estado
      setMedidas(medidas);
    }

    const unsubscribe = firebase.db
      .collection("materiales")
      .onSnapshot(manejarSnapshot);

    const unsubscribe2 = firebase.db
      .collection("marcas")
      .onSnapshot(manejarSnapshot2);

    const unsubscribe3 = firebase.db
      .collection("articulos")
      .onSnapshot(manejarSnapshot3);

    const unsubscribe4 = firebase.db
      .collection("medidas")
      .onSnapshot(manejarSnapshot4);

    return () => {
      // Unmouting
      unsubscribe();
      unsubscribe2();
      unsubscribe3();
      unsubscribe4();
    };
  }, [materialseleccionado]); //materialseleccionado

  // Para validar numeros unicos
  // const idRegExp = /\d{2}[-]\d{2}[-]\d{4}/;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id:
        !!materialseleccionado && !!materialseleccionado.id
          ? materialseleccionado.id
          : "",
      descripcion:
        !!materialseleccionado && !!materialseleccionado.descripcion
          ? materialseleccionado.descripcion
          : "",
      status:
        !!materialseleccionado && !!materialseleccionado.status
          ? materialseleccionado.status
          : "",
      marca:
        !!materialseleccionado && !!materialseleccionado.marca
          ? materialseleccionado.marca
          : "",
      medida:
        !!materialseleccionado && !!materialseleccionado.medida
          ? materialseleccionado.medida
          : "",
      grupoarticulo:
        !!materialseleccionado && !!materialseleccionado.grupoarticulo
          ? materialseleccionado.grupoarticulo
          : "",
      multiploventa:
        !!materialseleccionado && !!materialseleccionado.multiploventa
          ? materialseleccionado.multiploventa
          : "",
      clasificacion:
        !!materialseleccionado && !!materialseleccionado.clasificacion
          ? materialseleccionado.clasificacion
          : "",
      existencia:
        !!materialseleccionado && !!materialseleccionado.existencia
          ? materialseleccionado.existencia
          : "",
      preciousd1:
        !!materialseleccionado && !!materialseleccionado.preciousd1
          ? materialseleccionado.preciousd1
          : 0,
      preciousd2:
        !!materialseleccionado && !!materialseleccionado.preciousd2
          ? materialseleccionado.preciousd2
          : 0,
      preciousd3:
        !!materialseleccionado && !!materialseleccionado.preciousd3
          ? materialseleccionado.preciousd3
          : 0,
      preciousd4:
        !!materialseleccionado && !!materialseleccionado.preciousd4
          ? materialseleccionado.preciousd4
          : 0,
      imagen:
        !!materialseleccionado && !!materialseleccionado.imagen
          ? materialseleccionado.imagen
          : "",
      detalles:
        !!materialseleccionado && !!materialseleccionado.detalles
          ? materialseleccionado.detalles
          : "",
    },
    validationSchema: Yup.object({
      id: Yup.string()
        .required("El id es obligatorio")
        // .matches(idRegExp, "Id inválido")
        .min(10, "El id debe tener 10 caracteres")
        .max(14, "El id debe tener 14 caracteres"),
      descripcion: Yup.string()
        .required("La descripción es obligatoria")
        .max(55, "La descripción debe tener máximo 55 caracteres"),
      status: Yup.string().required("El status es obligatorio"),
      marca: Yup.string().required("La marca es obligatoria"),
      medida: Yup.string().required("La medida es obligatoria"),
      grupoarticulo: Yup.string().required(
        "El grupo de articulo es obligatorio"
      ),
      multiploventa: Yup.number()
        .required("El multiplo de venta es obligatorio")
        .min(0, "Minimo es 0")
        .max(100, "Máximo es 100")
        .integer("Tiene que ser entero"),
      clasificacion: Yup.number()
        .required("La clasificación es obligatoria")
        .min(0, "Minimo es 0")
        .max(100, "Máximo es 100")
        .integer("Tiene que ser entero"),
      existencia: Yup.number()
        .required("La existencia es obligatoria")
        .min(0, "Minimo es 0")
        .integer("Tiene que ser entero"),
      preciousd1: Yup.number()
        .required("El Precio USD 1 es obligatorio")
        .min(0, "Minimo es 0")
        .max(100, "Máximo es 100"),
      preciousd2: Yup.number()
        .required("El Precio USD 2 es obligatorio")
        .min(0, "Minimo es 0")
        .max(100, "Máximo es 100"),
      preciousd3: Yup.number()
        .required("El Precio VEF 1 es obligatorio")
        .min(0, "Minimo es 0")
        .max(100, "Máximo es 100"),
      preciousd4: Yup.number()
        .required("El Precio VEF 2 es obligatorio")
        .min(0, "Minimo es 0")
        .max(100, "Máximo es 100"),
      detalles: Yup.string().max(
        40,
        "Los detalles deben tener máximo 40 caracteres"
      ),
    }),
    onSubmit: (material, { resetForm }) => {
      try {
        materialseleccionado !== null
          ? editarMaterial(material)
          : agregarMaterial(material);

        resetForm({ values: "" });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const agregarMaterial = async (material) => {
    try {
      material.imagen = urlimagen;

      await firebase.db.collection("materiales").doc(material.id).set(material);

      // Esconde el formulario
      setVisibleForm(false);
    } catch (error) {
      console.log(error);
    }
    // Redireccionar
    // navigate("/"); // material
  };

  const editarMaterial = async (material) => {
    // Esconde el formulario
    setVisibleForm(false);
    material.imagen = urlimagen ? urlimagen : materialseleccionado.imagen;

    await firebase.db
      .collection("materiales")
      .doc(material.id)
      .update(material);

    // Redireccionar
    // navigate("/"); // material
  };

  const eliminarMaterial = async () => {
    // try {
    await firebase.db
      .collection("materiales")
      .doc(materialseleccionado.id)
      .delete();

    hideModalEliminarMaterial();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const mostrarFormMaterial = () => {
    // Esconde el formulario
    setVisibleForm(!visibleForm);
  };

  const mostrarForm = () => {
    // Esconde el formulario
    setVisibleForm(true);
  };

  function showModalEliminarMaterial() {
    setVisibleModalEliminar(true);
  }

  function hideModalEliminarMaterial() {
    setVisibleModalEliminar(false);
  }

  // Todo sobre las imagenes
  const handleUploadStart = () => {
    setProgreso(0);
    setSubiendo(true);
  };

  const handleUploadError = (error) => {
    setSubiendo(false);
    console.log(error);
  };

  const handleUploadSuccess = async (nombre) => {
    setProgreso(100);
    setSubiendo(false);

    // Almacenar la URL de destino
    const url = await firebase.storage
      .ref("productos")
      .child(nombre)
      .getDownloadURL();
    // console.log(url);
    setUrlimagen(url);
  };

  const handleProgress = (progreso) => {
    setProgreso(progreso);
    // console.log(progreso);
  };

  function search(rows) {
    return rows.filter(
      (row) =>
        row.id.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.descripcion.toString().toLowerCase().indexOf(q.toLowerCase()) >
          -1 ||
        row.marca.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.medida.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.grupoarticulo.toString().toLowerCase().indexOf(q.toLowerCase()) >
          -1 ||
        row.multiploventa.toString().toLowerCase().indexOf(q.toLowerCase()) >
          -1 ||
        row.existencia.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.preciousd1.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.preciousd2.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.preciousd3.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.preciousd4.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.status.toString().toLowerCase().indexOf(q.toLowerCase()) > -1
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
                  ID
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                  id="id"
                  type="text"
                  placeholder="xx-xx-xxxx"
                  value={formik.values.id}
                  onChange={
                    materialseleccionado
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

              <div className="md:w-2/6 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="grupoarticulo"
                >
                  Grupo de Articulo
                </label>
                <select
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 focus:outline-none focus:border-blue-500"
                  id="grupoarticulo"
                  value={formik.values.grupoarticulo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">--Seleccione--</option>

                  {articulosInfo
                    .sort(function (a, b) {
                      // Ordena por id
                      return a.id - b.id;
                    })
                    .map((articulosInfo) => (
                      <option
                        key={articulosInfo.id}
                        value={articulosInfo.descripcion}
                      >
                        {articulosInfo.id} - {articulosInfo.descripcion}
                      </option>
                    ))}
                </select>

                {formik.touched.grupoarticulo && formik.errors.grupoarticulo ? (
                  <div>
                    <p className="text-red-600 text-xs italic">
                      {formik.errors.grupoarticulo}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="md:w-1/6 px-3 ">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="marca"
                >
                  Marca
                </label>
                <select
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 focus:outline-none focus:border-blue-500"
                  id="marca"
                  value={formik.values.marca}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">--Seleccione--</option>

                  {marcasInfo
                    .sort(function (a, b) {
                      // Ordena por id
                      return a.id - b.id;
                    })
                    .map((marcasInfo) => (
                      <option
                        key={marcasInfo.id}
                        value={marcasInfo.descripcion}
                      >
                        {marcasInfo.id} - {marcasInfo.descripcion}
                      </option>
                    ))}
                </select>

                {formik.touched.marca && formik.errors.marca ? (
                  <div>
                    <p className="text-red-600 text-xs italic">
                      {formik.errors.marca}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/5 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="medida"
                >
                  Unidad de Medida
                </label>
                <select
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 focus:outline-none focus:border-blue-500"
                  id="medida"
                  value={formik.values.medida}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">--Seleccione--</option>

                  {medidasInfo
                    .sort(function (a, b) {
                      // Ordena por id
                      return a.id - b.id;
                    })
                    .map((medidasInfo) => (
                      <option
                        key={medidasInfo.id}
                        value={medidasInfo.descripcion}
                      >
                        {medidasInfo.id} - {medidasInfo.descripcion}
                      </option>
                    ))}
                </select>

                {formik.touched.medida && formik.errors.medida ? (
                  <div>
                    <p className="text-red-600 text-xs italic">
                      {formik.errors.medida}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="md:w-1/5 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="multiploventa"
                >
                  Múltiplo de Ventas
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                  id="multiploventa"
                  type="number"
                  placeholder=""
                  min="0"
                  max="100"
                  value={formik.values.multiploventa}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.multiploventa && formik.errors.multiploventa ? (
                  <div>
                    <p className="text-red-600 text-xs italic">
                      {formik.errors.multiploventa}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="md:w-1/5 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="clasificacion"
                >
                  Clasificación
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                  id="clasificacion"
                  type="number"
                  placeholder=""
                  min="0"
                  max="100"
                  value={formik.values.clasificacion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.clasificacion && formik.errors.clasificacion ? (
                  <div>
                    <p className="text-red-600 text-xs italic">
                      {formik.errors.clasificacion}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="md:w-1/5 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="existencia"
                >
                  Existencia
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                  id="existencia"
                  type="number"
                  placeholder=""
                  min="0"
                  value={formik.values.existencia}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.existencia && formik.errors.existencia ? (
                  <div>
                    <p className="text-red-600 text-xs italic">
                      {formik.errors.existencia}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="md:w-1/5 px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="status"
                >
                  Status
                </label>

                <select
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 focus:outline-none focus:border-blue-500"
                  id="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">--Seleccione--</option>
                  <option value="A">A: Activo</option>
                  <option value="I">I: Inactivo</option>
                </select>

                {formik.touched.status && formik.errors.status ? (
                  <div>
                    <p className="text-red-600 text-xs italic">
                      {formik.errors.status}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="preciousd1"
                >
                  Precio USD 1
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                  id="preciousd1"
                  type="number"
                  placeholder=""
                  step="0.01"
                  min="0"
                  max="100"
                  value={formik.values.preciousd1}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.preciousd1 && formik.errors.preciousd1 ? (
                  <div>
                    <p className="text-red-600 text-xs italic">
                      {formik.errors.preciousd1}
                    </p>
                  </div>
                ) : null}
              </div>
              <div className="md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="preciousd2"
                >
                  Precio USD 2
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                  id="preciousd2"
                  type="number"
                  placeholder=""
                  step="0.01"
                  min="0"
                  max="100"
                  value={formik.values.preciousd2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.preciousd2 && formik.errors.preciousd2 ? (
                  <div>
                    <p className="text-red-600 text-xs italic">
                      {formik.errors.preciousd2}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="preciousd3"
                >
                  Precio USD 3
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                  id="preciousd3"
                  type="number"
                  placeholder=""
                  step="0.01"
                  min="0"
                  max="100"
                  value={formik.values.preciousd3}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.preciousd3 && formik.errors.preciousd3 ? (
                  <div>
                    <p className="text-red-600 text-xs italic">
                      {formik.errors.preciousd3}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="preciousd4"
                >
                  Precio USD 4
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                  id="preciousd4"
                  type="number"
                  placeholder=""
                  step="0.01"
                  min="0"
                  max="100"
                  value={formik.values.preciousd4}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.preciousd4 && formik.errors.preciousd4 ? (
                  <div>
                    <p className="text-red-600 text-xs italic">
                      {formik.errors.preciousd4}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="-mx-3 md:flex ">
              <div className="md:w-2/5 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="imagen"
                >
                  Imagen del Producto
                </label>

                <FileUploader
                  accept="image/*"
                  id="imagen"
                  name="imagen"
                  // randomizeFilename
                  storageRef={firebase.storage.ref("productos")}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress={handleProgress}
                />

                {subiendo && (
                  <div className="h-12 relative w-full border">
                    <div
                      className="bg-green-500 absolute left-0 top-0 text-white px-2 uppercase text-xs font-bold h-12 flex items-center rounded"
                      style={{ width: `${progreso}%` }}
                    >
                      {progreso} %
                    </div>
                  </div>
                )}

                {urlimagen && (
                  <p className="bg-green-500 text-white p-3 text-center uppercase text-xs font-bold my-5 rounded">
                    La imagen se subio correctamente
                  </p>
                )}

                {materialseleccionado && (
                  <div className="flex justify-center">
                    <img
                      src={formik.values.imagen}
                      className="rounded-md h-48 w-48"
                      alt="imagen producto"
                    />
                  </div>
                )}
              </div>
              {/* 
              <div className="md:w-2/5 px-3 mb-6 md:mb-0 ">
                {subiendo && (
                  <div className="h-12 relative w-full border">
                    <div
                      className="bg-green-500 absolute left-0 top-0 text-white px-2 uppercase text-xs font-bold h-12 flex items-center rounded"
                      style={{ width: `${progreso}%` }}
                    >
                      {progreso} %
                    </div>
                  </div>
                )}
                {urlimagen && (
                  <p className="bg-green-500 text-white p-3 text-center uppercase text-xs font-bold my-5 rounded">
                    La imagen se subio correctamente
                  </p>
                )}
              </div> */}

              <div className="md:w-3/5 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="detalles"
                >
                  Detalles
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                  id="detalles"
                  type="text"
                  placeholder=""
                  value={formik.values.detalles}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.detalles && formik.errors.detalles ? (
                  <div>
                    <p className="text-red-600 text-xs italic">
                      {formik.errors.detalles}
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
                  materialseleccionado ? "Editar material" : "Agregar material"
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
                mostrarFormMaterial();
                seleccionarMaterial(null);
                setUrlimagen("");
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
              ID
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
              Descripción
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
              Marca
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
              Medida
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
              Grupo
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
              Múltiplo
            </th>
            {/* <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
              Clasificación
            </th> */}
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
              Existencia
            </th>
            {/* <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
              Detalles
            </th> */}
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
              USD 1
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
              USD 2
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
              USD 3
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
              USD 4
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
              Status
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-800 border text-xs border-gray-300 hidden lg:table-cell">
              Operación
            </th>
          </tr>
        </thead>

        {search(materialesInfo)
          .sort(function (a, b) {
            // Ordena por id
            return a.id - b.id;
          })
          .map((materialesInfo) => (
            <Material
              key={materialesInfo.id}
              material={materialesInfo}
              mostrarFormMaterial={() => mostrarForm()}
              mostrarModalEliminarMaterial={() => showModalEliminarMaterial()}
            />
          ))}
      </table>

      <div>
        <Rodal
          visible={visibleModalEliminar}
          onClose={() => hideModalEliminarMaterial()}
          width={300}
          height={150}
        >
          <p className="block text-white bg-blue-600 font-bold text-center mt-5 mb-5">
            Desea eliminar este item?
          </p>
          <div className="text-center">
            <button
              className="px-3 py-2 mr-2 border-red-600 -600 border text-red-600 -600 rounded transition duration-300 hover:bg-red-600 -600 hover:text-white focus:outline-none"
              onClick={() => eliminarMaterial()}
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

export default Materiales;
