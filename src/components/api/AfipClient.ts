import axios from 'axios';
import { useAuthStore } from '../../components/api/useAuthStore';

// Definimos la interfaz que nuestro cliente AFIP debe implementar
interface IAfipClient {
  getToken(environment: string, taxId: string, wsid: string): Promise<AuthResponse>;
  getUltimoComprobanteEmitido(auth: AuthParams, ptoVta: number, cbteTipo: number): Promise<UltimoComprobanteResponse>;
  solicitarCae(auth: AuthParams, ultimoCpteEmitido: number, feDetRequest: FeDetRequest): Promise<any>;
}

// Implementación del cliente AFIP
export class AfipClient implements IAfipClient {
  private baseURL: string = 'https://app.afipsdk.com/api/v1/afip';

  constructor() {}

  public async getToken(environment: string, taxId: string, wsid: string): Promise<AuthResponse> {
    const response = await axios.post(`${this.baseURL}/auth`, {
      environment,
      tax_id: taxId,
      wsid,
    });
  
    const { token, sign, expiration } = response.data;
  
    // Almacena el token en el store
    const setAuthData = useAuthStore.getState().setAuthData;
  
    // Return the AuthResponse
    return { token, sign, expiration };
  }
  

  private async ensureTokenValid() {
    const isTokenExpired = useAuthStore.getState().isTokenExpired();

    if (isTokenExpired) {
      await this.getToken('enviroment', 'taxId', 'wsid');
    }
  }

  public async getUltimoComprobanteEmitido(auth: AuthParams, ptoVta: number, cbteTipo: number) {
    await this.ensureTokenValid();
  
    const response = await axios.post(`${this.baseURL}/requests`, {
      environment: 'dev',
      method: 'FECompUltimoAutorizado',
      wsid: 'wsfe',
      params: {
        Auth: auth,
        PtoVta: ptoVta,
        CbteTipo: cbteTipo
      }
    });
  
    return response.data;
  }  



  // Método para solicitar un nuevo CAE
  async solicitarCae(auth: AuthParams, ultimoCpteEmitido: number, feDetRequest: FeDetRequest): Promise<any> {
    const response = await axios.post(`${this.baseURL}/requests`, {
      environment: 'dev',
      method: 'FECAESolicitar',
      wsid: 'wsfe',
      params: {
        Auth: auth,
        FeCAEReq: {
          FeCabReq: {
            CantReg: 1,
            PtoVta: 1,
            CbteTipo: 1
          },
          FeDetReq: {
            FECAEDetRequest: feDetRequest
          }
        }
      } 
    });
    return response.data;
  }
}

// Definimos los tipos de datos para las respuestas y parámetros
interface AuthResponse {
  expiration: string;
  token: string;
  sign: string;
}

interface AuthParams {
  Token: string;
  Sign: string;
  Cuit: string;
}

interface UltimoComprobanteResponse {
  FECompUltimoAutorizadoResult: {
    PtoVta: number;
    CbteTipo: number;
    CbteNro: number;
  };
}

interface FeDetRequest {
  Concepto: number;
  DocTipo: number;
  DocNro: number;
  CbteDesde: number;
  CbteHasta: number;
  CbteFch: string;
  ImpTotal: number;
  ImpTotConc: number;
  ImpNeto: number;
  ImpOpEx: number;
  ImpIVA: number;
  ImpTrib: number;
  MonId: string;
  MonCotiz: number;
  Iva: {
    AlicIva: Array<{
      Id: number;
      BaseImp: number;
      Importe: number;
    }>;
  };
}

// Ejemplo de uso del cliente
(async () => {
  const afipClient = new AfipClient();

  // Obtención del token
  const authResponse = await afipClient.getToken('dev', '20409378472', 'wsfe');

  const authParams: AuthParams = {
    Token: authResponse.token,
    Sign: authResponse.sign,
    Cuit: '20409378472'
  };

  const ultimoComprobante = await afipClient.getUltimoComprobanteEmitido(authParams, 1, 1);

  // Solicitar CAE usando el último comprobante emitido
  const feDetRequest: FeDetRequest = {
    Concepto: 1,
    DocTipo: 80,
    DocNro: 33693450239,
    CbteDesde: ultimoComprobante.FECompUltimoAutorizadoResult.CbteNro,
    CbteHasta: ultimoComprobante.FECompUltimoAutorizadoResult.CbteNro,
    CbteFch: '20240807',
    ImpTotal: 121,
    ImpTotConc: 0,
    ImpNeto: 100,
    ImpOpEx: 0,
    ImpIVA: 21,
    ImpTrib: 0,
    MonId: 'PES',
    MonCotiz: 1,
    Iva: {
      AlicIva: [
        {
          Id: 5,
          BaseImp: 100,
          Importe: 21
        }
      ]
    }
  };

  const caeResponse = await afipClient.solicitarCae(authParams, ultimoComprobante.FECompUltimoAutorizadoResult.CbteNro, feDetRequest);

  console.log('CAE Response:', caeResponse);
})();
