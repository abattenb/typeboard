<template>
  <div>
    {{ item.family }}
  </div>
</template>

<script>
export default {
  props: {
    item: { required: true },
    searchText: { required: true },
  },
};
</script>

<style lang="scss" scoped>
div {
  transition: none;
}
div:hover {
  cursor: pointer;
  color: var(--background-color);
  background: var(--text-color);
  transition: none;
}
</style>
