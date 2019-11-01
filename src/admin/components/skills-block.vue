<template lang="pug">
  .content-about__container
    .about__item-title(v-if="editModeOn == false")
      .item-title__text {{category.category}}
      .item-elem
        a(
          @click.prevent="editModeOn = true"
        ).item-elem__block.item-elem__block_edit
          icon-base(
            width="14" height="14" icon-name="pen" icon-color="#414c63" viewBox="0 0 528.899 528.899"
          )
            icon-pen.icon-pen
        a(
          @click.prevent="removeExistedCategory"
        ).item-elem__block.item-elem__block_choice
          icon-base(
            width="14" height="14" icon-name="trash" icon-color="#414c63" viewBox="0 0 459 459"
          )
            icon-trash.icon-trash
    .about__item-title(v-if="editModeOn == true").input-error
      app-input(
        type="text" 
        placeholder="editMode"
        v-model="editedCategory.category"
        :errorText="validation.firstError('editedCategory.category')"
      ).app-input
      .item-elem
        a(
          @click.prevent="editCurrentCategory"
        ).item-elem__block.item-elem__block_choice
          icon-base(
            width="15" height="15" icon-name="tick" icon-color="#414c63" viewBox="0 0 25 25"
          )
            icon-tick.icon-tick
        a(
          @click.prevent="editModeOn = false"
        ).item-elem__block.item-elem__block_choice
          icon-base(
            width="13" height="13" icon-name="cross" icon-color="#414c63" viewBox="0 0 1000 1000"
          )
            icon-cross.icon-cross
    .about__item-content
      .skills__list
        skills-item(
          v-for="skill in skills"
          :key="skill.id"
          :skill="skill"
        )
    .about__item-add(
      :class="{blocked: formIsBlocked}"
    )
      .item-add__name.input-error
        app-input(
          type="text" 
          v-model="skill.title" 
          placeholder="New skill"
          :errorText="validation.firstError('skill.title')"
        ).item-add__name-text
      .item-add__ammount.input-error
        app-input(
          type="text"
          v-model="skill.percent"
          placeholder="100 %"
          :errorText="validation.firstError('skill.percent')"
        ).item-add__ammount-digit
      button(type="button" @click="addNewSkill").item-add__button.add-button +
</template>

<script>
import { mapActions } from 'vuex'
import { Validator } from "simple-vue-validator"

import IconBase from '../assets/icons/IconBase'
import IconTick from '../assets/icons/IconTick'
import IconCross from '../assets/icons/IconCross'
import IconTrash from '../assets/icons/IconTrash'
import IconPen from '../assets/icons/IconPen'
import skillsItem from './skills-item'
import appInput from './app-input.vue'

export default {
  mixins: [require('simple-vue-validator').mixin],
  validators: {
    'editedCategory.category': value => {
      return Validator.value(value).required('Category name is required');
    },
    'skill.title': value => {
      return Validator.value(value).required('Skill title is required');
    },
    'skill.percent': value => {
      return Validator.value(value)
        .integer("Number required")
        .between(0, 100, "Must be between 0 and 100")
        .required("Enter value");
    }
  },
  props: {
    category: Object,
    skills: Array
  },
  data() {
    return {
      skill: {
        title: "",
        percent: "",
        category: this.category.id
      },
      formIsBlocked: false,
      editModeOn: false,
      editedCategory: {...this.category}
    }
  },
  components: {
    IconBase, 
    IconTick,
    IconCross,
    IconTrash,
    IconPen,
    skillsItem,
    appInput
  },
  methods: {
    ...mapActions('skills', ['addSkill']),
    async addNewSkill() {
      if ((await this.$validate()) === false) return;
      this.formIsBlocked = true;
      try {
        await this.addSkill(this.skill);
        this.skill.title = "";
        this.skill.percent = "";
      } catch (error) {
        alert("Invalid values");
      } finally {
        this.formIsBlocked = false;
        this.validation.reset();
      }
    },
    ...mapActions('categories', ['removeCategory', 'editCategory']),
    async removeExistedCategory() {
      if (confirm("Delete category?") === false) return;
      try {
        await this.removeCategory(this.skill.category);
      } catch (error) {
        alert("Invalid values");
      }
    },
    async editCurrentCategory() {
      if ((await this.$validate('editedCategory.category')) === false) return;
      this.editedCategory.title = this.editedCategory.category;
      try {
        await this.editCategory(this.editedCategory);
        this.editModeOn = false;
      } catch (error) {
        alert("Invalid values");
      } finally {
        this.validation.reset();
      }
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

  .item-title__text {
    width: 60%;
    padding: 8px 0;
    border-bottom: 1px solid black;
    font-size: 18px;
    font-weight: 600;
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

  .skills__list {
    padding: 12px;
  }

  .about__item-add {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100px;
  }

  .item-add__name {
    width: 40%;
  }

  .item-add__name-text {
    width: 100%;
    border: none;
    padding-left: 15px;
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
    margin: 0 35px 0 10px;
    border: none;
    padding-left: 15px;
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
      .icon-tick {
        fill: #00d70a;
      }
      .icon-cross {
        fill: #bf2929;
      }
    }
  }

  .item-elem__block {
    &:hover {
      .icon-pen {
        fill: $blue;
      }
      .icon-trash {
        fill: #bf2929;
      }
    }
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

  .item-elem__block {

    &:hover {
      .icon-pen {
        fill: $blue;
      }
    }
  }

  .input-error {
    position: relative;
  }

</style>

