<template>
  <div class="weather">
    <h1 class="weather__title">Прогноз погоди</h1>
    <p class="weather__subtitle">Дізнатись погоду в {{ city === '' ? 'Вашому місті' : city }}</p>
    <div class="weather__search">
      <input 
        type="text" 
        class="weather__search__input" 
        placeholder="Введіть назву міста" 
        v-model="city" 
        @keyup.enter="getWeather"
      >
      <button v-if="city !== ''" class="btn" @click="getWeather">Дізнатись погоду</button>
      <button v-else class="btn" disabled>Дізнатись погоду</button>
    </div>
    <div class="weather__parameters" v-show="temp !== null">
      <img :src="weatherIconUrl" class="weather__icon" alt="Weather icon" />
      <p class="weather__details weather__temp-min"> {{ description }}</p>
      <p class="weather__details weather__temp">Температура: {{ temp }} <span v-html="degreeSymbol"></span></p>
      <p class="weather__details weather__feel_like">Відчувається як: {{ feelLike }} <span v-html="degreeSymbol"></span></p>
      <p class="weather__details weather__temp-max">Атмосферний тиск: {{ pressure }} мм рт.ст</p>
      <p class="weather__details weather__temp-max">Вологість повітря: {{ humidity }} %</p>
      <p class="weather__details weather__temp-max">Швидкість вітру: {{ wind }} м/с</p>
    </div>
    <p class="weather__error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  data () {
    return {
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
    }
  },
  methods: {
    async getWeather () {
      if (this.city.trim().length < 2) {
        this.error = 'Введене значення має бути більше 2 символів'
        return false
      }
      this.error = ''
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&lang=ua&appid=a8659d580c28d90db90d9619e729c8cd`);
        const weatherData = response.data.weather[0];
        this.weatherIconUrl = `https://openweathermap.org/img/wn/${weatherData.icon}.png`;
        this.temp = response.data.main.temp;
        this.feelLike = response.data.main.feels_like;
        this.description = weatherData.description;
        this.pressure = response.data.main.pressure;
        this.humidity = response.data.main.humidity;
        this.wind = response.data.wind.speed;
      } catch (err) {
        this.error = 'Даного міста не існує, або Ви зробили помилку у введені даних, будь ласка, спробуйте ще раз';
      }
    },
    clearWeatherData() {
      this.weatherIconUrl = '';
      this.description = '';
      this.temp = null;
      this.feelLike = null;
      this.pressure = null;
      this.humidity = null;
      this.wind = null;
      this.error = '';
    }
  },
  watch: {
    city(newCity) {
      if (newCity === '') {
        this.clearWeatherData();
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #e0c3fc, #8ec5fc);
  .weather {
    display: block;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 40px;
    border-radius: 32px;
    background: #1f0f24;
    &__title {
      font-size: 32px;
      line-height: normal;
      font-weight: 700;
      color: #ffffff;
      text-align: center;
    }
    &__subtitle {
      font-size: 18px;
      line-height: normal;
      font-weight: 400;
      color: #ffffff;
      text-align: center;
      margin-top: 16px;
    }
    &__parameters {
      margin-top: 32px;
    }
    &__details {
      font-size: 18px;
      line-height: normal;
      font-weight: 700;
      color: #ffffff;
      text-align: center;
      &::first-letter {
        text-transform: uppercase;
      }
    }
    &__error {
      font-size: 12px;
      line-height: normal;
      font-weight: 600;
      color: #a10000;
      margin-top: 8px;
      text-align: center;
    }
    &__icon {
      display: block;
      margin: 0 auto;
      margin-top: 16px;
    }
  }
  .weather__search {
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    &__input {
      outline: none;
      background: transparent;
      border: none;
      border-bottom: 2px solid #110813;
      color: #fcfcfc;
      font-size: 14px;
      padding: 8px 6px;
      &:focus::-webkit-input-placeholder {
        color: transparent;
      }
      &:focus::-moz-placeholder {
        color: transparent;
      }
      &:focus:-moz-placeholder {
        color: transparent;
      }
      &:focus:-ms-input-placeholder {
        color: transparent;
      }
    }
    .btn {
      border: none;
      cursor: pointer;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      line-height: 40px;
      background: #f1db34;
      border-radius: 8px;
      padding: 0 16px;
    }
  }
}
</style>
