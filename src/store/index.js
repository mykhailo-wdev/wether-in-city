import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    city: '',
    error: '',
    weatherIconUrl: '',
    description: '',
    temp: null,
    feelLike: null,
    pressure: null,
    humidity: null,
    wind: null,
    degreeSymbol: '&#8451;'
  },
  getters: {
  },
  actions: {
    async getWeather({ commit, state }) {
        if (state.city.trim().length < 2) {
          commit('setError', 'Введене значення має бути більше 2 символів');
          return false;
        }
        commit('setError', '');
        try {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${state.city}&units=metric&lang=ua&appid=a8659d580c28d90db90d9619e729c8cd`);
          const weatherData = response.data.weather[0];
          commit('setWeatherData', {
            weatherIconUrl: `https://openweathermap.org/img/wn/${weatherData.icon}.png`,
            temp: response.data.main.temp,
            feelLike: response.data.main.feels_like,
            description: weatherData.description,
            pressure: response.data.main.pressure,
            humidity: response.data.main.humidity,
            wind: response.data.wind.speed
          });
        } catch (err) {
          commit('setError', 'Даного міста не існує, або Ви зробили помилку у введені даних, будь ласка, спробуйте ще раз');
        }
    }
  },
  mutations: {
    setCity(state, city) {
        state.city = city;
      },
      setError(state, error) {
        state.error = error;
      },
      setWeatherData(state, weatherData) {
        state.weatherIconUrl = weatherData.weatherIconUrl;
        state.description = weatherData.description;
        state.temp = weatherData.temp;
        state.feelLike = weatherData.feelLike;
        state.pressure = weatherData.pressure;
        state.humidity = weatherData.humidity;
        state.wind = weatherData.wind;
      },
      clearWeatherData(state) {
        state.weatherIconUrl = '';
        state.description = '';
        state.temp = null;
        state.feelLike = null;
        state.pressure = null;
        state.humidity = null;
        state.wind = null;
        state.error = '';
      }
  }
})
