<template lang="pug">
  .content-about__container
    .about__item-title
      .about__input
        app-input(
          type="text"
          placeholder="New category"
          v-model="categoryTitle"
          :errorText="validation.firstError('categoryTitle')"
        )
      .item-elem
        a(
          @click.prevent="addSkillGroup"
        ).item-elem__block.item-elem__block_choice
          icon-base(
            width="15" height="15" icon-name="tick" icon-color="#00d70a" viewBox="0 0 25 25"
          )
            icon-tick
        a(
          @click.prevent="deleteSkillGroup"
        ).item-elem__block.item-elem__block_choice
          icon-base(
            width="13" height="13" icon-name="cross" icon-color="#bf2929" viewBox="0 0 1000 1000"
          )
            icon-cross
    .about__item-content
    .about__item-add.blocked
      .item-add__name
        input.item-add__name-text(type="text" placeholder="New skill")
      .item-add__ammount
        input.item-add__ammount-digit(type="text" placeholder="100 %")
      button(type="button").item-add__button.add-button +
</template>

<script>
import { mapActions } from 'vuex';
import { Validator } from "simple-vue-validator";

import IconBase from '../assets/icons/IconBase'
import IconTick from '../assets/icons/IconTick'
import IconCross from '../assets/icons/IconCross'
import appInput from './app-input'

export default {
  mixins: [require('simple-vue-validator').mixin],
  validators: {
    'categoryTitle'(value) {
      return Validator.value(value).required('Enter new category name')
    }
  },
  components: {
    IconBase, 
    IconTick,
    IconCross,
    appInput
  },
  data() {
    return {
      categoryTitle: ""
    };
  },
  methods: {
    ...mapActions("categories", ["addNewSkillGroup"]),
    async addSkillGroup() {
      if ((await this.$validate()) === false) return;
      try {
        await this.addNewSkillGroup(this.categoryTitle);
        this.categoryTitle = "";
      } catch (error) {
        alert("New category name is required")
      } finally {
        this.validation.reset();
      }
    },
    deleteSkillGroup() {
      this.$emit('clicked', 'deleteSkillGroup')
    }
  }
}

</script>

<style lang="postcss" scoped>
  @import "../../styles/mixins.pcss";

  .content-about__container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .about__item-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    border-bottom: 1px solid rgba(31, 35, 45, 0.15);
  }

  .about__input {
    width: 60%;
    position: relative;
  }

  .item-elem {
    display: flex;
  }

  .item-elem__block {
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .about__item-content {
    flex: 1;
  }

  .blocked {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100px;
    opacity: 0.5;
    filter: grayscale(100%);
    pointer-events: none;
    user-select: none;
  }

  .item-add__name {
    width: 40%;
  }

  .item-add__name-text {
    width: 100%;
    padding: 15px;
    border: none;
    border-bottom: 1px solid rgba(31, 35, 45, 0.35);
    font-size: 16px;
    font-weight: normal;
    outline: none;

    &::placeholder {
      opacity: .8;
    }
  }

  .item-add__ammount-digit {
    width: 75px;
    padding: 15px;
    margin: 0 35px 0 10px;
    border: none;
    border-bottom: 1px solid rgba(31, 35, 45, 0.35);
    font-size: 16px;
    font-weight: normal;
    outline: none;

    &::placeholder {
      opacity: .8;
    }
  }

  .item-elem__block_choice {
    &:hover {
      transform: scale(1.2);
    }
  }

</style>

