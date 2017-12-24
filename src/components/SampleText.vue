<template>
  <div>
    <div class="textBoard">
      <textarea 
        v-model="settings.sampleText"
        placeholder="Sample Text">
      </textarea>
      <pre
        v-for="(typeface, $index) in settings.selectedType"
        :key="$index"
        class="textSample"
        :style="{fontFamily: typeface}">{{ settings.sampleText }}</pre>
    </div>
  </div>
</template>

<style scoped>
.textBoard {
  margin: 1.5rem 1rem;
  border-bottom: .1rem solid var(--accent-color);
}

.textBoard textarea {
  color: var(--text-color);
}

.textBoard pre {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  font-family: inherit;
  margin-top: 0;
}

.textBoard .textSample {
  font-size: var(--column-font-size);
  font-weight: var(--font-weight);
  font-style: var(--font-style);
  letter-spacing: var(--letter-spacing);
  margin: .5rem 0;
}

</style>

<script>
export default {
  name: 'SampleText',
  props: [
    'settings',
  ],
  data() {
    return {
    };
  },
};
</script>
