import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

type FormInput = {
  codigo: string;
  origen: string;
  destino: string;
  personalId: string;
  maquinariaId: string;
  salida: string;
  llegada: string;
  cerrada: boolean;
  kms: number;
  gastos: number;
};

const HRepartoForm: React.FC = () => {
  const [isCerradaChecked, setIsCerradaChecked] = useState(false);
  const [remitos, setRemitos] = useState<{ Remitosid: string; nombre: string }[]>([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [camiones, setCamiones] = useState<{ id: string; nombre: string }[]>([]);
  const [fleteros, setFleteros] = useState<{ id: string; nombre: string }[]>([]);

  const { register, handleSubmit, watch, formState: { errors }, reset, setValue } = useForm<FormInput>({
    defaultValues: {
      salida: '',
      llegada: '',
      origen: 'BAS',
      destino: '',
      personalId: '',
      maquinariaId: '',
      cerrada: false,
      kms: 0,
      gastos: 0,
    },
  });

  useEffect(() => {
    fetch('codigoRuta.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched codigoRuta data:', data);
        setValue('codigo', data[0].codigo);
      })
      .catch((error) => console.error('Error fetching codigo data:', error));
  }, [setValue]);

  useEffect(() => {
    fetch('camionesRep.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched camiones data:', data);
        setCamiones(data);
      })
      .catch((error) => console.error('Error fetching camiones data:', error));
  }, []);

  useEffect(() => {
    fetch('fleterosRep.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched fleteros data:', data);
        setFleteros(data);
      })
      .catch((error) => console.error('Error fetching fleteros data:', error));
  }, []); 

  const fetchRemitos = () => {
    fetch('remitosRep.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched remitos:', data);
        setRemitos(data);
      })
      .catch((error) => console.error('Error fetching remitos data:', error));
  };

  const onSubmit = (data: FormInput) => {
    console.log('Form Data:', data);
    setIsFormSubmitted(true);
  };

  const handleCerradaChange = () => {
    setIsCerradaChecked(!isCerradaChecked);
  };

  const salidaValue = watch('salida');

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Hoja de Reparto</h2>
  
        <label>
          Código:
          <input type="text" className="greyed-out" readOnly {...register('codigo', { required: true })} />
        </label>
  
        <style>{`
          .greyed-out {
            color: grey !important;
            background-color: #f7f7f7;
            border-color: #ccc;
          }
        `}</style>
  
        <label>
          Salida:
          <input
            type="datetime-local"
            {...register('salida', { required: "Este campo es requerido" })}
            disabled={isCerradaChecked}
          />
        </label>
        <label>
          Llegada:
          <input
            type="datetime-local"
            {...register('llegada', {
              required: "Este campo es requerido",
              validate: value =>
                !salidaValue || new Date(value) >= new Date(salidaValue) || "Fecha de llegada no puede ser anterior a la fecha de salida"
            })}
            disabled={isCerradaChecked}
          />
          {errors.llegada && <p>{errors.llegada.message}</p>}
        </label>
        <label>
          Sucursal origen:
          <select {...register('origen', { required: "Este campo es requerido" })} disabled={isCerradaChecked}>
            <option value="BAS">BS AS</option>
            <option value="SNZ">SAENZ PEÑA</option>
            <option value="RST">RESISTENCIA</option>
          </select>
        </label>
        <label>
          Sucursal destino:
          <select {...register('destino', { required: "Este campo es requerido" })} disabled={isCerradaChecked}>
            <option value="BAS">BS AS</option>
            <option value="SNZ">SAENZ PEÑA</option>
            <option value="RST">RESISTENCIA</option>
          </select>
        </label>
  
        <label>
          Fletero:
          <select {...register('personalId', { required: true })} disabled={isCerradaChecked}>
            {fleteros.map(fletero => (
              <option key={"f"+fletero.id} value={fletero.id}>{fletero.nombre}</option>
            ))}
          </select>
  
          Camión:
          <select {...register('maquinariaId', { required: true })} disabled={isCerradaChecked}>
            {camiones.map(camion => (
              <option key={camion.id} value={camion.id}>{camion.nombre}</option>
            ))}
          </select>
        </label>
  
        <div>
          <h3>Kilometraje</h3>
          <label>
            Kilómetros:
            <input
              type="number"
              {...register('kms', { required: "Este campo es requerido", valueAsNumber: true })}
              disabled={isCerradaChecked}
            />
            {errors.kms && <p>{errors.kms.message}</p>}
          </label>
        </div>
        
        <div>
          <h3>Gastos Totales</h3>
          <label>
            Gastos:
            <input
              type="number"
              {...register('gastos', { required: "Este campo es requerido", valueAsNumber: true })}
              disabled={isCerradaChecked}
            />
            {errors.gastos && <p>{errors.gastos.message}</p>}
          </label>
        </div>
  
        <label>
          Cerrada:
          <input type="checkbox" {...register('cerrada')} checked={isCerradaChecked} onChange={handleCerradaChange} />
        </label>
  
        <button type="submit" disabled={isCerradaChecked}>Enviar</button>
      </form>
  
      {isFormSubmitted && (
        <>
          <button onClick={fetchRemitos}>Remitos</button>
          <ul>
            {remitos.map(remito => (
              <li key={remito.Remitosid}>
                {remito.nombre}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}  

export default HRepartoForm;
