import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import HRutaList from './HRutaList';

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

const HRutaForm: React.FC = () => {
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
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>


      {/* Form Section */}
      <div style={{ gridRow: '2', gridColumn: '1 / span 2' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Añadir Hoja de Ruta</h2>

          <label>
            Código:
            <input type="string" className="greyed-out" readOnly {...register('codigo', { required: true })} />
          </label>
          <label>
            Fecha Salida:
            <input type="date" {...register('salida', { required: "Este campo es requerido" })} disabled={isCerradaChecked} />
          </label>
          <label>
            Fecha Llegada:
            <input type="date" {...register('llegada', {
              required: "Este campo es requerido",
              validate: value =>
                !salidaValue || new Date(value) >= new Date(salidaValue) || "Fecha de llegada no puede ser anterior a la fecha de salida"
            })} disabled={isCerradaChecked} />
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
            <input type="checkbox" checked={isTransportesChecked} onChange={handleTransportesChange} disabled={isCerradaChecked} />
            Transportes:
            <select {...register('transporteId', { required: isTransportesChecked })} disabled={!isTransportesChecked || isCerradaChecked}>
              <option value="transporte1">transporte1</option>
              <option value="transporte2">transporte2</option>
            </select>
          </label>
          <label>
            <input type="checkbox" checked={isPersonaMaquinariaChecked} onChange={handlePersonaMaquinariaChange} disabled={isCerradaChecked} />
            Persona:
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
          <button type="submit" disabled={isCerradaChecked}>Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default HRutaForm;

