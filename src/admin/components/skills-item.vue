<template lang="pug">
  .skills__item(v-if="editModeOn == false")
    .skill__name {{skill.title}}
    .skill__content
      .item-elem.item-elem_wide
        .skills__percent-value {{skill.percent}}
        .skills__percent-percent %
      .item-elem
        a(
          @click.prevent="editModeOn = true"
        ).item-elem__block.item-elem__block_pen
          icon-base(
            width="14" height="14" icon-name="pen" icon-color="#414c63" viewBox="0 0 528.899 528.899"
          )
            icon-pen.icon-pen
        a(
          @click.prevent="removeExistedSkill"
        ).item-elem__block
          icon-base(
            width="14" height="14" icon-name="trash" icon-color="#414c63" viewBox="0 0 459 459"
          )
            icon-trash.icon-trash
  .skills__item(v-else="editModeOn == true")
    .skill__name.input-error
      app-input(
        type="text"
        placeholder="name"
        :errorText="validation.firstError('editedSkill.title')"
        v-model="editedSkill.title"
      ).skill-input
    .skill__content.input-error
      .item-elem.item-elem_wide
        .skills__percent-value
          app-input(
            type="text"
            placeholder="%"
            v-model="editedSkill.percent"
            :errorText="validation.firstError('editedSkill.percent')"
          ).skill-input
        .skills__percent-percent %
      .item-elem
        a(
          @click.prevent="editCurrentSkill"
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
</template>

<script>
import { mapActions } from "vuex";
import { Validator } from "simple-vue-validator"

import IconBase from '../assets/icons/IconBase'
import IconPen from '../assets/icons/IconPen'
import IconTrash from '../assets/icons/IconTrash'
import IconTick from '../assets/icons/IconTick'
import IconCross from '../assets/icons/IconCross'
import appInput from './app-input.vue'

export default {
  mixins: [require('simple-vue-validator').mixin],
  validators: {
    'editedSkill.title'(value) {
      return Validator.value(value).required('Skill title is required')
    },
    'editedSkill.percent'(value) {
      return Validator.value(value)
        .integer("Number required")
        .between(0, 100, "Must be between 0 and 100")
        .required("Enter value");
    }
  },
  props: {
    skill: Object
  },
  data() {
    return {
      editModeOn: false,
      editedSkill: {...this.skill}
    }
  },
  components: {
    IconBase, 
    IconPen,
    IconTick,
    IconCross,
    IconTrash,
    appInput
  },
  methods: {
    ...mapActions('skills', ['removeSkill', 'editSkill']),
    async removeExistedSkill() {
      if (confirm("Delete skill?") === false) return;
      try {
        await this.removeSkill(this.skill.id);
      } catch {
        alert('Error during skill remove');
      }
    },
    async editCurrentSkill() {
      if ((await this.$validate()) === false) return;
      try {
        await this.editSkill(this.editedSkill);
        this.editModeOn = false;
      } catch {
        alert('Error during skill shange');
      } finally {
        this.validation.reset();
      }
    }
  }
}

</script>

<style lang="postcss" scoped>
  @import "../../styles/mixins.pcss";

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

  .skills__item {
    padding: 10px 0;
    display: flex;
  }

  .skill__name {
    width: 60%;

    @include tablets {
      width: 50%;
    }
  }

  .skill__content {
    width: 40%;
    display: flex;
    justify-content: space-between;

    @include tablets {
      width: 50%;
    }
  }

  .item-elem_wide {
    width: 50px;
    justify-content: space-between;
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
  .item-elem__block_choice {
    &:hover {
      .icon-tick {
        fill: green;
      }
      .icon-cross {
        fill: #bf2929;
      }
    }
  }

  .skill-input {
    width: 90%;
  }

  .input-error {
    position: relative;
  }
</style>