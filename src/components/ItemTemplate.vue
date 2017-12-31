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
