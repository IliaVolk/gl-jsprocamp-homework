// с помощью Fetch API и swapi.co API получить следующие данные
import fetch from 'isomorphic-fetch';
// Климат на любой планете по её имени
// {planetName} – String

const baseUrl = 'https://swapi.co/api/';

const getClimate = async function(planetName) {
    const response = await fetch(`${baseUrl}planets?search=${encodeURIComponent(planetName)}`);
    const json = await response.json();
    if (json.count === 0) {
        throw new Error('No such planet');
    }
    return json.results[0].climate;
};

// Получить информацию (Object) о любом персонаже по имени
// {name} – String
const getProfile = async function(name) {
    const response = await fetch(`${baseUrl}people?search=${encodeURIComponent(name)}`);
    const json = await response.json();
    if (json.count === 0) {
        throw new Error('No such people');
    }
    return json.results[0];
};

// Получить список пилотов (имена в виде Array of Strings) космического корабля
// по его названию
// {starshipName} - String
const getPilots = async function(starshipName) {
    const response = await fetch(`${baseUrl}vehicles?search=${encodeURIComponent(starshipName)}`);
    const json = await response.json();
    if (json.count === 0) {
        throw new Error('No such ship');
    }
    return Promise.all(json.results[0].pilots.map(async url => {
        const res = await fetch(url);
        const json = await res.json();
        return json.name;
    }));
};


export default {
  getClimate,
  getProfile,
  getPilots
}
