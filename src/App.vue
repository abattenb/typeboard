<template>
  <div id="app" :class="currentTheme">
    <Sidebar/>
    <main>
      <SampleText/>
      <div class="characterBoard">
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
      settings: '',
    };
  },
  created() {
    this.settings = this.$store.getters.getSettings;
    console.log(this.settings);
  },
  computed: {
    currentTheme() {
      return this.settings.theme;
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
