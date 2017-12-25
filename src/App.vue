<template>
  <div 
    id="app"
    :class="currentTheme"
    :style="fullStyles"
    :pro-mode="isProMode">
    <Sidebar :settings="settings"/>
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

/* eslint-disable no-console */

export default {
  name: 'app',
  data() {
    return {
      settings: {
        selectedType: ['Arial', 'Times New Roman', 'Courier'],
        theme: 'theme_black_white',
        fontSize: '2',
        fontWeight: '400',
        letterSpacing: '0',
        italics: false,
        sampleText: 'Sphinx of black quartz, judge my vow.',
        proMode: false,
      },
    };
  },
  created() {
    if (localStorage.getItem('settings') !== null) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
  },
  watch: {
    settings: {
      handler() {
        this.save();
      },
      deep: true,
    },
  },
  methods: {
    save() {
      console.log(this.settings);
      localStorage.setItem('settings', JSON.stringify(this.settings));
    },
  },
  computed: {
    currentTheme() {
      return this.settings.theme;
    },
    isProMode() {
      return this.settings.proMode;
    },
    fullStyles() {
      const italics = this.settings.italics ? 'italic' : 'normal';
      const fullStyles = `
        --column-font-size: ${this.settings.fontSize}rem;
        --font-weight: ${this.settings.fontWeight};
        --letter-spacing: ${this.settings.letterSpacing}rem;
        --font-style: ${italics};`;
      return fullStyles;
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
