import cities from "../../assets/data/cities.json";
export const citiesNames = () => cities.map((city) => city.name);
export const getCity = (name) => cities.find((city) => city.name === name);
export const get_city_by_param = (value, param) =>
  cities.find((city) => city[param] === value);
