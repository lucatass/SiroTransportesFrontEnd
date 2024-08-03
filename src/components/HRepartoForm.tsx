import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

type FormInput = {
  codigo: string;
  origen: string;
  destino: string;
  transporteId: string;
  personalId: string;
  maquinariaId: string;
  salida: string;
  llegada: string;
  cerrada: boolean;
  unidad: string;
};

const HRepartoForm: React.FC = () => {
  const [isCerradaChecked, setIsCerradaChecked] = useState(false);
  const [isTransportesChecked, setIsTransportesChecked] = useState(false);
  const [isPersonaMaquinariaChecked, setIsPersonaMaquinariaChecked] = useState(false);
  const [remitos, setRemitos] = useState<{ Remitosid: string; nombre: string }[]>([]);
  const [isFormSubmitted, SetIsFormSubmitted] = useState(false);

  const { register, handleSubmit, watch, formState: { errors }, reset, setValue } = useForm<FormInput>({
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
    },
  });

  useEffect(() => {
    fetch('./src/components/codigoRuta.json')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data);
        setValue('codigo', data[0].codigo);
      })
      .catch((error) => console.error('Error fetching codigo data:', error));
  }, [setValue]);

  const fetchRemitos = () => {
    fetch('./src/components/remitosId.json')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched remitos:', data);
        setRemitos(data);
      })
      .catch((error) => console.error('Error fetching remitos data:', error));
  };

  const [formData, setFormData] = useState<FormInput | null>(null);

  const onSubmit = (data: FormInput) => {
    if (isTransportesChecked) {
      data.personalId = '';
      data.maquinariaId = '';
    } else if (isPersonaMaquinariaChecked) {
      data.transporteId = '';
    }

    console.log('Form Data:', data);
    setFormData(data);
    SetIsFormSubmitted(true);
  };

  const handleCerradaChange = () => {
    setIsCerradaChecked(!isCerradaChecked);
  };

  const handleTransportesChange = () => {
    setIsTransportesChecked(!isTransportesChecked);
    setIsPersonaMaquinariaChecked(false);
    clearPersonaMaquinariaFields();
  };

  const handlePersonaMaquinariaChange = () => {
    setIsPersonaMaquinariaChecked(!isPersonaMaquinariaChecked);
    setIsTransportesChecked(false);
    clearTransporteField();
  };

  const clearTransporteField = () => {
    setValue('transporteId', '');
  };

  const clearPersonaMaquinariaFields = () => {
    setValue('personalId', '');
    setValue('maquinariaId', '');
  };

  const salidaValue = watch('salida');

  return (
    <div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Hoja de Reparto</h2>

        <label>
          Código:
          <input type="string" className="greyed-out" readOnly {...register('codigo', { required: true })} />
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
          <select {...register('personalId', { required: isPersonaMaquinariaChecked })} disabled={!isPersonaMaquinariaChecked || isCerradaChecked}>
            <option value="persona1">persona1</option>
            <option value="persona2">persona2</option>
          </select>
          Camión:
          <select {...register('maquinariaId')} disabled={!isPersonaMaquinariaChecked || isCerradaChecked}>
            <option value="maquinaria1">camion1</option>
            <option value="maquinaria2">camion2</option>
          </select>
        </label>

        <label>
          Cerrada:
          <input type="checkbox" {...register('cerrada')} checked={isCerradaChecked} onChange={handleCerradaChange} />
      </label>

      <button type="submit" disabled={isCerradaChecked} >Enviar</button>
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
        </>)}
      


    </div>
);

};

export default HRepartoForm;
