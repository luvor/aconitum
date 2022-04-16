<template>
  <div
    class="OrgStructureTableItem"
    v-if="name"
    :ref="id"
    @click.stop="() => handleUnwrap(id)"
  >
    <div class="OrgStructureTableItem__self">
      <div class="OrgStructureTableItem__label">
        <svg
          v-if="self['Подразделения']"
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
        {{ people.total }}
      </div>
      <div class="OrgStructureTableItem__actual">
        {{ people.actual }}
      </div>
      <div class="OrgStructureTableItem__actions">
        <button class="OrgStructureTableItem__actions-edit">
          <svg width="2em" height="2em" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25Z"
            ></path>
          </svg>
        </button>
        <button
          @click="(e) => deleteKey(e)"
          class="OrgStructureTableItem__actions-delete"
        >
          <svg width="2em" height="2em" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <div v-if="self['Подразделения']" class="OrgStructureTableItem__children">
      <OrgStructureTableItem
        v-for="(v, n) in self['Подразделения']"
        :key="name + '_' + n"
        :id="id + ',' + n"
        :name="n"
        :self="v"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "OrgStructureTableItem",
  data() {
    return {
      people: {
        total: 0,
        actual: 0,
      },
    };
  },
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
  },
  methods: {
    deleteKey(e) {
      e.preventDefault();
      const propsArray = this.id.split(",").map((v) => v.trim());
      console.log(propsArray);
      this.$store.commit("deleteKey", propsArray);
    },

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
    countTreeEntries(data) {
      let count = {
        total: 0,
        actual: 0,
      };
      Object.entries(data).forEach(([key, value]) => {
        if (key === "Данные") {
          count.total += value["Общее количество"];
          count.actual += value["Фактическое количество"];
        } else {
          count.total += this.countTreeEntries(value).total;
          count.actual += this.countTreeEntries(value).actual;
        }
      });
      return count;
    },
    countPeople(data) {
      let count = 0;
      if (data && typeof data === "object") {
        count = this.countTreeEntries(data);
      }
      // console.log("каунт", count);
      this.people = count;
    },
  },
  mounted() {
    // console.log(this.name);
    if (!this.self["Данные"]) {
      this.countPeople(this.self["Подразделения"]);
    } else {
      this.people.total = this.self["Данные"]["Общее количество"];
      this.people.actual = this.self["Данные"]["Фактическое количество"];
    }
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
    margin-right: auto;
  }
  &__total,
  &__actual,
  &__actions {
    padding: 0px 2em;
    width: 240px;
    text-align: left;
  }
  &__actions {
    &-delete,
    &-edit {
      cursor: pointer;
      margin-right: 10px;
      border: none;
      background: none;
    }
  }
  &__children {
    display: none;
    background-color: rgba($color: #7cb1ff, $alpha: 0.2);
    > div.OrgStructureTableItem {
      padding-left: 20px;
    }
  }
  &-active {
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
