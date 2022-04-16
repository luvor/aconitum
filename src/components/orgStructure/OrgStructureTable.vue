<template>
  <div class="OrgStructureTable noselect">
    <div class="OrgStructureTable__header">
      <div class="OrgStructureTable__headerItem"></div>
      <div class="OrgStructureTable__headerItem">Общее количество</div>
      <div class="OrgStructureTable__headerItem">Фактическое количество</div>
      <div class="OrgStructureTable__headerItem">Действия</div>
    </div>
    <OrgStructureTableItem
      v-for="(v, n) in data"
      :key="n"
      :id="n"
      :name="n"
      :self="v['Данные']"
      :children="v['Подразделения']"
    />
  </div>
</template>
<script>
import OrgStructureTableItem from "@/components/orgStructure/OrgStructureTableItem.vue";
export default {
  name: "OrgStructureTable",
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  components: {
    OrgStructureTableItem,
  },
  mounted() {
    // console.log(this.data);
  },
};
</script>
<style lang="scss">
.OrgStructureTable {
  margin-top: 1rem;
  &__table {
    width: 100%;
  }
  &__header {
    display: flex;
    justify-content: flex-end;
    background-color: #2d3e50;
    color: #fff;
    text-align: left;
    &Item {
      min-width: fit-content;
      padding: 15px 2em;
      text-align: left;
      border-right: 1px solid #fff;
    }
  }
}
</style>
