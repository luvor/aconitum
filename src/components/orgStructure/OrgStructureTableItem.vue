<template>
  <div
    class="OrgStructureTableItem"
    v-if="name && self"
    :ref="id"
    @click.stop="() => handleUnwrap(id)"
  >
    <div class="OrgStructureTableItem__self">
      <div class="OrgStructureTableItem__label">
        <svg
          v-if="children"
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
      <div class="OrgStructureTableItem__total">
        {{ self["Общее количество"] }}
      </div>
      <div class="OrgStructureTableItem__actual">
        {{ self["Фактическое количество"] }}
      </div>
    </div>
    <div v-if="children" class="OrgStructureTableItem__children">
      <OrgStructureTableItem
        v-for="(v, n) in children"
        :key="name + '_' + n"
        :id="name + '_' + n"
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
    id: {
      type: String,
      default: null,
    },
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
    handleUnwrap(id) {
      const t = this.$refs[id];
      //   console.log(t);
      if (t.getAttribute("class") === "OrgStructureTableItem") {
        t.setAttribute(
          "class",
          "OrgStructureTableItem OrgStructureTableItem-active"
        );
      } else {
        t.setAttribute("class", "OrgStructureTableItem");
      }
    },
  },
  mounted() {
    // console.log(this.name);
  },
};
</script>
<style lang="scss">
.OrgStructureTableItem {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-align: left;
  &__self {
    display: flex;
    align-items: center;
    padding: 5px;
    border-bottom: 1px solid #f1f1f1;
  }
  &__label {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    color: #333;
    font-weight: 400;
    text-indent: 10px;
  }
  &__total {
    width: 250px;
    margin-left: 20px;
  }
  &__actual {
    margin-left: 20px;
    width: 250px;
  }
  &__children {
    background-color: rgba($color: #7cb1ff, $alpha: 0.2);
    display: none;
    > div.OrgStructureTableItem {
      padding-left: 20px;
      div.OrgStructureTableItem__self {
        padding-left: 20px;
      }
    }
  }
  &-active {
    color: #fff;
    > div.OrgStructureTableItem__self {
      svg.OrgStructureTableItem__chevron {
        transform: rotate(90deg);
      }
    }
    > div.OrgStructureTableItem__children {
      display: block;
    }
  }
}
</style>
