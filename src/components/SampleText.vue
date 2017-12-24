<template>
  <div>
      <div class="textBoard">
        <textarea id="text_input" placeholder="Sample Text"></textarea>
        <pre></pre>
      </div>
  </div>
</template>

<style scoped>
.textBoard {
  margin: 1.5rem 1rem;
  border-bottom: .1rem solid var(--accent-color);
}

.textBoard pre {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  font-family: inherit;
  margin-top: 0;
}

.textBoard .text_sample {
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
  data() {
    return {
    };
  },
};
</script>
