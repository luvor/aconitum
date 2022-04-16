<template>
  <div v-if="show" class="editEntryModal__shadow" @click.self="closeModal">
    <div class="editEntryModal">
      <div class="editEntryModal__close" @click="closeModal">
        <svg width="2em" height="2em" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
          ></path>
        </svg>
      </div>
      <slot name="title">
        <h3 class="editEntryModal__title">Изменить запись</h3>
      </slot>
      <slot name="body">
        <div class="editEntryModal__content">
          <form @submit.prevent="handleSubmit">
            <div class="newEntryModal__totalInp">
              <label for="totalInp">Общее количество</label>
              <input v-model="entry.total" type="number" id="totalInp" />
            </div>
            <div class="newEntryModal__actualInp newEntryModal__inputGroup">
              <label for="totalInp">Общее количество</label>
              <input v-model="entry.actual" type="number" id="actualInp" />
            </div>
            <button class="editEntryModal__submit" type="submit">
              Отправить
            </button>
          </form>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditEntryModal",
  props: ["initialVals", "id"],
  data: function () {
    return {
      show: false,
      entry: {
        total: 0,
        actual: 0,
      },
    };
  },
  mounted() {
    // console.log(this.initialVals);
    this.entry = this.initialVals;
  },
  methods: {
    closeModal() {
      this.show = false;
    },
    handleSubmit() {
      this.$store.commit("setKey", {
        entry: this.entry,
        level: this.id,
      });
      this.name = "";
      this.show = false;
      this.closeModal();
    },
  },
};
</script>

<style lang="scss">
@import "../assets/css/index.scss";
.editEntryModal {
  background: #fff;
  padding: 10px;
  min-width: 400px;
  max-width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  &__shadow {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
  &__close {
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 7px;
    right: 7px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    :hover {
      background-color: #f1f1f1;
    }
  }
  &__title {
    color: $sec;
    text-align: center;
    margin-bottom: 10px;
  }
  &__inputGroup {
    border-bottom: 1px solid;
    margin-bottom: 20px;
  }
  &__nameInp {
    color: $sec;
    display: flex;
    flex-direction: column;
    > input {
      margin-top: 5px;
      padding: 5px;
      font-size: 16px;
      border: none;
      background: #f1f1f1;
    }
  }
  &__isEmpty {
    color: $sec;
    > input {
      margin-left: 10px;
      margin-bottom: 10px;
    }
  }
  &__totalInp,
  &__actualInp {
    display: flex;
    flex-direction: column;
    border: none;
    margin-bottom: 10px;
    > input {
      margin-top: 5px;
      padding: 5px;
      font-size: 16px;
      border: none;
      background: #f1f1f1;
    }
  }
  &__level {
    color: $sec;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    &-caption {
      color: #666;
      font-size: 14px;
    }
    > input {
      margin-top: 5px;
      padding: 5px;
      font-size: 16px;
      border: none;
      background: #f1f1f1;
    }
  }
  &__submit {
    padding: 10px 30px;
    color: $sec;
    border: none;
    border: 1px solid #f1f1f1;
    cursor: pointer;
    &:hover {
      background: $sec;
      color: #fff;
    }
  }
}
</style>
