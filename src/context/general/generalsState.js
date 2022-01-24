import React, { useReducer } from "react";

import GeneralReducer from "./generalsReducer";
import GeneralContext from "./generalsContext";

// Mover a firebaseState
// import firebase from "../../firebase"; // index

import {
  SELECCIONAR_EMPRESA,
  SELECCIONAR_ZONA,
  SELECCIONAR_DOCUMENTO,
  SELECCIONAR_VENDEDOR,
  SELECCIONAR_ARTICULO,
  SELECCIONAR_MARCA,
  SELECCIONAR_MEDIDA,
  SELECCIONAR_CONDICION,
  SELECCIONAR_IMPUESTO,
  SELECCIONAR_RETENCION,
  SELECCIONAR_PRECIO,
  SELECCIONAR_RECHAZO,
  SELECCIONAR_TRANSPORTE,
  SELECCIONAR_BANCO,
  SELECCIONAR_VIA,
  SELECCIONAR_MATERIAL,
  SELECCIONAR_CLIENTE,
  SELECCIONAR_NUEVO_PEDIDO,
  SELECCIONAR_CONFIRMAR_PEDIDO,
  SELECCIONAR_NOTIFICAR_DESPACHO,
  SELECCIONAR_NOTIFICAR_ENTREGA,
  SELECCIONAR_PEDIDO_GENERAL,
  AGREGAR_PRODUCTO_CARRITO,
  ELIMINAR_PRODUCTO_CARRITO,
  PAGO_TOTAL,
  CANTIDAD_TOTAL,
} from "../types";

