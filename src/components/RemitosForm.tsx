import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools"
import './RemitosForm.css'

type FormValues = {
    remitenteNombre: string;
    remitenteCuit: string;
    destinatarioNombre: string;
    destinatarioCuit: string;
    pagoEn: string;
    unidad: string;
    recolección: number;
    bultos: number;
    peso: number;
    valorDeclarado: number;
    contrareembolso: number;
}
export const RemitosForm = () => {

    const form = useForm<FormValues>()
    const { register, control, handleSubmit } = form
    const onSubmit = (data: FormValues) => {
        console.log("form submitted (๑˃ᴗ˂)ﻭ", data)
    }
    
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>

            <label htmlFor="remitente">Remitente</label>
            <input type="text" id="remitenteNombre" placeholder='Nombre y Apellido'
            {...register("remitenteNombre",{
                required:"El nombre es requerido (;_;)",
            })} />
            <input type="text" id="remitenteCuit" placeholder='Cuit'
            {...register("remitenteCuit",{
                required:"El cuit es requerido (;_;)",
            })} />

            <label htmlFor="destinatario">Destinatario</label>
            <input type="text" id="destinatarioNombre" placeholder='Nombre y Apellido'
            {...register("destinatarioNombre",{
                required:"El nombre es requerido (;_;)",
            })}/>
            <input type="text" id="destinatarioCuit" placeholder='Cuit'
            {...register("destinatarioCuit",{
                required:"El cuit es requerido (;_;)",
            })} />

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

            <div className="costos">
                <div>
                    <label htmlFor="recolección">Recolección</label>
                    <input type="number" id="recolección" placeholder='0,00'
                    {...register("recolección",
                        {valueAsNumber: true,
                    })} />

                    <label htmlFor="bultos">Bultos</label>
                    <input type="number" id="bultos"  placeholder='0'
                    {...register("bultos",
                        {valueAsNumber: true    
                    })}/>
                </div>
                <div>
                    <label htmlFor="peso">Peso</label>
                    <input type="number" id="peso"  placeholder='0,00' 
                    {...register("peso",
                        {valueAsNumber: true
                    })}/>

                    <label htmlFor="valorDeclarado">Valor declarado</label>
                    <input type="number" id="valorDeclarado" placeholder='0,00'
                 
                    {...register("valorDeclarado",
                        {valueAsNumber: true
                    })} />
                </div>
                <div >
                    <label htmlFor="contrareembolso">Contrareembolso</label>
                    <input type="number" id="contrareembolso" placeholder='0,00'
                    {...register("contrareembolso",
                        {valueAsNumber: true
                    })} />

                </div>
            </div>
            
            <button className="agregar" type="submit">Agregar</button>
            <button className="cancelar" type="reset">Cancelar</button>
            <button className="cerrar" type="button">Cerrar</button>
        </form>
        <DevTool control={control} />
    </div>   
)
}
