export interface Estacion {
    codEstacion: string,
    codTipoEstacion: string,
    nombreEstacion: string,
    codCategoria: string,
    codDepartamento: string,
    codProvincia: string,
    codDistrito: string,
    nombreAnteriorEstacion: string,
    longitudGrado: string,
    longitudMinuto: string,
    longitudSegundo: string,
    longitudSIG: string,
    latitudGrado: string,
    latitudMinuto: string,
    latitudSegundo: string,
    latitudSIG: string,
    alturamsnm: string,
    codCondicion: string,
    codigoTipoEstacion: string,
    claseEstacion: string,
    tipoEstacion: {
      codigoTipo: string,
      descripcionTipo: string
    },
    categoriaEstacion: {
      codigoCategoria: string,
      codigoTipo: string,
      descripcionCategoriaL: string,
      descripcionCategoriaC: string
    }
}