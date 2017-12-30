<template>
  <div 
    id="app"
    :style="fullStyles"
    :pro-mode="isProMode">
    <Sidebar :settings="settings" @reset="resetSettings"/>
    <main>
      <SampleText :settings="settings" />
      <div class="characterBoard">
        <!-- TODO: Add Typeboarc component to columns -->
        <div v-for="(typeface, $index) in settings.selectedType" :key="$index">
          <Typeface :typeface="typeface"/>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar';
import SampleText from './components/SampleText';
import Typeface from './components/Typeface';

/* eslint-disable */

const defaultSettings = {
  selectedType: ['Arial', 'Times New Roman', 'Courier'],
  fontSize: '1',
  fontWeight: '400',
  letterSpacing: '0',
  italics: false,
  sampleText: 'Sphinx of black quartz, judge my vow.',
  proMode: false,
  colorHistory: '',
};

export default {
  name: 'app',
  data() {
    return {
      settings: '',
    };
  },
  created() {
    if (localStorage.getItem('settings') !== null) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    } else {
      this.settings = defaultSettings;
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
    saveSettings() {
      localStorage.setItem('settings', JSON.stringify(this.settings));
    },
    resetSettings() {
      localStorage.removeItem('settings');
      this.settings = defaultSettings;
      console.log(this.settings);
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
