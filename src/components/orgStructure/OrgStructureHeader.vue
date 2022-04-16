<template>
  <div class="OrgStructureHeader">
    <div class="OrgStructureHeader__title">
      <p>{{ title }}</p>
    </div>
    <div class="OrgStructureHeader__actions">
      <button class="OrgStructureHeader__button" @click="openNewEntryModal">
        <svg width="1em" height="1em" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z"
          ></path>
        </svg>
        Добавить
      </button>
    </div>
    <NewEntryModal ref="modal"></NewEntryModal>
  </div>
</template>
<script>
import NewEntryModal from "@/components/NewEntryModal.vue";
export default {
  name: "OrgStructureHeader",
  components: { NewEntryModal },
  methods: {
    openNewEntryModal() {
      this.$refs.modal.show = true;
    },
  },
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss">
@import "../../assets/css/index.scss";
.OrgStructureHeader {
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: $prim;
    color: #fff;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }
  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1rem;
    text-indent: 5px;
    padding: 5px 10px;
    background: #f1f1f1;
    border-radius: 5px;
    color: #b4b4b4;
    border: none;
    cursor: pointer;
    outline: none;
    &:hover {
      color: #333;
    }
  }
}
</style>
