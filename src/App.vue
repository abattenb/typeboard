<template>
  <div 
    id="app"
    :style="fullStyles"
    :pro-mode="isProMode">
    <Sidebar 
      :settings="settings" 
      :fontList="fontList"
      @reset="resetSettings"/>
    <main>
      <SampleText :settings="settings" />
      <div class="characterBoard">
        <div v-for="(typeface, $index) in settings.selectedType" :key="$index">
          <Typeface :typeface="typeface"/>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import api from 'axios';

import Sidebar from './components/Sidebar';
import SampleText from './components/SampleText';
import Typeface from './components/Typeface';

/* eslint-disable */

const defaultSettings = Object.freeze({
  selectedType: ['Arial', 'Times New Roman', 'Courier'],
  fontSize: '1',
  fontWeight: '400',
  letterSpacing: '0',
  italics: false,
  sampleText: 'Sphinx of black quartz, judge my vow.',
  proMode: false,
  colorHistory: '',
});

export default {
  name: 'app',
  data() {
    return {
      settings: '',
      fontList: [],
      googleFontUrl: 'https://www.googleapis.com/webfonts/v1/webfonts?key=',
    };
  },
  created() {
    // TODO: Cache result in localStorage
    api.get(`${this.googleFontUrl}${process.env.GOOGLE_API_KEY}`)
      .then(result => this.fontList = result.data.items)
      .catch(error => console.log(error));

    if (localStorage.getItem('settings') !== null) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    } else {
      this.settings = this.deepCopy(defaultSettings);
    }
  },
  watch: {
    settings: {
      handler() {
        this.saveSettings();
      },
      deep: true,
    },
  },
  methods: {
    deepCopy: object => JSON.parse(JSON.stringify(object)),
    saveSettings() {
      localStorage.setItem('settings', JSON.stringify(this.settings));
    },
    resetSettings() {
      console.log('Settings Reset');
      localStorage.removeItem('settings');
      this.settings = this.deepCopy(defaultSettings);
    },
  },
  computed: {
    isProMode() {
      return this.settings.proMode;
    },
    fullStyles() {
      let colors = '';
      for(let key in this.settings.colorHistory[0]) {
        colors += `${key}: ${this.settings.colorHistory[0][key]};`;
      }
      const italics = this.settings.italics ? 'italic' : 'normal';
      const fullStyles = `
        --column-font-size: ${this.settings.fontSize}rem;
        --font-weight: ${this.settings.fontWeight};
        --letter-spacing: ${this.settings.letterSpacing}rem;
        --font-style: ${italics};`;
      return `${fullStyles}${colors}`;
    },
  },
  components: {
    Sidebar,
    SampleText,
    Typeface,
  },
};
</script>

<style>
.characterBoard {
  display: flex;
}

</style>
