<template>
  <div class="OrgStructure">
    <OrgStructureHeader title="Организационная структура" />
    <OrgStructureTable :data="data" />
  </div>
</template>
<script>
import OrgStructureHeader from "@/components/orgStructure/OrgStructureHeader.vue";
import OrgStructureTable from "@/components/orgStructure/OrgStructureTable.vue";

import { data } from "@/mock.js";
export default {
  name: "OrgStructure",
  data() {
    return {
      data: data,
    };
  },
  components: {
    OrgStructureHeader,
    OrgStructureTable,
  },
};
</script>
