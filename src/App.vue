<template>
  <div id="app">
    <img src="./assets/logo.png">
    <Sidebar/>
    <SampleText/>
    <Typeface/>
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
