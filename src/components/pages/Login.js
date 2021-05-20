import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import firebase from "../../firebase"; //index
// import { useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show] = useState(true);
  // const navigate = useNavigate();

  // Validacion y leer los datos del formulario
  const formik = useFormik({
    initialValues: {
      nombre: "",
      contrasena: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        // .min(10, "Debe tener al menos 10 caracteres")
        .required("Este campo es requerido"),
      contrasena: Yup.string()
        // .min(6, "La contrasena debe tener al menos 6 caracteres")
        .required("La contraseña es requerida"),
    }),
    onSubmit: (datos) => {
      try {
        signInRestaurant(datos.nombre, datos.contrasena);
      } catch (error) {
        console.log(error); //Email o contraseña incorrecta
      }
    },
  });

  const signInRestaurant = async (email, password) => {
    setLoading(true);

    // console.log(doc.id, ' => ', doc.data().codigo);
    await firebase.auth
      .signInWithEmailAndPassword(email, password)
      // .then(() => {
      //   navigate("/estructura-empresa");
      // })
      .catch(() => {
        setError("Email o contraseña incorrecta");
      });

    setLoading(false);
  };

  return (
    <>
      <div className="rounded  lg:bg-white lg:shadow-2xl lg:pr-20 lg:pl-20 lg:pt-20 lg:pb-20 lg:w-2/2">
        <h2 className="text-center font-bold uppercase text-xl lg:text-xl text-gray-800 pt-8 pb-6">
          Inicio de Sesión
        </h2>
        <div className="flex justify-center">
          <div className="w-full max-w-3xl">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label
                  className="block uppercase text-gray-800 text-xs font-bold pt-2 pb-2"
                  htmlFor="nombre"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight"
                  id="nombre"
                  type="text"
                  placeholder="Email"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.nombre && formik.errors.nombre ? (
                <div>
                  {/* <p className="font-bold">Error:</p> */}
                  <p className="text-red-600 text-xs italic pb-3">
                    {formik.errors.nombre}
                  </p>
                </div>
              ) : null}

              <div className="mb-4">
                <label
                  className="block uppercase text-gray-800 text-xs font-bold pt-2 pb-2"
                  htmlFor="contrasena"
                >
                  Contraseña
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight"
                  id="contrasena"
                  type={show ? "password" : "text"}
                  placeholder="Contraseña"
                  value={formik.values.contrasena}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.contrasena && formik.errors.contrasena ? (
                <div>
                  <p className="text-red-600 text-xs italic pb-3">
                    {formik.errors.contrasena}
                  </p>
                </div>
              ) : null}

              {error ? (
                <div>
                  <p className="text-red-600 text-xs italic pb-3">{error}</p>
                </div>
              ) : null}

              <input
                type="submit"
                className="bg-blue-500 hover:bg-blue-400 w-full mt-5 p-2 text-white uppercase font-bold rounded"
                value="Iniciar"
              />

              {loading ? (
                <p className="animate-pulse flex justify-center mt-10">
                  Cargando...
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
