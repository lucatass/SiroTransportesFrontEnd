import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import './RemitosForm.css';
import { FormValues } from './RemitoFormValues';

interface RemitosFormProps {
    selectedRemitente: { nombre: string, cuit: string } | null;
}

export const RemitosForm = ({ selectedRemitente }: RemitosFormProps) => {
    const form = useForm<FormValues>();
    const { register, control, handleSubmit, setValue } = form;

    const handleSearch = (query: string) => {};

    const onSubmit = (data: FormValues) => {};

    // Update form inputs when a remitente is selected
    useEffect(() => {
        if (selectedRemitente) {
            setValue('remitenteNombre', selectedRemitente.nombre);
            setValue('remitenteCuit', selectedRemitente.cuit);
        }
    }, [selectedRemitente, setValue]);

    return (
        <div className="RemitosForm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Añadir Remito</h1>

                <label htmlFor="remitente">Remitente</label>
                <input 
                    type="text" 
                    id="remitenteNombre" 
                    placeholder='Nombre y Apellido'
                    {...register("remitenteNombre", { required: "El nombre es requerido" })} 
                />
                <input 
                    type="text" 
                    id="remitenteCuit" 
                    placeholder='Cuit'
                    {...register("remitenteCuit", { required: "El cuit es requerido" })} 
                />

                <label htmlFor="destinatario">Destinatario</label>
                <input 
                    type="text" 
                    id="destinatarioNombre"  
                    placeholder='Nombre y Apellido'
                    {...register("destinatarioNombre", { required: "El nombre es requerido" })}
                />
                <input 
                    type="text" 
                    id="destinatarioCuit" 
                    placeholder='Cuit'
                    {...register("destinatarioCuit", { required: "El cuit es requerido" })} 
                />

                <div className="pagoEn">
                    <label htmlFor="pagoEn">Pago en</label>
                    <select name="pagoEn" id="pagoEn">
                        <option value="destino">Destino</option>
                        <option value="origen">Origen</option>
                    </select>

                    <label htmlFor="unidad">Unidad</label>
                    <select name="unidad" id="unidad">
                        <option value="kg">Kg</option>
                        <option value="tn">Tn</option>
                        <option value="bu">Bulto</option>
                        <option value="pc">%</option>
                        <option value="m3">m³</option>
                    </select>
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
                <button className="cerrar" type="button">Cerrar</button>
            </form>
            <DevTool control={control} />
        </div>   
    );
}

export default RemitosForm;
