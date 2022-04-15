<template>
  <div class="OrgStuctureTable">
    <table v-if="data" class="OrgStuctureTable__table noselect">
      <tr>
        <th class="OrgStuctureTable__th"></th>
        <th class="OrgStuctureTable__th">Общее количество</th>
        <th class="OrgStuctureTable__th">Фактическое количество</th>
        <th class="OrgStuctureTable__th">Действия</th>
      </tr>
      <OrgStructureTableItem
        v-for="(value, name) in data"
        :key="name"
        :name="name"
        :self="value['Данные']"
        :children="value['Подразделения']"
      />
    </table>
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
.OrgStuctureTable {
  margin-top: 1rem;
  &__table {
    border-collapse: collapse;
    width: 100%;
  }
  &__th {
    padding: 10px;
    background-color: #2d3e50;
    color: #fff;
    text-transform: uppercase;
    margin-bottom: 1rem;
    font-weight: 400;
    border-right: 1px solid #fff;
    text-align: left;
  }
}
</style>
