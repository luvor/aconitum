<template>
  <div v-if="allData" class="OrgStructure">
    <OrgStructureHeader title="Организационная структура" />
    <OrgStructureTable :data="allData" />
  </div>
</template>
<script>
import OrgStructureHeader from "@/components/orgStructure/OrgStructureHeader.vue";
import OrgStructureTable from "@/components/orgStructure/OrgStructureTable.vue";

import { mapGetters } from "vuex";

export default {
  name: "OrgStructure",
  components: {
    OrgStructureHeader,
    OrgStructureTable,
  },
  computed: mapGetters(["allData"]),
};
</script>
<style lang="scss">
.OrgStructure {
  overflow-x: scroll;
}
</style>
