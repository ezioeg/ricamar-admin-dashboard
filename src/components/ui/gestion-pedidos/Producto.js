import React from "react";

const Producto = ({ producto, eliminarProducto }) => {
  return (
    <div
      class="flex -mx-3 border-b border-t py-2 items-start"
      key={producto.idproducto}
    >
      <div class="px-7 md:w-5/12">
        <p class="text-gray-800 uppercase tracking-wide text-sm font-bold">
          {producto.idproducto} - {producto.descripcion}
        </p>
      </div>

      <div class="px-7 md:w-2/12 ">
        <p class="text-gray-800 uppercase tracking-wide text-sm font-bold">
          {producto.medida}
        </p>
      </div>

      <div class="px-7 md:w-2/12 ">
        <p class="text-gray-800 uppercase tracking-wide text-sm font-bold">
          {producto.cantidad}
        </p>
      </div>

      <div class="px-7 md:w-1/12 ">
        <p class="leading-none">
          <span class="block uppercase tracking-wide text-sm font-bold text-gray-800">
            {producto.precio}
          </span>
        </p>
      </div>

      <div class="px-7 md:w-1/12 ">
        <p class="leading-none">
          <span class="block uppercase tracking-wide text-sm font-bold text-gray-800">
            {producto.total}
          </span>
        </p>
      </div>

      <div class="px-7 md:w-1/12 flex justify-center">
        {" "}
        <p class="leading-none">
          <button
            type="button"
            className=" px-6 font-bold text-sm border-red-600  text-red-600 rounded transition duration-300 hover:bg-red-600 hover:text-white focus:outline-none"
            onClick={() => {
              eliminarProducto();
            }}
          >
            X
          </button>
        </p>
      </div>

      {/* <div class="px-1 w-20 text-center"></div> */}
    </div>
  );
};

export default Producto;
