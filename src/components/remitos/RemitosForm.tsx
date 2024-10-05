import React, { useEffect, useState } from 'react';
import { useForm,Controller, SubmitHandler } from 'react-hook-form';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import CloseIcon from '@mui/icons-material/Close';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Typography,
  Divider,
  Card,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import { Close } from '@mui/icons-material';


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

interface RemitosFormProps {
  closeForm: () => void;
}
const RemitosForm: React.FC<RemitosFormProps> = () => {
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

  const closeForm = () => {
  };

  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CardHeader
        title="Remitos"
        action={
        <IconButton onClick={closeForm}>
          <CloseIcon sx={{ color: "#FFFFFF" }} />
        </IconButton>
        }
        sx={{
          backgroundColor: "#008DD5",
          color: "#FFFFFF",
          textAlign: "center",
          padding: "10px",
          borderRadius: "10px 10px 0 0",
        }}
      />
    <Divider />
    <CardContent sx={{ padding: "0px" }}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ backgroundColor: 'aliceblue', padding: '20px', borderRadius: '50px', border: '1px solid #034c6e' }}>
        <h2 style={{ margin: 0 }}>Remito</h2>
        
        {/* Fecha */}
        <TextField
          label="Fecha"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          {...register('fecha', { required: 'La fecha es requerida' })}
          error={!!errors.fecha}
          helperText={errors.fecha?.message}
          sx={{ marginBottom: '20px' }}
        />
        
        {/* Remitente */}
        <TextField
          label="Remitente"
          placeholder="Buscar remitente"
          value={remitenteNombre}
          onChange={handleAutocompleteRemitente}
          fullWidth
          autoComplete="off"
          {...register('remitenteNombre', { required: 'El remitente es requerido' })}
          error={!!errors.remitenteNombre}
          helperText={errors.remitenteNombre?.message}
          sx={{ marginBottom: '20px' }}
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
        {selectedRemitente && (
          <div style={{ marginTop: '20px' }}>
            <h3>Detalles del Remitente:</h3>
            <p><strong>Nombre:</strong> {selectedRemitente.nombre}</p>
            <p><strong>CUIT:</strong> {selectedRemitente.cuit}</p>
          </div>
        )}

        {/* Destinatario */}
        <TextField
          label="Destinatario"
          placeholder="Buscar destinatario"
          value={destinatarioNombre}
          onChange={handleAutocompleteDestinatario}
          fullWidth
          autoComplete="off"
          {...register('destinatarioNombre', { required: 'El destinatario es requerido' })}
          error={!!errors.destinatarioNombre}
          helperText={errors.destinatarioNombre?.message}
          sx={{ marginBottom: '20px' }}
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
        {selectedDestinatario && (
          <div style={{ marginTop: '20px' }}>
            <h3>Detalles del Destinatario:</h3>
            <p><strong>Nombre:</strong> {selectedDestinatario.nombre}</p>
            <p><strong>CUIT:</strong> {selectedDestinatario.cuit}</p>
          </div>
        )}

        {/* Pago en and Unidad */}
        <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="pagoEnLabel">Pago en</InputLabel>
              <Select labelId="pagoEnLabel" id="pagoEn" defaultValue="destino" {...register("pagoEn")}>
                <MenuItem value="destino">Destino</MenuItem>
                <MenuItem value="origen">Origen</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="unidadLabel">Unidad</InputLabel>
              <Select labelId="unidadLabel" id="unidad" defaultValue="kg" {...register("unidad")}>
                <MenuItem value="kg">Kg</MenuItem>
                <MenuItem value="tn">Tn</MenuItem>
                <MenuItem value="bu">Bulto</MenuItem>
                <MenuItem value="pc">%</MenuItem>
                <MenuItem value="m3">m³</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Recolección, Bultos, Peso, Valor Declarado */}
        <Grid container spacing={2}margin={'20px'}>
          <Grid item xs={2}>
            <TextField label="Recolección" type="number" fullWidth {...register("recolección", { valueAsNumber: true })} />
          </Grid>
          <Grid item xs={2}>
            <TextField label="Bultos" type="number" fullWidth {...register("bultos", { valueAsNumber: true })} />
          </Grid>
          <Grid item xs={2}>
            <TextField label="Peso" type="number" fullWidth {...register("peso", { valueAsNumber: true })} />
          </Grid>
          <Grid item xs={2}>
            <TextField label="Valor Declarado" type="number" fullWidth {...register("valorDeclarado", { valueAsNumber: true })} />
          </Grid>
          
          <Grid item xs={2}>
            <TextField label="Contrareembolso" type="number"  {...register("contrareembolso", { valueAsNumber: true })} />
          </Grid>
          </Grid>
        {/* Buttons */}
        <Grid container spacing={2} sx={{ marginTop: '20px' }}>
          <Grid item>
            <Button variant="contained" color="primary" type="submit">Agregar</Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" type="reset">Cancelar</Button>
          </Grid>
          <Grid item>
            <Button variant="text" type="button">Cerrar</Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  </LocalizationProvider>
  </>
);
};


export default RemitosForm;