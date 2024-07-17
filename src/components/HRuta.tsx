import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

type FormInput = {
  codigo: number;
  origen: string;
  destino: string;
  transporteId: string;
  personalId: string;
  maquinariaId: string;
  salida: string;
  llegada: string;
  cerrada: boolean;
  unidad: string;
  tracking: string;
};

const HrutaList: React.FC = () => {
  const [codigo, setCodigo] = useState<number | null>(null);

  const { register, handleSubmit, watch, setError, clearErrors, formState: { errors }, reset } = useForm<FormInput>({
    defaultValues: {
      salida: '',
      llegada: '',
      origen: 'BAS',
      destino: '',
      transporteId: '',
      personalId: '',
      maquinariaId: '',
      cerrada: false,
      unidad: 'kg',
      tracking: '',
    },
  });

  useEffect(() => {
    fetch('./src/components/codigoRuta.json') 
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data); 
        reset({ codigo: data[0].codigo }); // Setea el valor de código
      })
      .catch((error) => console.error('Error fetching codigo data:', error));
  }, [reset]);

  const [formData, setFormData] = useState<FormInput | null>(null);

  const onSubmit = (data: FormInput) => {
    if (data.transporteId) {
      data.personalId = null as any;
      data.maquinariaId = null as any;
    } else {
      data.transporteId = null as any;
    }

    console.log('Form Data:', data);
    setFormData(data);
  };

  const transporteIdValue = watch('transporteId');
  const personalIdValue = watch('personalId');
  const maquinariaIdValue = watch('maquinariaId');
  const salidaValue = watch('salida');

  const validateIds = () => {
    if (transporteIdValue && (personalIdValue || maquinariaIdValue)) {
      setError('transporteId', { type: 'manual', message: 'No puede seleccionar Transporte y Persona/Camion simultáneamente' });
      setError('personalId', { type: 'manual', message: 'No puede seleccionar Persona y Transporte simultáneamente' });
      setError('maquinariaId', { type: 'manual', message: 'No puede seleccionar Camion y Transporte simultáneamente' });
    } else if (!transporteIdValue && (!personalIdValue || !maquinariaIdValue)) {
      setError('transporteId', { type: 'manual', message: 'Debe seleccionar Transporte o Persona y Camion' });
      setError('personalId', { type: 'manual', message: 'Debe seleccionar Transporte o Persona y Camion' });
      setError('maquinariaId', { type: 'manual', message: 'Debe seleccionar Transporte o Persona y Camion' });
    } else {
      clearErrors(['transporteId', 'personalId', 'maquinariaId']);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Sucursal Origen</th>
            <th>Sucursal Destino</th>
            <th>Transportes</th>
            <th>Fecha Salida</th>
            <th>Fecha Llegada</th>
            <th>Cerrada</th>
            <th>Unidad</th>
            <th>Tracking</th>
          </tr>
        </thead>
        <tbody>
          {formData ? (
            <tr>
              <td>{formData.codigo}</td>
              <td>{formData.origen}</td>
              <td>{formData.destino}</td>
              <td>{formData.transporteId}</td>
              <td>{formData.salida}</td>
              <td>{formData.llegada}</td>
              <td>{formData.cerrada ? 'Si' : 'No'}</td>
              <td>{formData.unidad}</td>
              <td>{formData.tracking}</td>
            </tr>
          ) : (
            <tr>
              <td colSpan={9}>No hay datos</td>
            </tr>
          )}
        </tbody>
      </table>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Código:
          <input type="number" value={codigo !== null ? codigo : ''} className="greyed-out" readOnly {...register('codigo')} />
        </label>
        
        <style >{`
          .greyed-out {
            color: grey !important;
            background-color: #f7f7f7;
            border-color: #ccc;
          }
        `}</style>
        <label>
          Fecha Salida:
          <input type="date" {...register('salida')} />
        </label>
        <label>
          Fecha Llegada:
          <input type="date" {...register('llegada', {
            validate: value =>
              !salidaValue || new Date(value) >= new Date(salidaValue) || "Fecha de llegada no puede ser anterior a la fecha de salida"
          })} />
          {errors.llegada && <p>{errors.llegada.message}</p>}
        </label>
        <label>
          Sucursal origen:
          <select {...register('origen')}>
            <option value="BAS">BS AS</option>
            <option value="SNZ">SAENZ PEÑA</option>
            <option value="RST">RESISTENCIA</option>
          </select>
        </label>
        <label>
          Sucursal destino:
          <select {...register('destino')}>
            <option value="BAS">BS AS</option>
            <option value="SNZ">SAENZ PEÑA</option>
            <option value="RST">RESISTENCIA</option>
          </select>
        </label>
        <label>
          Transportes:
          <input type="string" {...register('transporteId')} onChange={validateIds} />
          {errors.transporteId && <p>{errors.transporteId.message}</p>}
          {/* add checkbox here to enable Transportes and disable Personas and Maquinaria */}
        </label>
        <label>
          Persona:
          <input type="string" {...register('personalId')} onChange={validateIds} />
          {errors.personalId && <p>{errors.personalId.message}</p>}
          Maquinaria:
          <input type="string" {...register('maquinariaId')} onChange={validateIds} />
          {errors.maquinariaId && <p>{errors.maquinariaId.message}</p>}
          {/* add checkbox here to enable Personas and Maquinaria and disable Transportes */}
        </label>
        <label>
          Unidad:
          <select {...register('unidad')}>
            <option value="kG">Kg</option>
            <option value="TN">Tn</option>
            <option value="PC">%</option>
            <option value="M3">m³</option>
          </select>
        </label>
        <label>
          Estado:
          <select {...register('tracking')}>
            <option value="PLANTA">En Planta</option>
            <option value="TRANSITO">En Transito</option>
            <option value="PENDIENTE_REPARTO">Pendiente</option>
            <option value="ENTREGADO">Entregado</option>
          </select>
        </label>
        <label>
          Cerrada:
          <input type="checkbox" {...register('cerrada')} />
        </label>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default HrutaList;
