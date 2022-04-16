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
          v-if="!Object.keys(self).includes('Общее количество')"
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
      <div v-if="people.total > 0" class="OrgStructureTableItem__actions">
        <button
          @click.stop="openEditEntryModal"
          class="OrgStructureTableItem__actions-edit"
        >
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
        <EditEntryModal :id="id" :initialVals="people" ref="modal" />
      </div>
    </div>
    <div
      v-if="!Object.keys(self).includes('Общее количество')"
      class="OrgStructureTableItem__children"
    >
      <OrgStructureTableItem
        v-for="(v, n) in self"
        :key="name + '_' + n"
        :id="id + ',' + n"
        :name="n"
        :self="v"
      />
    </div>
  </div>
</template>
<script>
import EditEntryModal from "../EditEntryModal.vue";
export default {
  components: { EditEntryModal },
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
    openEditEntryModal() {
      this.$refs.modal.show = true;
    },
    deleteKey(e) {
      e.preventDefault();
      this.$store.commit("deleteKey", this.id);
    },
    handleUnwrap(id) {
      const t = this.$refs[id];
      if (t) {
        if (t.getAttribute("class") === "OrgStructureTableItem") {
          t.setAttribute(
            "class",
            "OrgStructureTableItem OrgStructureTableItem-active"
          );
        } else {
          t.setAttribute("class", "OrgStructureTableItem");
        }
      }
    },
    countTreeEntries(data, count) {
      if (Object.getOwnPropertyNames(data).includes("Общее количество")) {
        count.total += data["Общее количество"];
        count.actual += data["Фактическое количество"];
      } else {
        Object.keys(data).forEach((key) => {
          count = {
            ...count,
            ...this.countTreeEntries(data[key], count),
          };
        });
      }
      return count;
    },
    countPeople(data) {
      let count = 0;
      if (data) {
        count = this.countTreeEntries(data, { total: 0, actual: 0 });
      }
      this.people = count;
    },
  },
  mounted() {
    this.countPeople(this.self);
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
