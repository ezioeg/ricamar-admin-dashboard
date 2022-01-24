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

const fn = (state, action) => {
  switch (action.type) {
    case SELECCIONAR_EMPRESA:
      return {
        ...state,
        empresaseleccionada: action.payload,
      };

    case SELECCIONAR_ZONA:
      return {
        ...state,
        zonaseleccionada: action.payload,
      };

    case SELECCIONAR_DOCUMENTO:
      return {
        ...state,
        documentoseleccionado: action.payload,
      };

    case SELECCIONAR_VENDEDOR:
      return {
        ...state,
        vendedorseleccionado: action.payload,
      };

    case SELECCIONAR_ARTICULO:
      return {
        ...state,
        articuloseleccionado: action.payload,
      };

    case SELECCIONAR_MARCA:
      return {
        ...state,
        marcaseleccionada: action.payload,
      };

    case SELECCIONAR_MEDIDA:
      return {
        ...state,
        medidaseleccionada: action.payload,
      };

    case SELECCIONAR_CONDICION:
      return {
        ...state,
        condicionseleccionada: action.payload,
      };

    case SELECCIONAR_IMPUESTO:
      return {
        ...state,
        impuestoseleccionado: action.payload,
      };

    case SELECCIONAR_RETENCION:
      return {
        ...state,
        retencionseleccionada: action.payload,
      };

    case SELECCIONAR_PRECIO:
      return {
        ...state,
        precioseleccionado: action.payload,
      };

    case SELECCIONAR_RECHAZO:
      return {
        ...state,
        rechazoseleccionado: action.payload,
      };

    case SELECCIONAR_TRANSPORTE:
      return {
        ...state,
        transporteseleccionado: action.payload,
      };

    case SELECCIONAR_BANCO:
      return {
        ...state,
        bancoseleccionado: action.payload,
      };

    case SELECCIONAR_VIA:
      return {
        ...state,
        viaseleccionada: action.payload,
      };

    case SELECCIONAR_MATERIAL:
      return {
        ...state,
        materialseleccionado: action.payload,
      };

    case SELECCIONAR_CLIENTE:
      return {
        ...state,
        clienteseleccionado: action.payload,
      };

    case SELECCIONAR_NUEVO_PEDIDO:
      return {
        ...state,
        nuevopedidoseleccionado: action.payload,
      };

    case SELECCIONAR_CONFIRMAR_PEDIDO:
      return {
        ...state,
        confirmarpedidoseleccionado: action.payload,
      };

    case SELECCIONAR_NOTIFICAR_DESPACHO:
      return {
        ...state,
        notificardespachoseleccionado: action.payload,
      };

    case SELECCIONAR_NOTIFICAR_ENTREGA:
      return {
        ...state,
        notificarentregaseleccionado: action.payload,
      };

    case SELECCIONAR_PEDIDO_GENERAL:
      return {
        ...state,
        pedidogeneralseleccionado: action.payload,
      };

    case AGREGAR_PRODUCTO_CARRITO:
      return {
        ...state,
        pedidocarrito: [...state.pedidocarrito, action.payload],
      };

    case ELIMINAR_PRODUCTO_CARRITO:
      return {
        ...state,
        pedidocarrito: state.pedidocarrito.filter(
          (producto) => producto.id !== action.payload
        ),
      };

    case PAGO_TOTAL:
      return {
        ...state,
        pagototal: action.payload,
      };

    case CANTIDAD_TOTAL:
      return {
        ...state,
        cantidadtotal: action.payload,
      };

    default:
      return state;
  }
};

export default fn;
