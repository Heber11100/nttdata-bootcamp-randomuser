// Servicio externo: RandomUser API (documentación: https://randomuser.me/documentation)
import fetch from 'node-fetch';

const RANDOMUSER_URL = 'https://randomuser.me/api/?results=';

export async function getUsers(count = 10) {
  const resp = await fetch(`${RANDOMUSER_URL}${count}`);
  if (!resp.ok) throw new Error(`RandomUser error: ${resp.status}`);
  const json = await resp.json();

  return json.results.map(u => ({
    name: `${capitalize(u.name.first)} ${capitalize(u.name.last)}`,
    gender: u.gender, // 'male' | 'female'
    location: `${u.location.city}, ${u.location.state}, ${u.location.country}`,
    email: u.email,
    dob: u.dob.date, // ISO string
    photo: u.picture.large
  }));
}

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
}
