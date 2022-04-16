<template>
  <div v-if="show" class="newEntryModal__shadow" @click.self="closeModal">
    <div class="newEntryModal">
      <div class="newEntryModal__close" @click="closeModal">
        <svg width="2em" height="2em" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
          ></path>
        </svg>
      </div>
      <slot name="title">
        <h3 class="newEntryModal__title">Добавить новый раздел</h3>
      </slot>
      <slot name="body">
        <div class="newEntryModal__content">
          <form @submit.prevent="handleSubmit">
            <div class="newEntryModal__nameInp newEntryModal__inputGroup">
              <label for="nameInp">Название</label>
              <input
                id="nameInp"
                v-model="name"
                type="text"
                placeholder="Введите название..."
              />
            </div>
            <div class="newEntryModal__isEmpty newEntryModal__inputGroup">
              <label for="isEmpty">Пустой раздел?</label>
              <input
                v-model="isEmpty"
                type="checkbox"
                name="isEmpty"
                id="isEmpty"
              />
            </div>
            <div
              v-if="!isEmpty"
              class="newEntryModal__data newEntryModal__inputGroup"
            >
              <div class="newEntryModal__totalInp">
                <label for="totalInp">Общее количество</label>
                <input v-model="entry.total" type="number" id="totalInp" />
              </div>
              <div class="newEntryModal__actualInp newEntryModal__inputGroup">
                <label for="totalInp">Общее количество</label>
                <input v-model="entry.actual" type="number" id="actualInp" />
              </div>
            </div>
            <!-- <div class="newEntryModal__level newEntryModal__inputGroup">
              <label for="levelInp">Ключ вложения</label>
              <p class="newEntryModal__level-caption">
                *для главного раздела введите 0
              </p>
              <input
                id="levelInp"
                v-model="level"
                type="text"
                placeholder="Алматы, Управление 1"
              />
            </div> -->
            <button class="newEntryModal__submit" type="submit">
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
  name: "NewEntryModal",
  data: function () {
    return {
      show: false,
      isEmpty: true,
      level: "0",
      name: "",
      entry: {
        total: 0,
        actual: 0,
      },
    };
  },
  methods: {
    closeModal() {
      this.show = false;
    },
    handleSubmit() {
      this.$store.commit("addKey", {
        name: this.name,
        entry: {
          Данные: {
            "Общее количество": this.entry.total,
            "Фактическое количество": this.entry.actual,
          },
        },
        level: this.level,
      });
      console.log("AAA");
      this.name = "";
      this.show = false;
      this.closeModal();
    },
  },
};
</script>

<style lang="scss">
@import "../assets/css/index.scss";
.newEntryModal {
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
