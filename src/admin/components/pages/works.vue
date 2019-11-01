<template lang="pug">
  .admin__content
    .admin__content-container.container
      .content__title
        h5.content__title-text Block "My Works"
      .content-works
        works-form(
          @cancel="showForm = false"
          v-if="showForm"
          :mode="mode"
          :title="formTitle"
        )
        ul.content-works__list
          li.content-common.content-common_add.add-button__work(
            @click="addNewWork"
            v-if="showForm === false"
          )
            .add-button__content
              .add-button__content-circle +
              .add-button__content-text Add work
          li.content-common.content-common_item(
            v-for="work in works"
          )
            works-block(
              :work="work"
              @updateWork="updateWork"
            )
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Validator } from "simple-vue-validator";

import IconBase from '../../assets/icons/IconBase'
import IconCross from '../../assets/icons/IconCross'
import IconPen from '../../assets/icons/IconPen'

export default {
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    // title: value => {
    //   return Validator.value(value).required("Заполните название");
    // }
  },
  data() {
    return {
      mode: "",
      showForm: false
    }
  },
  components: {
    worksForm: () => import("../works-form"),
    worksBlock: () => import("../works-block"),
    IconBase, 
    IconCross,
    IconPen
  },
  computed: {
    ...mapState("works", {
      works: state => state.works
    }),
    formTitle() {
      switch (this.mode) {
        case "add":
          return "New work";
        case "edit":
          return "Edit work";
        default:
          return "";
          console.warn("oooops");
      }
    }
  },
  created() {
    this.collectWorks();
  },
  methods: {
    ...mapActions("works", ["fetchWorks"]),
    async collectWorks() {
      try {
        await this.fetchWorks();
      } catch (error) {
        alert("Error during works download");
      }
    },
    updateWork() {
      this.mode = "edit";
      this.showForm = true;
    },
    addNewWork() {
      this.mode = "add";
      this.showForm = true;
    }
  }
}
</script>

<style lang="postcss" scoped>
  @import "../../../styles/mixins.pcss";
  
  .admin__content {
    width: 100%;
    height: 100%;
    background-color: #f7f9fe;
  }

  .content__title {
    padding: 60px 0;
    display: flex;
    align-items: center;

    @include bigphones {
      flex-direction: column;
      align-items: flex-start;
      padding: 35px 0;
    }
  }

  .content__title-text {
    font-size: 21px;
    font-weight: bold;
    margin-right: 60px;
  }

  .content-works {
    width: 100%;
    height: 100%;
  }

  .content-works__list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .content-common {
    width: calc(33.3%-20px);
    min-width: 320px;
    height: 555px;
    margin-right: 30px;
    margin-bottom: 30px;
    padding: 0 20px;

    &_item {
      background: #fff;
    }

    @include tablets{
      margin-right: 20px;
      margin-bottom: 20px;
      width: calc(50%-10px);
    
      &:nth-child(even) {
        margin-right: 0;
      }
    }

    @include bigphones {
      margin-right: 0;
      margin-bottom: 10px;
      width: 100%;
    }
    
    &:nth-child(3n+3) {
      margin-right: 0;

      @include tablets {
        margin-right: 20px;
      }

      @include bigphones {
        margin-right: 0;
      }
    }
  }

  .content-common_add {
    @include bigphones {
      height: 100px;
    }
  }
</style>
