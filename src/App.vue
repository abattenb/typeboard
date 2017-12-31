<template>
  <div 
    id="app"
    :style="fullStyles"
    :pro-mode="isProMode">
    <Sidebar 
      :settings="settings" 
      :fontList="fontList"
      :localType="localType"
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
import { log } from './common/utils';

import Sidebar from './components/Sidebar';
import SampleText from './components/SampleText';
import Typeface from './components/Typeface';

/* eslint-disable */
const localType = ['Arial', 'Times New Roman', 'Courier'];

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
      localType: localType,
      fontList: [],
      googleFontUrl: 'https://www.googleapis.com/webfonts/v1/webfonts?key=',
    };
  },
  created() {
    this.initFontList();
    this.initSettings();
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
    initFontList() {
      // Check if fontListCache in localStorage exists
      if (localStorage.getItem('fontListCache') !== null && Date.now() <= localStorage.getItem('fontsExpire')) {
        // Load font list
        this.fontList = JSON.parse(localStorage.getItem('fontListCache'));
        log('Font cache loaded', 'OK');
      } else {
        // Fetch from Google Fonts API
        api.get(`${this.googleFontUrl}${process.env.GOOGLE_API_KEY}`)
          .then(result => {
            // Strip just the font names
            this.fontList = result.data.items.map(x => x.family);
            // Cache font list in localStorage
            localStorage.setItem('fontListCache', JSON.stringify(this.fontList));
            // Set an expiry 1 day in the future
            localStorage.setItem('fontsExpire', (Date.now() + 86400000));
          })
          .catch(error => console.log(error));
      }
    },
    initSettings() {
      if (localStorage.getItem('settings') !== null) {
        this.settings = JSON.parse(localStorage.getItem('settings'));
        log('User settings loaded', 'OK');
      } else {
        this.settings = this.deepCopy(defaultSettings);
      }
    },
    resetSettings() {
      log('Settings Reset', 'OK');
      localStorage.clear();
      this.initFontList();
      this.initSettings();
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
