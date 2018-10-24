import axios from 'axios';
import { map, flatten } from 'lodash';
import stubData from '../serverLib/asteroids.json';

const getRows = data => {
  const flattened = flatten(map(data.near_earth_objects, v => v));
  const rows = flattened.map(asteroid => {
    const speed = asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour;
    const arrives = asteroid.close_approach_data[0].epoch_date_close_approach;
    const hoursUntilArrival = (new Date().getTime() - arrives) / 1000 / 60 / 60;
    const kilometersFromEarth = Math.abs(hoursUntilArrival * speed);
    const missKilometers = Math.floor(asteroid.close_approach_data[0].miss_distance.kilometers);

    return {
      date: asteroid.close_approach_data[0].epoch_date_close_approach,
      id: asteroid.neo_reference_id,
      name: asteroid.name,
      url: asteroid.nasa_jpl_url,
      diameter_meters: asteroid.estimated_diameter.meters.estimated_diameter_max,
      velocity_kilometers: Math.floor(
        asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour
      ),
      miss_kilometers: missKilometers,
      distance_kiometers: Math.floor(kilometersFromEarth) + missKilometers,
      is_hazardous: asteroid.is_potentially_hazardous_asteroid,
    };
  });
  return {
    type: 'datatable',
    columns: [
      { name: 'date', type: 'date' },
      { name: 'id', type: 'number' },
      { name: 'name', type: 'string' },
      { name: 'url', type: 'string' },
      { name: 'diameter_meters', type: 'number' },
      { name: 'velocity_kilometers', type: 'number' },
      { name: 'miss_kilometers', type: 'number' },
      { name: 'distance_kiometers', type: 'number' },
      { name: 'is_hazardous', type: 'boolean' },
    ],
    rows,
  };
};

canvas.register(() => ({
  name: 'asteroids',
  type: 'datatable',
  help: 'Space is terrifying. These are the asteroids that are going to kill us.',
  context: {
    types: ['filter'],
  },
  args: {
    from: {
      types: ['string'],
      help: 'Start date',
      default: '2018-06-06',
    },
    to: {
      types: ['string'],
      help: 'End date. Within 7 days after `from`',
      default: '2018-06-13',
    },
  },
  fn(context, args) {
    const { from, to } = args;
    return getRows(stubData);
    return axios
      .get(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${from}&end_date=${to}&api_key=ZZUsJEfyonLUcaOU1dfmbfmfqOPaSfxw7MmsPiJI`
      )
      .then(res => res.data)
      .then(data => getRows(data))
      .catch(() => getRows(stubData));
  },
}));
