import { get } from 'lodash'

export const bodiesScale = 10000

export function getElement (englishName, element) {
  return get(bodies, `[${englishName}].${element}`, 0) / bodiesScale
}

export function getEquaRadius (englishName) {
  return get(bodies, `[${englishName}].equaRadius`, 0) / bodiesScale
}

export function getPerihelion (englishName) {
  return get(bodies, `[${englishName}].perihelion`, 0) / bodiesScale
}

const bodies = {
  Moon:
  {
    id: 'lune',
    name: 'La Lune',
    englishName: 'Moon',
    isPlanet: false,
    moons: null,
    semimajorAxis: 384400,
    perihelion: 363300,
    aphelion: 405500,
    eccentricity: 0.0549,
    inclination: 5.145,
    mass: { massValue: 7.346, massExponent: 22 },
    vol: { volValue: 2.1968, volExponent: 10 },
    density: 3.344,
    gravity: 1.62,
    escape: 2380.0,
    meanRadius: 33.0,
    equaRadius: 1738.1,
    polarRadius: 1736.0,
    flattening: 0.0012,
    dimension: '',
    sideralOrbit: 27.3217,
    sideralRotation: 655.728,
    aroundPlanet: {
      planet: 'terre',
      rel: 'https://api.le-systeme-solaire.net/rest/bodies/terre'
    },
    discoveredBy: '',
    discoveryDate: '',
    alternativeName: '',
    rel: 'https://api.le-systeme-solaire.net/rest/bodies/lune'
  },
  Sun:
  {
    id: 'soleil',
    name: 'Le Soleil',
    englishName: 'Sun',
    isPlanet: false,
    moons: null,
    semimajorAxis: 0,
    perihelion: 0,
    aphelion: 0,
    eccentricity: 0.0,
    inclination: 0.0,
    mass: { massValue: 2.4, massExponent: 16 },
    vol: null,
    density: 1.0,
    gravity: 0.0,
    escape: 0.0,
    meanRadius: 33.0,
    equaRadius: 0.0,
    polarRadius: 0.0,
    flattening: 0.0,
    dimension: '39×37×25',
    sideralOrbit: 2.74,
    sideralRotation: 0.0,
    aroundPlanet: null,
    discoveredBy: '',
    discoveryDate: '',
    alternativeName: '',
    rel: 'https://api.le-systeme-solaire.net/rest/bodies/soleil'
  },
  Earth:
  {
    id: 'terre',
    name: 'La Terre',
    englishName: 'Earth',
    isPlanet: true,
    moons: [
      {
        moon: 'La Lune',
        rel: 'https://api.le-systeme-solaire.net/rest/bodies/lune'
      }
    ],
    semimajorAxis: 149598262,
    perihelion: 147095000,
    aphelion: 152100000,
    eccentricity: 0.0167,
    inclination: 0.0,
    mass: { massValue: 5.97237, massExponent: 24 },
    vol: { volValue: 1.08321, volExponent: 12 },
    density: 5.5136,
    gravity: 9.8,
    escape: 11190.0,
    meanRadius: 6371.0084,
    equaRadius: 6378.1366,
    polarRadius: 6356.8,
    flattening: 0.00335,
    dimension: '',
    sideralOrbit: 365.256,
    sideralRotation: 23.9345,
    aroundPlanet: null,
    discoveredBy: '',
    discoveryDate: '',
    alternativeName: '',
    rel: 'https://api.le-systeme-solaire.net/rest/bodies/terre'
  }
}
