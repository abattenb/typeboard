<template>
  <div id="app" class="theme_black_white">
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
  components: {
    Sidebar,
    SampleText,
    Typeface,
  },
};
</script>

<style>

</style>
