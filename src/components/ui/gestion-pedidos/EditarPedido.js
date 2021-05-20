import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
// Para los Modales
// import Rodal from "rodal";
// import "rodal/lib/rodal.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es"; // the locale you want

import firebase from "../../../firebase"; //index
import GeneralContext from "../../../context/general/generalsContext";

import Producto from "../../ui/gestion-pedidos/Producto";

const EditarPedido = ({ mostrarEditarFormPedido }) => {
  const user = firebase.auth.currentUser;
  const { nuevopedidoseleccionado } = useContext(GeneralContext);
  const [fecha, setFecha] = useState(new Date());
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [condicionesInfo, setCondiciones] = useState([]);
  const [materialesInfo, setMateriales] = useState([]);
  const [precioCliente, setPrecioCliente] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [pedidoCarrito, setPedidoCarrito] = useState(
    nuevopedidoseleccionado.productos
  );

  // Apenas el componente carga, calcula la cantidad a pagar
  useEffect(() => {
    calcularSumaTotal();
    // eslint-disable-next-line
  }, [pedidoCarrito]);

  //Mejorar
  useEffect(() => {
    function manejarSnapshot3(snapshot) {
      const materiales = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setMateriales(materiales);
    }

    function manejarSnapshot4(snapshot) {
      const condiciones = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setCondiciones(condiciones);
    }

    const unsubscribe3 = firebase.db
      .collection("materiales")
      .onSnapshot(manejarSnapshot3);

    const unsubscribe4 = firebase.db
      .collection("condiciones")
      .onSnapshot(manejarSnapshot4);

    return () => {
      // Unmouting

      unsubscribe3();
      unsubscribe4();
    };
  }, [nuevopedidoseleccionado]); //nuevopedidoseleccionado

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // idpedido:
      //   !!nuevopedidoseleccionado && !!nuevopedidoseleccionado.idpedido
      //     ? nuevopedidoseleccionado.idpedido
      //     : "",
      // cliente:
      //   !!nuevopedidoseleccionado && !!nuevopedidoseleccionado.cliente
      //     ? nuevopedidoseleccionado.cliente
      //     : "",
      // descripcion:
      //   !!nuevopedidoseleccionado && !!nuevopedidoseleccionado.descripcion
      //     ? nuevopedidoseleccionado.descripcion
      //     : "",
      // email:
      //   !!nuevopedidoseleccionado && !!nuevopedidoseleccionado.email
      //     ? nuevopedidoseleccionado.email
      //     : "",
      // vendedor:
      //   !!nuevopedidoseleccionado && !!nuevopedidoseleccionado.vendedor
      //     ? nuevopedidoseleccionado.vendedor
      //     : "",
      // idvendedor:
      //   !!nuevopedidoseleccionado && !!nuevopedidoseleccionado.idvendedor
      //     ? nuevopedidoseleccionado.idvendedor
      //     : "",
      // precio:
      //   !!nuevopedidoseleccionado && !!nuevopedidoseleccionado.precio
      //     ? nuevopedidoseleccionado.precio
      //     : "",
      condicionespago:
        !!nuevopedidoseleccionado && !!nuevopedidoseleccionado.condicionespago
          ? nuevopedidoseleccionado.condicionespago
          : "",
      descuentoporcentual:
        !!nuevopedidoseleccionado &&
        !!nuevopedidoseleccionado.descuentoporcentual
          ? nuevopedidoseleccionado.descuentoporcentual
          : 0,
      descuentovalor:
        !!nuevopedidoseleccionado && !!nuevopedidoseleccionado.descuentovalor
          ? nuevopedidoseleccionado.descuentovalor
          : 0,
    },
    validationSchema: Yup.object({
      // idpedido: Yup.string()
      //   .required("El idpedido es obligatorio")
      //   .min(10, "El idpedido debe tener 10 caracteres")
      //   .max(10, "El idpedido debe tener 10 caracteres"),
      // cliente: Yup.string().required("El condicionespago es obligatorio"),
      // descripcion: Yup.string()
      //   .required("La descripción es obligatoria")
      //   .max(100, "La descripción debe tener máximo 100 caracteres"),
      // email: Yup.string()
      //   .required("El email es obligatorio")
      //   .email("Verifique que sea un email válido"),
      // vendedor: Yup.string()
      //   .required("La descripción es obligatoria")
      //   .max(50, "La descripción debe tener maximo 50 caracteres"),
      // idvendedor: Yup.string()
      //   .required("El id es obligatorio")
      //   .min(4, "El id debe tener 4 caracteres")
      //   .max(4, "El id debe tener 4 caracteres"),
      // precio: Yup.string().required("El tipo de precio es obligatorio"),
      condicionespago: Yup.string().required(
        "El condicionespago es obligatorio"
      ),
      descuentoporcentual: Yup.number()
        .min(0, "Minimo es 0%")
        .max(99, "Máximo es 99%")
        .required("El descuentoporcentual es obligatorio"),
      descuentovalor: Yup.number()
        .min(0, "Minimo es 0")
        .required("El descuentovalor es obligatorio"),
    }),
    onSubmit: (nuevopedido, { resetForm }) => {
      try {
        editarPedido(nuevopedido, nuevopedidoseleccionado.id);

        resetForm({ values: "" });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const editarPedido = async (nuevopedido, idpedido) => {
    // Esconde el formulario
    mostrarEditarFormPedido();

    const condicionespago = nuevopedido.condicionespago;
    const descuentoporcentual = nuevopedido.descuentoporcentual;
    const descuentovalor = nuevopedido.descuentovalor;

    const productos = pedidoCarrito; //arreglo de objetos
    const subtotal = subTotal;
    const iva = (nuevopedidoseleccionado.impuesto / 100) * subTotal;
    const total =
      (nuevopedidoseleccionado.impuesto / 100) * subTotal + subTotal;

    await firebase.db.collection("pedidos").doc(idpedido).update({
      condicionespago: condicionespago,
      descuentoporcentual: descuentoporcentual,
      descuentovalor: descuentovalor,
      subtotal: subtotal,
      iva: iva,
      total: total,
      productos: productos,
    });

    // Redireccionar
    // navigate("/"); // nuevopedido
  };

  const eliminarProducto = (position) => {
    let newData = [
      ...pedidoCarrito.slice(0, position),
      ...pedidoCarrito.slice(position + 1),
    ];

    setPedidoCarrito(newData);
  };

  const agregarProducto = () => {
    if (selectedMaterial && cantidad) {
      const total = cantidad * precioCliente;

      // Almacenar el pedido al carrito
      const otroProducto = {
        idproducto: selectedMaterial.id,
        descripcion: selectedMaterial.descripcion,
        medida: selectedMaterial.medida,
        precio: precioCliente,
        cantidad,
        total,
      };

      let newData = [...pedidoCarrito, otroProducto];

      setPedidoCarrito(newData);
    }
  };

  const handleChangeMaterial = (e) => {
    setSelectedMaterial(materialesInfo[e.target.value]);
    console.log(materialesInfo[e.target.value]);

    setCantidad(0);
  };

  const handleChangeCantidad = (e) => {
    setCantidad(e.target.value);

    if (selectedMaterial) {
      const precioCliente =
        nuevopedidoseleccionado.precio === "P-USD-1"
          ? selectedMaterial.preciousd1
          : selectedMaterial.preciousd2;

      setPrecioCliente(precioCliente);
    }
  };

  const calcularSumaTotal = () => {
    let sumaTotal = 0;
    sumaTotal = pedidoCarrito.reduce(
      (sumaTotal, producto) => sumaTotal + producto.total,
      0
    );

    setSubTotal(sumaTotal);
  };

  const resetMaterial = () => {
    cantidad && setSelectedMaterial("");
  };

  return (
    <div className="">
      <div className="bg-white shadow-xl rounded px-8 pt-2 pb-8 flex flex-col my-3">
        <div className="-mx-3 md:flex mb-6 ">
          <div className=" pl-3 pr-5 uppercase text-sm flex items-center">
            {user.email}
          </div>
          <div className="md:w-1/3 px-3 mb-6 md:mb-0">
            <DatePicker
              dateFormat="dd/MM/yyyy h:mm aa"
              selected={fecha}
              // default={nuevopedidoseleccionado.fecha}
              className="border"
              maxDate={new Date()}
              locale={es}
              onChange={(fecha) => setFecha(fecha)}
              disabled
            />
          </div>
        </div>

        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-5/12 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2"
              htmlFor="cliente"
            >
              Cliente
            </label>

            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full  py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="cliente"
              type="text"
              placeholder=""
              disabled
              value={`${nuevopedidoseleccionado.idcliente} ${nuevopedidoseleccionado.cliente}`}
            />
          </div>

          <div className="md:w-3/12 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full  py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="email"
              type="text"
              placeholder=""
              disabled
              value={nuevopedidoseleccionado.email}
            />
          </div>

          <div className="md:w-2/12 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2"
              htmlFor="precio"
            >
              Zona
            </label>

            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full  py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="precio"
              type="text"
              placeholder=""
              disabled
              value={
                nuevopedidoseleccionado.precio === "P-USD-1"
                  ? "Zona 1"
                  : "Zona 2"
              }
            />
          </div>

          <div className="md:w-2/12 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2"
              htmlFor="vendedor"
            >
              Vendedor
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full  py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="vendedor"
              type="text"
              placeholder=""
              disabled
              value={nuevopedidoseleccionado.vendedor}
            />
          </div>
        </div>

        <div className="-mx-3 md:flex mb-2">
          <div className="md:w-1/8 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2"
              htmlFor="condicionespago"
            >
              Condiciones de pago
            </label>

            <select
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full  py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="condicionespago"
              value={formik.values.condicionespago}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">--Seleccione--</option>

              {condicionesInfo
                .sort(function (a, b) {
                  // Ordena por id
                  return a.id - b.id;
                })
                .map((condicionesInfo) => (
                  <option
                    key={condicionesInfo.id}
                    value={condicionesInfo.descripcion}
                  >
                    {condicionesInfo.id} - {condicionesInfo.descripcion}
                  </option>
                ))}
            </select>

            {formik.touched.condicionespago && formik.errors.condicionespago ? (
              <div>
                <p className="text-red-600 text-xs italic">
                  {formik.errors.condicionespago}
                </p>
              </div>
            ) : null}
          </div>

          <div className="md:w-1/8 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2"
              htmlFor="descuentoporcentual"
            >
              Descuento porcentual
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="descuentoporcentual"
              type="number"
              placeholder=""
              step="0.01"
              min="0"
              max="100"
              value={formik.values.descuentoporcentual}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.descuentoporcentual &&
            formik.errors.descuentoporcentual ? (
              <div>
                <p className="text-red-600 text-xs italic">
                  {formik.errors.descuentoporcentual}
                </p>
              </div>
            ) : null}
          </div>

          <div className="md:w-1/8 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2"
              htmlFor="descuentovalor"
            >
              Descuento valor
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full  py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="descuentovalor"
              type="number"
              placeholder=""
              step="0.01"
              min="0"
              max="100"
              value={formik.values.descuentovalor}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.descuentovalor && formik.errors.descuentovalor ? (
              <div>
                <p className="text-red-600 text-xs italic">
                  {formik.errors.descuentovalor}
                </p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex -mx-1 border-b py-2 items-start mb-5">
          <div className="px-1 w-20 text-center"></div>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="-mx-3 md:flex mb-5">
            <div className="md:w-5/12 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2"
                htmlFor="material"
              >
                Material
              </label>

              <select
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full  py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="material"
                value={selectedMaterial ? selectedMaterial.material : ""}
                onChange={handleChangeMaterial}
              >
                <option value="">--Seleccione--</option>

                {materialesInfo
                  .sort(function (a, b) {
                    // Ordena por id
                    return a.id - b.id;
                  })
                  .map((materialesInfo, index) => (
                    <option key={materialesInfo.id} value={index}>
                      {materialesInfo.id} - {materialesInfo.descripcion}
                    </option>
                  ))}
              </select>
            </div>

            <div className="md:w-2/12 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2"
                htmlFor="medida"
              >
                Medida
              </label>
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full  py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="medida"
                type="text"
                placeholder=""
                disabled
                value={selectedMaterial ? selectedMaterial.medida : ""}
              />

              {formik.touched.medida && formik.errors.medida ? (
                <div>
                  <p className="text-red-600 text-xs italic">
                    {formik.errors.medida}
                  </p>
                </div>
              ) : null}
            </div>

            <div className="md:w-2/12 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2"
                htmlFor="preciomaterial"
              >
                Cantidad
              </label>
              {selectedMaterial ? (
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full  py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  id="cantidad"
                  type="number"
                  placeholder=""
                  // step="1"
                  min="0"
                  max="100"
                  value={cantidad ? cantidad : ""}
                  onChange={handleChangeCantidad}
                />
              ) : (
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full  py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  id="cantidad"
                  type="number"
                  placeholder=""
                  step="0.01"
                  min="0"
                  max="100"
                  disabled
                  value={""}
                />
              )}

              {formik.touched.cantidad && formik.errors.cantidad ? (
                <div>
                  <p className="text-red-600 text-xs italic">
                    {formik.errors.cantidad}
                  </p>
                </div>
              ) : null}
            </div>

            <div className="md:w-1/12 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2"
                htmlFor="preciomaterial"
              >
                Precio
              </label>
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full  py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="preciomaterial"
                type="number"
                placeholder=""
                step="0.01"
                min="0"
                max="100"
                disabled
                value={precioCliente}
              />
            </div>

            <div className="md:w-1/12 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2"
                htmlFor="total"
              >
                Total
              </label>
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full  py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="total"
                type="text"
                placeholder=""
                disabled
                value={
                  !selectedMaterial
                    ? ""
                    : !cantidad
                    ? ""
                    : precioCliente
                    ? cantidad * precioCliente
                    : ""
                }
              />

              {formik.touched.total && formik.errors.total ? (
                <div>
                  <p className="text-red-600 text-xs italic">
                    {formik.errors.medida}
                  </p>
                </div>
              ) : null}
            </div>

            <div className="md:w-1/12 px-6 mb-6 md:mb-0 flex items-end justify-center">
              <button
                type="button"
                className=" font-bold flex justify-center items-center h-8 w-8 border-blue-600 border-2 text-blue-600 rounded-full transition duration-300 hover:bg-blue-600 hover:text-white focus:outline-none"
                onClick={() => {
                  agregarProducto();
                  resetMaterial();
                }}
              >
                +
              </button>
            </div>
          </div>

          {pedidoCarrito.map((producto, index) => (
            <Producto
              producto={producto}
              key={index}
              eliminarProducto={() => eliminarProducto(index)}
            />
          ))}

          <div className="flex items-center -mx-3 border-b py-2 pt-5 pb-5 mt-5 bg-gray-200">
            <div className="px-7 md:w-1/5">
              <p className="text-gray-800 uppercase tracking-wide text-sm font-bold text-center">
                Subtotal: {subTotal.toFixed(2)}
              </p>
            </div>

            <div className="px-7 md:w-1/5">
              <p className="text-gray-800 uppercase tracking-wide text-sm font-bold text-center">
                Descuento: {formik.values.descuentoporcentual}
              </p>
            </div>

            <div className="px-7 md:w-1/5">
              <p className="leading-none text-center">
                <span className="block uppercase tracking-wide text-sm font-bold text-gray-800">
                  Base imponible:
                </span>
                <span className="font-medium text-xs text-gray-500">
                  {/* (Incl. GST) */}
                </span>
              </p>
            </div>

            <div className="px-7 md:w-1/5">
              <p className="leading-none text-center">
                <span className="block uppercase tracking-wide text-sm font-bold text-gray-800">
                  IVA:{" "}
                  <span className="font-bold">
                    {(
                      (nuevopedidoseleccionado.impuesto / 100) *
                      subTotal
                    ).toFixed(2)}
                  </span>
                </span>
              </p>
            </div>

            <div className="px-7 md:w-1/5">
              <p className="leading-none text-center">
                <span className="block uppercase tracking-wide text-sm font-bold text-gray-800">
                  TOTAL:{" "}
                  <span className=" font-bold">
                    {(
                      (nuevopedidoseleccionado.impuesto / 100) * subTotal +
                      subTotal
                    ).toFixed(2)}
                  </span>
                </span>
              </p>
            </div>

            <div className="px-1 w-20 text-center"></div>
          </div>

          <div className="flex flex-row-reverse ">
            <div className=" p-2">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-400 mt-5 p-2 pr-10 pl-10 text-white uppercase font-bold text-sm rounded"
                onClick={() => mostrarEditarFormPedido()}
              >
                Atrás
              </button>
            </div>
            {pedidoCarrito.length > 0 ? (
              <div className=" p-2">
                <input
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-400 mt-5 p-2 pr-20 pl-20 text-white uppercase font-bold text-sm rounded "
                  value={"Editar pedido"}
                />
              </div>
            ) : (
              <div className=" p-2">
                <div className="bg-gray-500  mt-5 p-2 pr-20 pl-20 text-white uppercase font-bold text-sm rounded ">
                  Editar pedido
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarPedido;
