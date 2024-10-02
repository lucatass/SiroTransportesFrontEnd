import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
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
} from "@mui/material";

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

  const { 
    control, 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors }, 
    reset, 
    setValue } = useForm<FormInput>({
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
    fetch('camiones.json')
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
    fetch('fleteros.json')
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
    fetch('remitos.json')
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
  const cerradaValue = watch('cerrada');
  const salidaValue = watch('salida');

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CardHeader title="Hoja de Reparto" 
      sx={{
        backgroundColor: "#008DD5",
        color: "#FFFFFF",
        textAlign: "center",
        padding: "10px",
        borderRadius: "10px 10px 0 0",        
      }}
      />
      <Divider />
      <CardContent 
      sx={{ padding:0}}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
  <Grid 
    container 
    spacing={2} 
    justifyContent="space-between" 
    alignSelf="center" 
    sx={{ padding: 2 }} // Add padding to the form container
  >
    {/* Codigo */}
    <Grid item xs={11} sm={4} sx={{ paddingBottom: 2 }}> {/* Add padding to individual items */}
      <Controller
        name="codigo"
        control={control}
        rules={{ required: "Este campo es requerido" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Código"
            variant="outlined"
            fullWidth
            InputProps={{ readOnly: true }}
            error={!!errors.codigo}
            helperText={errors?.codigo?.message}
          />
        )}
      />
    </Grid>

    {/* Fecha Salida */}
    <Grid item xs={11} sm={4} sx={{ paddingBottom: 2 }}>
      <Controller
        name="salida"
        control={control}
        rules={{ required: "Este campo es requerido" }}
        render={({ field }) => (
          <DatePicker
            label="Fecha Salida"
            disabled={cerradaValue}
            value={field.value}
            onChange={(date) => field.onChange(date)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                fullWidth
                error={!!errors.salida}
                helperText={errors.salida?.message}
              />
            )}
          />
        )}
      />
    </Grid>

    {/* Fecha Llegada */}
    <Grid item xs={12} sm={4} sx={{ paddingBottom: 2 }}>
      <Controller
        name="llegada"
        control={control}
        rules={{
          required: "Este campo es requerido",
          validate: (value) =>
            !salidaValue ||
            (value && salidaValue && value >= salidaValue) ||
            "Fecha de llegada no puede ser anterior a la fecha de salida",
        }}
        render={({ field }) => (
          <DatePicker
            label="Fecha Llegada"
            disabled={cerradaValue}
            value={field.value}
            onChange={(date) => field.onChange(date)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                fullWidth
                error={!!errors.llegada}
                helperText={errors.llegada?.message}
              />
            )}
          />
        )}
      />
    </Grid>

    {/* Sucursal Origen */}
    <Grid item xs={12} sm={6} sx={{ paddingBottom: 2 }}>
      <Controller
        name="origen"
        control={control}
        rules={{ required: "Este campo es requerido" }}
        render={({ field }) => (
          <FormControl
            variant="outlined"
            fullWidth
            error={!!errors.origen}
          >
            <InputLabel>Sucursal Origen</InputLabel>
            <Select
              {...field}
              label="Sucursal Origen"
              disabled={cerradaValue}
            >
              <MenuItem value="BAS">BS AS</MenuItem>
              <MenuItem value="SNZ">SAENZ PEÑA</MenuItem>
              <MenuItem value="RST">RESISTENCIA</MenuItem>
            </Select>
            {errors.origen && (
              <Typography color="error" variant="caption">
                {errors.origen.message}
              </Typography>
            )}
          </FormControl>
        )}
      />
    </Grid>

    {/* Sucursal Destino */}
    <Grid item xs={12} sm={6} sx={{ paddingBottom: 2 }}>
      <Controller
        name="destino"
        control={control}
        rules={{ required: "Este campo es requerido" }}
        render={({ field }) => (
          <FormControl
            variant="outlined"
            fullWidth
            error={!!errors.destino}
          >
            <InputLabel>Sucursal Destino</InputLabel>
            <Select
              {...field}
              label="Sucursal Destino"
              disabled={cerradaValue}
            >
              <MenuItem value="BAS">BS AS</MenuItem>
              <MenuItem value="SNZ">SAENZ PEÑA</MenuItem>
              <MenuItem value="RST">RESISTENCIA</MenuItem>
            </Select>
            {errors.destino && (
              <Typography color="error" variant="caption">
                {errors.destino.message}
              </Typography>
            )}
          </FormControl>
        )}
      />
    </Grid>

    {/* Fletero */}
    <Grid item xs={12} sm={6} sx={{ paddingBottom: 2 }}>
      <Controller
        name="personalId"
        control={control}
        rules={{ required: "Este campo es requerido" }}
        render={({ field }) => (
          <FormControl
            variant="outlined"
            fullWidth
            error={!!errors.personalId}
          >
            <InputLabel>Fletero</InputLabel>
            <Select
              {...field}
              label="Fletero"
              disabled={cerradaValue}
            >
              <MenuItem value="fletero1">fletero1</MenuItem>
              <MenuItem value="fletero2">fletero2</MenuItem>
              <MenuItem value="fletero3">fletero3</MenuItem>
            </Select>
            {errors.personalId && (
              <Typography color="error" variant="caption">
                {errors.personalId.message}
              </Typography>
            )}
          </FormControl>
        )}
      />
    </Grid>

    {/* Maquinaria */}
    <Grid item xs={12} sm={6} sx={{ paddingBottom: 2 }}>
      <Controller
        name="maquinariaId"
        control={control}
        rules={{ required: "Este campo es requerido" }}
        render={({ field }) => (
          <FormControl
            variant="outlined"
            fullWidth
            error={!!errors.maquinariaId}
          >
            <InputLabel>Camiones</InputLabel>
            <Select
              {...field}
              label="Camiones"
              disabled={cerradaValue}
            >
              <MenuItem value="camion1">camion1</MenuItem>
              <MenuItem value="camion2">camion2</MenuItem>
              <MenuItem value="camion3">camion3</MenuItem>
            </Select>
            {errors.maquinariaId && (
              <Typography color="error" variant="caption">
                {errors.maquinariaId.message}
              </Typography>
            )}
          </FormControl>
        )}
      />
    </Grid>
    {/* Submit Button */}
    <Grid item xs={12}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3, backgroundColor: "#16DF9F" }}
      >
        Enviar
      </Button>
    </Grid>
  </Grid>
</form>

      </CardContent>
      </LocalizationProvider>

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
