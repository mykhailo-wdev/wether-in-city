<template>
  <div class="weather">
    <h1 class="weather__title">Прогноз погоди</h1>
    <p class="weather__subtitle">Дізнатись погоду в {{ city === '' ? 'Вашому місті' : city }}</p>
    <div class="weather__search">
      <input 
        type="text" 
        class="weather__search__input" 
        placeholder="Введіть назву міста" 
        :value="city"
        @input="updateCity($event.target.value)"
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
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState([
      'city',
      'error',
      'weatherIconUrl',
      'description',
      'temp',
      'feelLike',
      'pressure',
      'humidity',
      'wind',
      'degreeSymbol'
    ])
  },
  methods: {
    ...mapActions(['getWeather']),
    clearWeatherData() {
      this.$store.commit('clearWeatherData');
    },
    updateCity(value) {
      this.$store.commit('setCity', value);
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
