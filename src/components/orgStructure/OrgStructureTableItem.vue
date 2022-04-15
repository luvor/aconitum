<template>
  <div>
    <tr class="OrgStructureTableItem">
      <td
        v-if="name && self"
        @click.stop="handleUnwrap"
        class="OrgStructureTableItem__label"
      >
        <div class="OrgStructureTableItem__name">
          <svg
            class="OrgStructureTableItem__chevron"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.42Z"
            ></path>
          </svg>
          {{ name }}
        </div>
      </td>
      <td>
        {{ self["Общее количество"] }}
      </td>
      <td>
        {{ self["Фактическое количество"] }}
      </td>
    </tr>
    <div v-if="children" class="OrgStructureTableItem__children">
      <OrgStructureTableItem
        v-for="(v, n) in children"
        :key="name + '_' + n"
        :name="n"
        :self="v['Данные']"
        :children="v['Подразделения']"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "OrgStructureTableItem",
  props: {
    name: {
      type: String,
      default: null,
    },
    self: {
      type: Object,
      default: null,
    },
    children: {
      type: Object,
      default: null,
    },
  },
  methods: {
    handleUnwrap(e) {
      if (e.target.getAttribute("class") === "OrgStructureTableItem") {
        e.target.setAttribute("class", "OrgStructureTableItem active");

        e.target
          .querySelector(".OrgStructureTableItem__children")
          .setAttribute("class", "OrgStructureTableItem__children active");
      } else {
        e.target.setAttribute("class", "OrgStructureTableItem");
        e.target
          .querySelector(".OrgStructureTableItem__children")
          .setAttribute("class", "OrgStructureTableItem__children");
      }
    },
  },
  mounted() {
    console.log(this.children);
  },
};
</script>
<style lang="scss">
.OrgStructureTableItem {
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  border-bottom: 1px solid #ccc;

  &__name {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    background-color: #fff;
    color: #333;
    font-weight: 400;
    text-indent: 10px;
  }
  &.active {
    background-color: #333;
    color: #fff;
    &__self {
      &__chevron {
        transform: rotate(90deg);
      }
    }
  }
  &__children {
    /* display: none; */
    margin-left: 20px;
    &.active {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
