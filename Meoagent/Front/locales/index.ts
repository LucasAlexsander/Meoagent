import en from './en'
import pt from './pt'
import es from './es'

const locales = {
  en,
  pt,
  es
}

const servicesLocales = {
  en:{
    'Acompanhamento para compra de imóvel': 'Buyer Follow-up',
    'Venda de imóvel': 'Properties sell',
    'Seleção de inquilino e gestão de arrendamento': 'Tenant selection and Lease management.',
    'Seleção de inquilino': 'Tenant selection',
    'Realocation': 'Realocation'
  },
  pt:{
    'Acompanhamento para compra de imóvel': 'Acompanhamento para compra de imóvel',
    'Venda de imóvel': 'Venda de imóvel',
    'Seleção de inquilino e gestão de arrendamento':'Seleção de inquilino e gestão de arrendamento',
    'Seleção de inquilino': 'Seleção de inquilino',
    'Realocation': 'Realocation'
  },
  es:{
    'Acompanhamento para compra de imóvel': 'Acompañamiento para la compra de inmuebles',
    'Venda de imóvel': 'Venta de propiedad.',
    'Seleção de inquilino e gestão de arrendamento': 'Selección de inquilinos y gestión de arrendamientos.',
    'Seleção de inquilino': 'Selección de inquilinos',
    'Realocation': 'Reubicación'
  }
}

export default locales

export {
  servicesLocales
}