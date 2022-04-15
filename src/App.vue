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
};
</script>

<style>
@import "./assets/css/index.css";
</style>
