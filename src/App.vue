<template>
  <div id="app" :class="currentTheme">
    <Sidebar/>
    <main>
      <SampleText/>
      <Typeface/>
    </main>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar';
import SampleText from './components/SampleText';
import Typeface from './components/Typeface';

export default {
  name: 'app',
  data() {
    return {
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.getTheme;
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

</style>
