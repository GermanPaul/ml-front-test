<template>
  <div id="app">
    <search-box />
    <router-view />
  </div>
</template>

<script>
import SearchBox from "@/components/searchBox.vue";

export default {
  components: {
    SearchBox,
  },
};
</script>