<template>
  <div 
    id="app"
    :class="currentTheme"
    :style="fullStyles"
    :pro-mode="isProMode">
    <Sidebar/>
    <main>
      <SampleText :settings="settings" />
      <div class="characterBoard">
        <!-- TODO: Add Typeboarc component to columns -->
        <div v-for="(typeface, $index) in settings.selectedType" :key="$index">
          <Typeface :typeface="typeface" :settings="settings"/>
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
      settings: '',
      proMode: '',
    };
  },
  created() {
    this.settings = this.$store.getters.getSettings;
  },
  computed: {
    currentTheme() {
      return this.settings.theme;
    },
    isProMode() {
      console.log(this.settings.proMode);
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
