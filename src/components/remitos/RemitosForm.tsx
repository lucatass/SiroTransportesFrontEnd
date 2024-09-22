import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormInput {
  fecha: string;
  remitenteId: number;
  remitenteNombre: string;
  destinatarioId: number;
  destinatarioNombre: string;
  pagoEn: string;
  unidad: string;
  recolección: number;
  bultos: number;
  peso: number;
  valorDeclarado: number;
  contrareembolso: number;
}

interface Cliente {
  id: number;
  nombre: string;
  cuit: string;
}

const RemitosForm: React.FC = () => {
  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm<IFormInput>({
    defaultValues: {
      remitenteNombre: '',
      destinatarioNombre: '',
      recolección: 0,
      bultos: 0,
      peso: 0,
      valorDeclarado: 0,
      contrareembolso: 0,
    }
  });
  const [remitos, setRemitos] = useState<Cliente[]>([]);
  const [filteredRemitentes, setFilteredRemitentes] = useState<Cliente[]>([]);
  const [filteredDestinatarios, setFilteredDestinatarios] = useState<Cliente[]>([]);
  const [selectedRemitente, setSelectedRemitente] = useState<Cliente | null>(null);
  const [selectedDestinatario, setSelectedDestinatario] = useState<Cliente | null>(null);
  const [showDropdownRemitente, setShowDropdownRemitente] = useState(false);
  const [showDropdownDestinatario, setShowDropdownDestinatario] = useState(false);


  useEffect(() => {
    fetch('public/remitos.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((remitosData) => {
        setRemitos(remitosData);
        setFilteredRemitentes(remitosData);
        setFilteredDestinatarios(remitosData);
      })
      .catch((error) => console.error('Error fetching JSON:', error));
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = data => {
    const remitente = remitos.find(remito => remito.id === data.remitenteId);
    const destinatario = remitos.find(remito => remito.id === data.destinatarioId);
    const pagoEn = data.pagoEn;
    const unidad = data.unidad;

    const recoleccion = isNaN(data.recolección) ? 0 : data.recolección;
    const bultos = isNaN(data.bultos) ? 0 : data.bultos;
    const peso = isNaN(data.peso) ? 0 : data.peso;
    const valorDeclarado = isNaN(data.valorDeclarado) ? 0 : data.valorDeclarado;
    const contrareembolso = isNaN(data.contrareembolso) ? 0 : data.contrareembolso;


   
    console.log('Form Data:', {
      fecha: data.fecha,
      remitente: remitente ? { id: remitente.id, nombre: remitente.nombre, cuit: remitente.cuit } : null,
      destinatario: destinatario ? { id: destinatario.id, nombre: destinatario.nombre, cuit: destinatario.cuit } : null,
      pagoEn: pagoEn,
      unidad: unidad,
      recolección: recoleccion,
      bultos: bultos,
      peso: peso,
      valorDeclarado: valorDeclarado,
      contrareembolso: contrareembolso
    });
  };

  const handleAutocompleteRemitente = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setValue('remitenteNombre', query);
    if (query.length === 0) {
      setFilteredRemitentes([]);
      setShowDropdownRemitente(false);
    } else {
      const filtered = remitos.filter(remito => 
        remito.nombre.toLowerCase().includes(query)
      );
      setFilteredRemitentes(filtered);
      setShowDropdownRemitente(true);
    }
  };

  const handleSelectRemitente = (cliente: Cliente) => {
    setValue('remitenteId', cliente.id);
    setValue('remitenteNombre', cliente.nombre);
    setSelectedRemitente(cliente);
    setShowDropdownRemitente(false);
  };

  const handleAutocompleteDestinatario = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setValue('destinatarioNombre', query);
    if (query.length === 0) {
      setFilteredDestinatarios([]);
      setShowDropdownDestinatario(false);
    } else {
      const filtered = remitos.filter(remito => 
        remito.nombre.toLowerCase().includes(query)
      );
      setFilteredDestinatarios(filtered);
      setShowDropdownDestinatario(true);
    }
  };

  const handleSelectDestinatario = (cliente: Cliente) => {
    setValue('destinatarioId', cliente.id);
    setValue('destinatarioNombre', cliente.nombre);
    setSelectedDestinatario(cliente);
    setShowDropdownDestinatario(false);
  };

  const remitenteNombre = watch('remitenteNombre') || '';
  const destinatarioNombre = watch('destinatarioNombre') || '';

  return (
    <form onSubmit={handleSubmit(onSubmit)}style={{ backgroundColor: 'aliceblue', padding: '20px', borderRadius: '50px', border: '1px solid #034c6e' }}>
      <h2 style={{ margin: 0}}>Remito</h2>
      <div>
        <label htmlFor="fecha">Fecha:</label>
        <input
          type="date"
          id="fecha"
          placeholder="seleccione la fecha"
          {...register('fecha', { required: 'La fecha es requerida' })}    
        />
        {errors.fecha && <span>{errors.fecha.message}</span>}
      </div>
      <div>
        <label htmlFor="remitenteNombre">Remitente:</label>
        <input
          type="text"
          id="remitenteAutocomplete"
          placeholder="Buscar remitente"
          value={remitenteNombre}
          autoComplete="off"
          {...register('remitenteNombre', { required: 'El remitente es requerido' })}
          onChange={handleAutocompleteRemitente}
        />
        {showDropdownRemitente && (
          <ul style={{ border: '1px solid #ccc', listStyleType: 'none', margin: 0, padding: 0, backgroundColor: '#fff' }}>
            {filteredRemitentes.map(cliente => (
              <li 
                key={cliente.id} 
                onClick={() => handleSelectRemitente(cliente)}
                style={{ padding: '8px', cursor: 'pointer', background: '#fff', borderBottom: '1px solid #ccc', color: 'darkblue' }}
              >
                {cliente.nombre}
              </li>
            ))}
          </ul>
        )}
        {errors.remitenteNombre && <span>{errors.remitenteNombre.message}</span>}
      </div>
      {selectedRemitente && (
        <div style={{ marginTop: '20px' }}>
          <h3>Detalles del Remitente:</h3>
          <p><strong>Nombre:</strong> {selectedRemitente.nombre}</p>
          <p><strong>CUIT:</strong> {selectedRemitente.cuit}</p>
        </div>
      )}
      <div>
        <label htmlFor="destinatarioNombre">Destinatario:</label>
        <input
          type="text"
          id="destinatarioAutocomplete"
          placeholder="Buscar destinatario"
          value={destinatarioNombre}
          autoComplete="off"
          {...register('destinatarioNombre', { required: 'El destinatario es requerido' })}
          onChange={handleAutocompleteDestinatario}
        />
        {showDropdownDestinatario && (
          <ul style={{ border: '1px solid #ccc', listStyleType: 'none', margin: 0, padding: 0, backgroundColor: '#fff' }}>
            {filteredDestinatarios.map(cliente => (
              <li 
                key={cliente.id} 
                onClick={() => handleSelectDestinatario(cliente)}
                style={{ padding: '8px', cursor: 'pointer', background: '#fff', borderBottom: '1px solid #ccc', color: 'darkblue' }}
              >
                {cliente.nombre}
              </li>
            ))}
          </ul>
        )}
        {errors.destinatarioNombre && <span>{errors.destinatarioNombre.message}</span>}
      </div>
      {selectedDestinatario && (
        <div style={{ marginTop: '20px' }}>
          <h3>Detalles del Destinatario:</h3>
          <p><strong>Nombre:</strong> {selectedDestinatario.nombre}</p>
          <p><strong>CUIT:</strong> {selectedDestinatario.cuit}</p>
        </div>
      )}
  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <div style={{ flex: '1', marginRight: '10px' }}>
          <label htmlFor="pagoEn" style={{ marginRight: '10px' }}>Pago en:</label>
          <select id="pagoEn" {...register("pagoEn")} style={{ width: '100%' }}>
            <option value="destino">Destino</option>
            <option value="origen">Origen</option>
          </select>
        </div>
        <div style={{ flex: '1', marginLeft: '10px' }}>
          <label htmlFor="unidad" style={{ marginRight: '10px' }}>Unidad:</label>
          <select id="unidad" {...register("unidad")} style={{ width: '100%' }}>
            <option value="kg">Kg</option>
            <option value="tn">Tn</option>
            <option value="bu">Bulto</option>
            <option value="pc">%</option>
            <option value="m3">m³</option>
          </select>
        </div>
      </div>
      <div>
          <label htmlFor="recolección">Recolección</label>
          <input 
              type="numeric" 
              id="recolección" 
              placeholder='0,00' 
              {...register("recolección", { valueAsNumber: true })}
          />

          <label htmlFor="bultos">Bultos</label>
          <input 
              type="numeric" 
              id="bultos" 
              placeholder='0,00'
              {...register("bultos", { valueAsNumber: true })}
          />

          <label htmlFor="peso">Peso</label>
          <input 
              type="numeric" 
              id="peso" 
              placeholder='0,00' 
              {...register("peso", { valueAsNumber: true })}
          />

          <label htmlFor="valorDeclarado">Valor declarado</label>
          <input 
              type="numeric" 
              id="valorDeclarado" 
              placeholder='0,00'
              {...register("valorDeclarado", { valueAsNumber: true })} 
          />
      </div>

      <div>
          <label htmlFor="contrareembolso">Contrareembolso</label>
          <input 
              type="numeric" 
              id="contrareembolso" 
              placeholder='0,00'
              {...register("contrareembolso", { valueAsNumber: true })} 
          />
      </div>
      
      <button className="agregar" type="submit">Agregar</button>
      <button className="cancelar" type="reset">Cancelar</button>
      <button className="cerrar" type="button">Cerrar</button>    </form>
  );
};

export default RemitosForm;