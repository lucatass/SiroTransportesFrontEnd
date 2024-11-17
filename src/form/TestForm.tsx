import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import FormDatePicker from "../components/common/FormDatePicker";
import ProductTable from "../components/remito/ProductTable";
import ClientDetails from "./ClientDetails";
import "./TestForm.css";

const clients = [
  { id: 1, razonSocial: "Pablo", direccion: "Texas", cuit: "20230232" },
  { id: 2, razonSocial: "En caso de que el nombre sea largo", direccion: "California", cuit: "20304050" },
  { id: 3, razonSocial: "María", direccion: "Florida", cuit: "40506070" },
];

const TestForm = () => {
  const methods = useForm();
  const { register, handleSubmit, watch } = methods;
  //remitente y destinatario useStates
  const [selectedRemitente, setSelectedRemitente] = useState(null);
  const [selectedDestinatario, setSelectedDestinatario] = useState(null);

  //seguro y contrareembolso useStates
  const valorDeclarado = watch('seguro.valorDeclarado');
  const coeficiente = watch('seguro.coeficiente'); 
  const [seguro, setSeguro] = useState<number>(0);
  
  //remitente y destinatario onChanges
  const handleRemitenteChange = (event) => {
    const selectedClient = clients.find(
      (client) => client.id === event.target.value
    );
    setSelectedRemitente(selectedClient);
  };

  const handleDestinatarioChange = (event) => {
    const selectedClient = clients.find(
      (client) => client.id === event.target.value
    );
    setSelectedDestinatario(selectedClient);
  };



  useEffect(() => {
    if (valorDeclarado && coeficiente) {
      const seguroTotal = (valorDeclarado * coeficiente);
      setSeguro(seguroTotal);
      console.log("segurototal multiplicado da",seguro)
    } 
    
  }, [valorDeclarado, coeficiente]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(() => {})} className="test-form compact">
        {/* Header dentro del formulario */}
        <div className="form-header">
        </div>

        {/* Loading and Error Messages */}
        {/* <div className="status-message">
          <p>Cargando datos...</p>
          <p className="error-message">Error al cargar datos</p>
        </div> */}

        {/* Fecha de Registro and Tracking */}
        <div className="form-row spaced-between">
          <div className="form-field small-field">
            <FormDatePicker name="fecha" label="Fecha de Registro" />
          </div>
          <h2 style={{ fontSize: '2em', margin: '0', padding: '0' }}>Remito</h2>
          <div className="form-field tracking-field">
            <TextField
              label="Tracking"
              {...register("tracking")}
              disabled
              fullWidth
            />
          </div>
        </div>

        {/* Remitente y Destinatario Selection */}
        <div className="form-row spaced-row dropdown-row">
          <div className="form-field dropdown-field">
            <FormControl sx={{ width: "200px" }}>
              <InputLabel id="remitente-label">Remitente</InputLabel>
              <Select
                labelId="remitente-label"
                {...register("remitenteId")}
                onChange={handleRemitenteChange}
                size="small"
                sx={{ width: "200px" }}>
                {clients.map((client) => (
                  <MenuItem key={client.id} value={client.id}>
                    {client.razonSocial}
                  </MenuItem>
                ))}
              </Select>

            </FormControl>
          </div>
          {/* el campo se muestra desde el principio sin datos  */}
          <ClientDetails
            razonSocial={selectedRemitente?.razonSocial || ""}
            direccion={selectedRemitente?.direccion || ""}
            cuit={selectedRemitente?.cuit || ""}
          />
          <div className="form-field dropdown-field">
            <FormControl sx={{ width: "200px" }}>
              <InputLabel id="destinatario-label">Destinatario</InputLabel>
              <Select
                labelId="destinatario-label"
                {...register("destinatarioId")}
                onChange={handleDestinatarioChange}
                fullWidth
                size="small"
              >
                {clients.map((client) => (
                  <MenuItem key={client.id} value={client.id}>
                    {client.razonSocial}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          </div>

          <ClientDetails
            razonSocial={selectedDestinatario?.razonSocial || ""}
            direccion={selectedDestinatario?.direccion || ""}
            cuit={selectedDestinatario?.cuit || ""}
          />
          
        </div>

        {/* Detalles Envio*/}
        <div className="form-group compact-grid">
          <h3>Detalles del Envío</h3>
          <div className="grid-container">
            <FormControl size="small">
              <InputLabel id="tipoPago-label">Pago en</InputLabel>
              <Select labelId="tipoPago-label" 
                {...register("tipoPago")}
                size="small">
                <MenuItem value="ORIGEN">ORIGEN</MenuItem>
                <MenuItem value="DESTINO">DESTINO</MenuItem>
              </Select>
            </FormControl>

            <TextField label="Remito" {...register("remito")} size="small" />
            <TextField
              label="Carta Porte"
              {...register("cartaPorte")}
              size="small"
            />
            <TextField label="Bultos" {...register("bultos")} size="small" />
          </div>
        </div>

        {/* Seguro y ContraReembolso en columnas */}
        <div className="two-column-group">
          <div className="form-group">
            <h3>Seguro</h3>
            <div className="grid-container">
              <TextField
                label="Valor Declarado"
                {...register("seguro.valorDeclarado")}
                size="small"
              />
              <TextField
                label="Coeficiente (%)"
                {...register("seguro.coeficiente")}
                size="small"
              />
              <TextField
                label="Seguro Total"
                disabled
                value={seguro.toFixed(3)}
                size="small"
              />
            </div>
          </div>

          <div className="form-group">
            <h3>ContraReembolso</h3>
            <div className="grid-container">
              <TextField
                label="Importe"
                {...register("contrareembolso.importe")}
                size="small"
              />
              <TextField
                label="Coeficiente (%)"
                {...register("contrareembolso.coeficiente")}
                size="small"
              />
              <TextField
                label="Comision"
                {...register("contrareembolso.comision")}
                size="small"
              />
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="product-table-container">
          <h3>Productos</h3>
          <ProductTable productos={[]} removeProduct={() => {}} />
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <Button variant="contained" color="secondary">
            Agregar Producto
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Guardar Remito
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default TestForm;
