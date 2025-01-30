export interface Preferenza {
    CrmID: number;
    IDCliente: number;
    IDMarca: number;
    IDGruppo: number;
    IDCategoria: number;
    IDSottoCategoria: number;
    Annullato: boolean;
    IDProdotto: string;
    Gradimento: number;
    Note: string;
    NomeBrand: string;
    DataInserimento: string;   // Date
    DataModifica: string;  // Date
}