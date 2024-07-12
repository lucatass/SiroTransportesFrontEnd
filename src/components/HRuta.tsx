import React from 'react';
import { useForm } from 'react-hook-form';

type FormInput = {
  codigo: number;
  sucursal: string;
  transportes: number;
  salida: string;
  llegada: string;
  cerrada: boolean;
};

const HrutaList: React.FC = () => {
  const { register, handleSubmit, control } = useForm<FormInput>({
    defaultValues: {
      codigo: 0,
      sucursal: '',
      transportes: 0,
      salida: '',
      llegada: '',
      cerrada: false,
    },
  });

  const onSubmit = (data: FormInput) => {
    console.log('Form Data:', data);
  };

  return (
    <div>
            <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Sucursal</th>
            <th>Transportes</th>
            <th>Fecha Salida</th>
            <th>Fecha Llegada</th>
            <th>Cerrada</th>
          </tr>
        </thead>
        <tbody>
          {[
            { codigo: 1, sucursal: 'Suc1', transportes: 10, salida: '2023-01-01', llegada: '2023-01-03', cerrada: false },
            { codigo: 2, sucursal: 'Suc2', transportes: 20, salida: '2023-01-02', llegada: '2023-01-04', cerrada: false },
          ].map((item) => (
            <tr key={item.codigo}>
              <td>{item.codigo}</td>
              <td>{item.sucursal}</td>
              <td>{item.transportes}</td>
              <td>{item.salida}</td>
              <td>{item.llegada}</td>
              <td>{item.cerrada ? 'Si' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Código:
          <input type="number" {...register('codigo')} />
        </label>
        <label>
          Sucursal:
          <input type="text" {...register('sucursal')} />
        </label>
        <label>
          Transportes:
          <input type="number" {...register('transportes')} />
        </label>
        <label>
          Fecha Salida:
          <input type="date" {...register('salida')} />
        </label>
        <label>
          Fecha Llegada:
          <input type="date" {...register('llegada')} />
        </label>
        <label>
          Cerrada:
          <input type="checkbox" {...register('cerrada')} />
        </label>
        <button type="submit">Enviar</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Sucursal</th>
            <th>Transportes</th>
            <th>Fecha Salida</th>
            <th>Fecha Llegada</th>
            <th>Cerrada</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  );
};

export default HrutaList;

