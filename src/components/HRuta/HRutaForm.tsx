import React, { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import CloseIcon from "@mui/icons-material/Close";
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

type FormInput = {
  codigo: string;
  origen: string;
  destino: string;
  transporteId: string | null;
  personalId: string | null;
  maquinariaId: string | null;
  salida: Date | null;
  llegada: Date | null;
  cerrada: boolean;
  unidad: string;
  isTransportesChecked: boolean;
  isPersonaMaquinariaChecked: boolean;
};

interface HRutaFormProps {
  closeForm: () => void; // Función para cerrar el formulario al enviar
}

const HRutaForm: React.FC<HRutaFormProps> = ({ closeForm }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormInput>({
    defaultValues: {
      codigo: "",
      salida: null,
      llegada: null,
      origen: "BAS",
      destino: "BAS",
      transporteId: "",
      personalId: "",
      maquinariaId: "",
      cerrada: false,
      unidad: "kg",
      isTransportesChecked: false,
      isPersonaMaquinariaChecked: false,
    },
  });

  useEffect(() => {
    fetch('./public/codigoRuta.json')
      .then((response) => response.json())
      .then((data) => {
        setValue('codigo', data[0].codigo);
      })
      .catch((error) => console.error('Error fetching codigo data:', error));
  }, [setValue]);

  const isTransportesChecked = watch("isTransportesChecked");
  const isPersonaMaquinariaChecked = watch("isPersonaMaquinariaChecked");
  const cerradaValue = watch("cerrada");
  const salidaValue = watch("salida");

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    if (isTransportesChecked) {
      data.personalId = null;
      data.maquinariaId = null;
    } else if (isPersonaMaquinariaChecked) {
      data.transporteId = null;
    }

    console.log("Form Data:", data);
    closeForm();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CardHeader
          title="Hoja de Ruta"
          action={
            <IconButton onClick={closeForm}>
              <CloseIcon sx={{ color: "#FFFFFF" }} />  {/* Make the cross icon white */}
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
        <CardContent sx={{ padding: 0 }}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid
              container spacing={3}
              justifyContent="space-between"
              alignItems="center"
            >
              {/* Código */}
              <Grid item xs={12} sm={4}>
                <Controller
                  name="codigo"
                  control={control}
                  rules={{ required: "Este campo es requerido" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Código"
                      variant="outlined"
                      fullWidth
                      InputProps={{ readOnly: true }}
                      error={!!errors.codigo}
                      helperText={errors.codigo?.message}
                    />
                  )}
                />
              </Grid>

              {/* Fecha Salida */}
              <Grid item xs={12} sm={4}>
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
              <Grid item xs={12} sm={4}>
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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

              {/* Transporte Checkbox */}
              <Grid item xs={12}>
                <Controller
                  name="isTransportesChecked"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.checked);
                            setValue("isPersonaMaquinariaChecked", false);
                          }}
                          disabled={cerradaValue}
                        />
                      }
                      label="Usar Transportes"
                    />
                  )}
                />
              </Grid>

              {/* TransporteId Select */}
              {isTransportesChecked && (
                <Grid item xs={12}>
                  <Controller
                    name="transporteId"
                    control={control}
                    rules={{ required: "Este campo es requerido" }}
                    render={({ field }) => (
                      <FormControl
                        variant="outlined"
                        fullWidth
                        error={!!errors.transporteId}
                      >
                        <InputLabel>Transporte</InputLabel>
                        <Select
                          {...field}
                          label="Transporte"
                          disabled={cerradaValue}
                        >
                          <MenuItem value="transporte1">Transporte 1</MenuItem>
                          <MenuItem value="transporte2">Transporte 2</MenuItem>
                        </Select>
                        {errors.transporteId && (
                          <Typography color="error" variant="caption">
                            {errors.transporteId.message}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>
              )}

              {/* Persona y Camión Checkbox */}
              <Grid item xs={12}>
                <Controller
                  name="isPersonaMaquinariaChecked"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.checked);
                            setValue("isTransportesChecked", false);
                          }}
                          disabled={cerradaValue}
                        />
                      }
                      label="Asignar Persona y Camión"
                    />
                  )}
                />
              </Grid>

              {/* Persona y Camión Fields */}
              {isPersonaMaquinariaChecked && (
                <>
                  {/* Persona */}
                  <Grid item xs={12} sm={6}>
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
                          <InputLabel>Persona</InputLabel>
                          <Select
                            {...field}
                            label="Persona"
                            disabled={cerradaValue}
                          >
                            <MenuItem value="persona1">Persona 1</MenuItem>
                            <MenuItem value="persona2">Persona 2</MenuItem>
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

                  {/* Camión */}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="maquinariaId"
                      control={control}
                      render={({ field }) => (
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel>Camión</InputLabel>
                          <Select
                            {...field}
                            label="Camión"
                            disabled={cerradaValue}
                          >
                            <MenuItem value="maquinaria1">Camión 1</MenuItem>
                            <MenuItem value="maquinaria2">Camión 2</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>
                </>
              )}

              {/* Cerrada Checkbox */}
              <Grid item xs={12}>
                <Controller
                  name="cerrada"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} />}
                      label="Cerrada"
                    />
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
  );
};

export default HRutaForm;
