<template>
  <div class="sort">
    <div class="sort-select" v-for="select in selects" :key="select.id"
      :class="{ 'active-select': activeSelectId === select.id }" @click.stop="openSelect(select.id)">
      {{ $store.getters.getLanguageText(getSelectValue(select)) }}
      <img src="@/views/MarketPlace/Assets/Icons/Secondary/dropdown.svg" />
      <div class="sort-select-body">
        <div class="sort-select-body-list">
          <div v-show="sortType || sortMethod" class="sort-select-body-list-item item-reset"
            @click="resetSortUnit(select.type)">
            {{ $store.getters.getLanguageText('Сбросить фильтр') }}
          </div>
          <div class="sort-select-body-list-item" :class="{ picked: sortType === option }"
            v-for="option in select.options" @click.stop="chooseSortType(select.type, option)" :key="option">
            {{ $store.getters.getLanguageText(option) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SortSelects',
  props: {
    selects: {
      type: Array,
      require: true,
    }
  },
  data() {
    return {
      activeSelectId: 0,
      sortType: '',
      sortMethod: '',
    }
  },
  methods: {
    chooseSortType(type, value) {
      if (type === 'type') {
        this.sortType = value;
      } else if (type === 'method') {
        this.sortMethod = value;
      }
      this.activeSelectId = 0;
    },
    openSelect(id) {
      if (this.activeSelectId === id) {
        this.activeSelectId = 0;
      } else {
        this.activeSelectId = id;
      }
    },
    resetSortUnit(sort) {
      if (sort === 'type') {
        this.sortType = '';
      } else if (sort === 'method') {
        this.sortMethod = '';
      }
    },
    getSelectValue(select) {
      if (select.type === 'type') {
        return this.sortType ? this.sortType : select.title;
      } else if (select.type === 'method') {
        return this.sortMethod ? this.sortMethod : select.title;
      } else {
        return '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sort {
  display: flex;
  align-items: center;
  gap: 1.481vmin;

  &-select {
    width: 17.315vmin;
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    background: rgba(255, 255, 255, 0.02);
    border-radius: 0.278vmin;
    padding: 1.204vmin 1.296vmin;
    font-weight: 600;
    font-size: 1.296vmin;
    justify-content: space-between;

    &>img {
      width: 0.926vmin;
      height: 0.926vmin;
      transition: transform 0.3s ease;
    }

    &-body {
      backdrop-filter: blur(2.037vmin);
      background: rgba(0, 0, 0, 0.07);
      border-radius: 0.463vmin;
      width: 90%;
      height: fit-content;
      top: 4.2vmin;
      left: 0;
      position: absolute;
      z-index: 200;
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      transition:
        max-height 0.3s ease,
        opacity 0.3s ease;

      &-list {
        display: flex;
        padding: 0.833vmin 0;
        flex-direction: column;
        align-items: center;

        .item-reset {
          font-weight: 600;
          color: #5f9adf;
        }

        &-item {
          width: 100%;
          text-align: center;
          font-weight: 400;
          font-size: 1.111vmin;
          color: rgba(255, 255, 255, 0.24);
          transition:
            color 0.3s ease,
            transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          padding: 0.37vmin;

          &:hover {
            transform: scale(1.02);
          }
        }
      }
    }
  }
}

.active-select {
  &>img {
    transform: rotate(180deg);
  }

  .sort-select-body {
    max-height: fit-content;
    opacity: 1;
  }
}

.picked {
  font-weight: 600;
  color: white;
}
</style>