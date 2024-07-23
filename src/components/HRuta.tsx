import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

// Definición del tipo de entrada del formulario
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
  remitosId: string[];
};

// Componente principal HrutaList
const HrutaList: React.FC = () => {
  // Estado para gestionar la selección de checkbox y datos de los remitos
  const [isCerradaChecked, setIsCerradaChecked] = useState(false);
  const [isTransportesChecked, setIsTransportesChecked] = useState(false);
  const [isPersonaMaquinariaChecked, setIsPersonaMaquinariaChecked] = useState(false);
  const [remitos, setRemitos] = useState<{ Remitosid: string; nombre: string }[]>([]);
  const [selectedRemitoIds, setSelectedRemitoIds] = useState<string[]>([]);

  // Uso del hook useForm para manejar el formulario
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
      remitosId: [],
    },
  });

  // Fetch para obtener el código desde un archivo JSON al cargar el componente
  useEffect(() => {
    fetch('./src/components/codigoRuta.json')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data);
        setValue('codigo', data[0].codigo);
      })
      .catch((error) => console.error('Error fetching codigo data:', error));
  }, [setValue]);

  // Función para traer remitos desde un archivo JSON
  const fetchRemitos = () => {
    fetch('./src/components/remitosId.json')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched remitos:', data);
        setRemitos(data);
      })
      .catch((error) => console.error('Error fetching remitos data:', error));
  };

  // Maneja el clic en un remito y lo selecciona
  const handleRemitoClick = (id: string) => {
    const updatedIds = selectedRemitoIds.includes(id)
      ? selectedRemitoIds.filter(remitoId => remitoId !== id)
      : [...selectedRemitoIds, id];
    setSelectedRemitoIds(updatedIds);
    setValue('remitosId', updatedIds);
  };

  // Estado para los datos del formulario
  const [formData, setFormData] = useState<FormInput | null>(null);

  // Maneja el envío del formulario
  const onSubmit = (data: FormInput) => {
    // Ajusta los campos según los checkboxes seleccionados
    if (isTransportesChecked) {
      data.personalId = null as any;
      data.maquinariaId = null as any;
    } else if (isPersonaMaquinariaChecked) {
      data.transporteId = null as any;
    }

    console.log('Form Data:', data);
    setFormData(data);
  };

  // Maneja el cambio en el checkbox de 'cerrada'
  const handleCerradaChange = () => {
    setIsCerradaChecked(!isCerradaChecked);
  };

  // Maneja el cambio en el checkbox de 'transportes'
  const handleTransportesChange = () => {
    setIsTransportesChecked(!isTransportesChecked);
    setIsPersonaMaquinariaChecked(false);
    clearPersonaMaquinariaFields();
  };

  // Maneja el cambio en el checkbox de 'persona/maquinaria'
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
          <input type="string" className="greyed-out" readOnly {...register('codigo')} />
        </label>

        <style>{`
          .greyed-out {
            color: grey !important;
            background-color: #f7f7f7;
            border-color: #ccc;
          }
        `}</style>

        <label>
          Fecha Salida:
          <input type="date" {...register('salida')} disabled={isCerradaChecked} />
        </label>
        <label>
          Fecha Llegada:
          <input type="date" {...register('llegada', {
            validate: value =>
              !salidaValue || new Date(value) >= new Date(salidaValue) || "Fecha de llegada no puede ser anterior a la fecha de salida"
          })} disabled={isCerradaChecked} />
          {errors.llegada && <p>{errors.llegada.message}</p>}
        </label>
        <label>
          Sucursal origen:
          <select {...register('origen')} disabled={isCerradaChecked}>
            <option value="BAS">BS AS</option>
            <option value="SNZ">SAENZ PEÑA</option>
            <option value="RST">RESISTENCIA</option>
          </select>
        </label>
        <label>
          Sucursal destino:
          <select {...register('destino')} disabled={isCerradaChecked}>
            <option value="BAS">BS AS</option>
            <option value="SNZ">SAENZ PEÑA</option>
            <option value="RST">RESISTENCIA</option>
          </select>
        </label>
        <label>
          <input type="checkbox" checked={isTransportesChecked} onChange={handleTransportesChange} disabled={isCerradaChecked} />
          Transportes:
          <select {...register('transporteId')} disabled={!isTransportesChecked || isCerradaChecked}>
            <option value="transporte1">transporte1</option>
            <option value="transporte2">transporte2</option>
          </select>
        </label>
        <label>
          <input type="checkbox" checked={isPersonaMaquinariaChecked} onChange={handlePersonaMaquinariaChange} disabled={isCerradaChecked} />
          Persona:
          <select {...register('personalId')} disabled={!isPersonaMaquinariaChecked || isCerradaChecked}>
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
          Unidad:
          <select {...register('unidad')} disabled={isCerradaChecked}>
            <option value="kG">Kg</option>
            <option value="TN">Tn</option>
            <option value="PC">%</option>
            <option value="M3">m³</option>
          </select>
        </label>

        <label>
          Cerrada:
          <input type="checkbox" {...register('cerrada')} checked={isCerradaChecked} onChange={handleCerradaChange} />
        </label>

        <button type="submit" disabled={isCerradaChecked}>Enviar</button>
      </form>

      <button onClick={fetchRemitos}>Traer remitos</button>

      <ul>
        {remitos.map(remito => (
          <li key={remito.Remitosid} onClick={() => handleRemitoClick(remito.Remitosid)}>
            {remito.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HrutaList;
