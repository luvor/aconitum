<template>
  <div id="app">
    <OrgStructure />
  </div>
</template>

<script>
import OrgStructure from "@/views/OrgStructure.vue";
export default {
  name: "App",
  components: {
    OrgStructure,
  },
  mounted() {
    this.$store.dispatch("fetchData");
  },
};
</script>

<style>
@import "./assets/css/index.scss";
</style>
