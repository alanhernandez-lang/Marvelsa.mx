// src/data/brands.js
import logoKawashima from '../assets/images/KAWASHIMA-Logo.png';
import logoParazzini from '../assets/images/PARAZZINI-Logo.png';
import logoGoldenTree from '../assets/images/GOLDENTREE-Logo.png';
import logoPowerHunt from '../assets/images/POWERHUNT-Logo.png';
import logoTakashi from '../assets/images/TAKASHI.Logo.png';

export const brands = {
  kawashima: {
    id: 'kawashima',
    name: 'Kawashima',
    theme: 'theme-kawashima',
    slogan: 'Tecnología Japonesa en Movimiento',
    description: 'Líder en maquinaria motorizada para agricultura y construcción.',
    logo: logoKawashima,
    products: [],
  },
  parazzini: {
    id: 'parazzini',
    name: 'Parazzini',
    theme: 'theme-parazzini',
    slogan: 'Pasión por el Paisajismo',
    description: 'Equipos de jardinería premium para profesionales.',
    logo: logoParazzini,
  },
  goldentree: {
    id: 'goldentree',
    name: 'Golden Tree',
    theme: 'theme-goldentree',
    slogan: 'Nutriendo tus Cosechas',
    description: 'Expertos en fertilización y sanidad vegetal de alta gama.',
    logo: logoGoldenTree,
    products: [],
  },
  powerhunt: {
    id: 'powerhunt',
    name: 'PowerHunt',
    theme: 'theme-powerhunt',
    slogan: 'Energía que Nunca se Detiene',
    description: 'Generadores eléctricos y soluciones de energía para la industria.',
    logo: logoPowerHunt,
  },
  takashi: {
    id: 'takashi',
    name: 'Takashi',
    theme: 'theme-takashi',
    slogan: 'Precisión y Fuerza',
    description: 'Maquinaria de alta tecnología para el campo mexicano.',
    logo: logoTakashi,
  },
};
