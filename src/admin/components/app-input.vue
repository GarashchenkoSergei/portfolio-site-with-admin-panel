<template lang="pug">
  label(
    v-if="fieldType === 'input'"
    :class="[{'input_labeled' : !!title}, {'error' : !!errorText}, iconClass]"
  ).input
    .input__icon
      icon-base(
        width="30"
        height="30"
        :icon="icon"
        icon-color="rgba(65, 76, 99, 0.5)"
        :viewBox="viewBox"
      )
        component(
          v-bind:is="currentIcon"
        )

        //- icon-base(
        //-   width="30" height="30" icon-name="key" icon-color="rgba(65, 76, 99, 0.5)" viewBox="0 0 512 512"
        //- )
        //-   icon-key 
    .input__content
      .input__title(
        v-if="title"
        ) {{title}}
      input(
        :type="type"
        :placeholder="placeholder"
        v-bind="$attrs"
        :value="value"
        :class="{'error' : !!errorText}"
        @input="$emit('input', $event.target.value)"
      ).input-field
      .input__error-tooltip
        errors-tooltip(
          :errorText="errorText"
        )

  label.textarea(
    v-else-if="fieldType === 'textarea'"
    v-bind="$attrs"
    :class="{'error' : !!errorText}"
  )
    .input__title(v-if="title") {{title}} 
    textarea.textarea__elem.field__elem(
      :value="value"
      @input="$emit('input', $event.target.value)"
      v-bind="$attrs"
      :class="{'error' : !!errorText}"
    )
    .input__error-tooltip
      errors-tooltip(
        :errorText="errorText"
      )
</template>

<script>
import IconBase from '../assets/icons/IconBase'
import IconUser from '../assets/icons/IconUser'
import IconKey from '../assets/icons/IconKey'

export default {
  props: {
    title: String,
    placeholder: String,
    type: String,
    icon: String,
    viewBox: String,
    fieldType: {
      type: String,
      default: "input"
    },
    errorText: {
      type: String,
      default: ""
    },
    value: String | Number
  },
  data() {
    return {
    }
  },
  computed:{
    iconClass() {
      if (this.icon) {
        const iconName = this.icon;
        return iconName.length ? `input_iconed` : "";
      }
    },
    currentIcon() {
      return "icon-" + this.icon;
    }
  },
  components: {
    IconBase,
    IconUser,
    IconKey,
    errorsTooltip: () => import("./errors-tooltip.vue")
  }
}
</script>

<style lang="postcss" scoped>
@import "../../styles/mixins.pcss";

  .input__error-tooltip {
    display: none;
    position: absolute;
    top: 100%;
    left: 30%;
    transform: translateX(-50%);
    z-index: 100;
  }

  .input {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    border-bottom: 1px solid black;
    padding-bottom: 0px;
    width: 100%;
  
    &_iconed {
      .input__content {
        margin-left: 20px;
      }

      .input__icon {
        display: block;
      }
    }

    &_labeled {
      padding-bottom: 13px;
    }
  }

  .input__icon {
    display: none;
  }

  .input__content {
    width: 100%;
    margin-left: 0;
  }

  .input__title {
    margin-bottom: 30px;
    font-size: 16px;
    font-weight: 600;
    color: rgba(65, 76, 99, 0.5);
  }

  .input-field {
    width: 100%;
    border: none;
    outline: none;
    padding-bottom: 7px;
    font-size: 16px;
    font-weight: 600;
  }

  .textarea__elem {
  margin-top: 20px;
  width: 100%;
  height: 115px;
  padding: 15px 20px;
  font-size: 16px;
  font-weight: 600;
  color: #414c63;
  line-height: 1.88;
  border: 1px solid rgba(31, 35, 45, 0.25);

  @include tablets {
    width: 100%;
  }
}

.error {
  .input__error-tooltip {
    display: block;
  }
}

</style>