const GeneralState = (props) => {
  const initialState = {
    empresaseleccionada: null,
    zonaseleccionada: null,
    documentoseleccionado: null,
    vendedorseleccionado: null,
    articuloseleccionado: null,
    marcaseleccionada: null,
    medidaseleccionada: null,
    condicionseleccionada: null,
    impuestoseleccionado: null,
    retencionseleccionada: null,
    precioseleccionado: null,
    rechazoseleccionado: null,
    transporteseleccionado: null,
    bancoseleccionado: null,
    viaseleccionada: null,
    materialseleccionado: null,
    clienteseleccionado: null,
    nuevopedidoseleccionado: null,
    confirmarpedidoseleccionado: null,
    notificardespachoseleccionado: null,
    notificarentregaseleccionado: null,
    pedidogeneralseleccionado: null,
    pedidocarrito: [],
    pagototal: 0,
    cantidadtotal: 0,
  };

  //useReducer con dispatch para ejecutar las funciones
  const [state, dispatch] = useReducer(GeneralReducer, initialState);

  const seleccionarEmpresa = (empresa) => {
    console.log(empresa);
    dispatch({
      type: SELECCIONAR_EMPRESA,
      payload: empresa,
    });
  };

  const seleccionarZona = (zona) => {
    console.log(zona);
    dispatch({
      type: SELECCIONAR_ZONA,
      payload: zona,
    });
  };

  const seleccionarDocumento = (documento) => {
    console.log(documento);
    dispatch({
      type: SELECCIONAR_DOCUMENTO,
      payload: documento,
    });
  };

  const seleccionarVendedor = (vendedor) => {
    console.log(vendedor);
    dispatch({
      type: SELECCIONAR_VENDEDOR,
      payload: vendedor,
    });
  };

  const seleccionarArticulo = (articulo) => {
    console.log(articulo);
    dispatch({
      type: SELECCIONAR_ARTICULO,
      payload: articulo,
    });
  };

  const seleccionarMarca = (marca) => {
    console.log(marca);
    dispatch({
      type: SELECCIONAR_MARCA,
      payload: marca,
    });
  };

  const seleccionarMedida = (medida) => {
    console.log(medida);
    dispatch({
      type: SELECCIONAR_MEDIDA,
      payload: medida,
    });
  };

  const seleccionarCondicion = (condicion) => {
    console.log(condicion);
    dispatch({
      type: SELECCIONAR_CONDICION,
      payload: condicion,
    });
  };

  const seleccionarImpuesto = (impuesto) => {
    console.log(impuesto);
    dispatch({
      type: SELECCIONAR_IMPUESTO,
      payload: impuesto,
    });
  };

  const seleccionarRetencion = (retencion) => {
    console.log(retencion);
    dispatch({
      type: SELECCIONAR_RETENCION,
      payload: retencion,
    });
  };

  const seleccionarPrecio = (precio) => {
    console.log(precio);
    dispatch({
      type: SELECCIONAR_PRECIO,
      payload: precio,
    });
  };

  const seleccionarRechazo = (rechazo) => {
    console.log(rechazo);
    dispatch({
      type: SELECCIONAR_RECHAZO,
      payload: rechazo,
    });
  };

  const seleccionarTransporte = (transporte) => {
    console.log(transporte);
    dispatch({
      type: SELECCIONAR_TRANSPORTE,
      payload: transporte,
    });
  };

  const seleccionarBanco = (banco) => {
    console.log(banco);
    dispatch({
      type: SELECCIONAR_BANCO,
      payload: banco,
    });
  };

  const seleccionarVia = (via) => {
    console.log(via);
    dispatch({
      type: SELECCIONAR_VIA,
      payload: via,
    });
  };

  const seleccionarMaterial = (material) => {
    console.log(material);
    dispatch({
      type: SELECCIONAR_MATERIAL,
      payload: material,
    });
  };

  const seleccionarCliente = (cliente) => {
    console.log(cliente);
    dispatch({
      type: SELECCIONAR_CLIENTE,
      payload: cliente,
    });
  };

  const seleccionarNuevoPedido = (nuevopedido) => {
    console.log(nuevopedido);
    dispatch({
      type: SELECCIONAR_NUEVO_PEDIDO,
      payload: nuevopedido,
    });
  };

  const seleccionarConfirmarPedido = (confirmarpedido) => {
    console.log(confirmarpedido);
    dispatch({
      type: SELECCIONAR_CONFIRMAR_PEDIDO,
      payload: confirmarpedido,
    });
  };

  const seleccionarNotificarDespacho = (notificardespacho) => {
    console.log(notificardespacho);
    dispatch({
      type: SELECCIONAR_NOTIFICAR_DESPACHO,
      payload: notificardespacho,
    });
  };

  const seleccionarNotificarEntrega = (notificarentrega) => {
    console.log(notificarentrega);
    dispatch({
      type: SELECCIONAR_NOTIFICAR_ENTREGA,
      payload: notificarentrega,
    });
  };

  const seleccionarPedidoGeneral = (pedidogeneral) => {
    console.log(pedidogeneral);
    dispatch({
      type: SELECCIONAR_PEDIDO_GENERAL,
      payload: pedidogeneral,
    });
  };

  const agregarProductoCarrito = (pedidocarrito) => {
    dispatch({
      type: AGREGAR_PRODUCTO_CARRITO,
      payload: pedidocarrito,
    });
  };

  const eliminarProductoCarrito = (id) => {
    dispatch({
      type: ELIMINAR_PRODUCTO_CARRITO,
      payload: id,
    });

    console.log(id);
  };

  // Suma el pago total
  const pagoTotal = (pagototal) => {
    dispatch({
      type: PAGO_TOTAL,
      payload: pagototal,
    });
  };

  // Suma la cantidad total
  const cantidadTotal = (cantidadtotal) => {
    dispatch({
      type: CANTIDAD_TOTAL,
      payload: cantidadtotal,
    });
  };

  return (
    <GeneralContext.Provider
      value={{
        empresaseleccionada: state.empresaseleccionada,
        seleccionarEmpresa,
        zonaseleccionada: state.zonaseleccionada,
        seleccionarZona,
        documentoseleccionado: state.documentoseleccionado,
        seleccionarDocumento,
        vendedorseleccionado: state.vendedorseleccionado,
        seleccionarVendedor,
        articuloseleccionado: state.articuloseleccionado,
        seleccionarArticulo,
        marcaseleccionada: state.marcaseleccionada,
        seleccionarMarca,
        medidaseleccionada: state.medidaseleccionada,
        seleccionarMedida,
        condicionseleccionada: state.condicionseleccionada,
        seleccionarCondicion,
        impuestoseleccionado: state.impuestoseleccionado,
        seleccionarImpuesto,
        retencionseleccionada: state.retencionseleccionada,
        seleccionarRetencion,
        precioseleccionado: state.precioseleccionado,
        seleccionarPrecio,
        rechazoseleccionado: state.rechazoseleccionado,
        seleccionarRechazo,
        transporteseleccionado: state.transporteseleccionado,
        seleccionarTransporte,
        bancoseleccionado: state.bancoseleccionado,
        seleccionarBanco,
        viaseleccionada: state.viaseleccionada,
        seleccionarVia,
        materialseleccionado: state.materialseleccionado,
        seleccionarMaterial,
        clienteseleccionado: state.clienteseleccionado,
        seleccionarCliente,
        nuevopedidoseleccionado: state.nuevopedidoseleccionado,
        seleccionarNuevoPedido,
        confirmarpedidoseleccionado: state.confirmarpedidoseleccionado,
        seleccionarConfirmarPedido,
        notificardespachoseleccionado: state.notificardespachoseleccionado,
        seleccionarNotificarDespacho,
        notificarentregaseleccionado: state.notificarentregaseleccionado,
        seleccionarNotificarEntrega,
        pedidogeneralseleccionado: state.pedidogeneralseleccionado,
        seleccionarPedidoGeneral,
        pedidocarrito: state.pedidocarrito, // Para guardar el pedido en el carrito
        pagototal: state.pagototal, // Para guardar el pago total
        cantidadtotal: state.cantidadtotal, // Para guardar la cantidad total
        agregarProductoCarrito,
        eliminarProductoCarrito,
        pagoTotal, // funcion guardar suma de pago total
        cantidadTotal, // funcion guardar suma de cantidad total
      }}
    >
      {props.children}
    </GeneralContext.Provider>
  );
};

export default GeneralState;
