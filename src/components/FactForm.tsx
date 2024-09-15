import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const FactForm: React.FC = () => {
  const { register, handleSubmit, watch } = useForm();
  const salidaValue = watch('salida');

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      
      {/* Header Section */}
      <div className="section">
        <h2>Total</h2>
        <label>Factura N°:</label>
        <input {...register('facturaNumero')} type="text" />
        <label>Fecha:</label>
        <input {...register('fecha')} type="date" />
        <label>Cliente:</label>
        <input {...register('cliente')} type="text" />
      </div>

      {/* Items Section */}
      <div className="section">
        <h2>Items</h2>
        <label>Descripción:</label>
        <input {...register('descripcion')} type="text" />
        <label>Cantidad:</label>
        <input {...register('cantidad')} type="number" />
        <label>Precio Unitario:</label>
        <input {...register('precioUnitario')} type="number" />
      </div>

      {/* Subtotal Section */}
      <div className="section">
        <h2>Subtotal</h2>
        <p>Subtotal: $1000</p>
      </div>

      {/* Total Section */}
      <div className="section">
        <h2>Total</h2>
        <p>Total: $1200</p>
      </div>

      {/* CAE / Venc Section */}
      <div className="section">
        <h2>CAE / Venc</h2>
        <label>CAE:</label>
        <input {...register('cae')} type="text" />
        <label>Vencimiento:</label>
        <input {...register('vencimiento')} type="date" />
      </div>

      <button type="submit">Enviar </button>
    </form>
  );
};

export default FactForm;
