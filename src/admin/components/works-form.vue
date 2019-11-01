<template lang="pug">
  .content-works__new
    h5.content__new-title {{title}}
    .works-new__content
      .works-new__column
        .edit-form__btn(
          v-if="renderedPhoto.length"
        )
          .edit-form__pic(
            :style="{'backgroundImage' : workPhotoUrl}"
          )
          label.edit-form__change-preview
            a.edit-form__change-pic Change preview
            input(type="file" @change="handlePhotoUpload").edit-form__preview-input

        label.edit-form__picture(
          v-else
          :class="{'error' : validation.hasError('work.photo')}"
        )
          .edit-form__picture-text
            | Drag or download picture
          
          app-button(
            elem="file"
            text="Download"
            @change="handlePhotoUpload"
          )
          .edit-form__file-error
            errors-tooltip(
              :errorText="validation.firstError('work.photo')"
            )
      .works-new__column.works-new__column_mod
        app-input(
          type="text"
          title="Name"
          placeholder="Site's name"
          v-model="work.title"
          :errorText="validation.firstError('work.title')"
        ).work-name
        app-input(
          type="text"
          title="Link"
          placeholder="google.com"
          v-model="work.link"
          :errorText="validation.firstError('work.link')"
        ).work-name
        app-input(
          field-type="textarea"
          title="Description"
          v-model="work.description"
          :errorText="validation.firstError('work.description')"
        ).work-name
        add-tags(
          v-model="work.techs"
          @removeTag="value => this.work.techs = value"
          :errorText="validation.firstError('work.techs')"
        ).work-name
        .new-content__info-buttons.new-content__info-buttons_mod
          button(
            type="reset"
            @click="closeForm"
          ).button-cancel Cancel
          button.save(
            type="submit"
            @click="mode === 'add' ? addWork() : editCurrentWork()"
            ) Save
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { renderer, getAbsoluteImgPath } from "../helpers/pictures";
import { Validator } from "simple-vue-validator";

export default {
  mixins: [require('simple-vue-validator').mixin],
  validators: {
    'work.title': value => {
      return Validator.value(value).required('Enter work name');
    },
    'work.link': value => {
      return Validator.value(value).required('Enter work site');
    },
    'work.description': value => {
      return Validator.value(value).required('Describe work');
    },
    'work.techs': value => {
      return Validator.value(value).required('Enter technologies');
    },
    "work.photo": value => {
      return Validator.value(value).required("Add photo");
    }
  },
  props: {
    title: {
      type: String,
      default: "New work"
    },
    mode: {
      type: String,
      default: "add",
      validator: value => ["add", "edit"].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    appInput: () => import("./app-input"),
    addTags: () => import("./add-tags.vue"),
    appButton: () => import("./button.vue"),
    errorsTooltip: () => import("./errors-tooltip.vue")
  },
  data() {
    return {
      disableForm: this.disabled,
      renderedPhoto: "",
      work: {
        id: 0,
        title: "",
        techs: "",
        link: "",
        photo: "",
        description: ""
      }
    };
  },
  computed: {
    ...mapState("works", {
      currentWork: state => state.currentWork
    }),
    workPhotoUrl() {
      return `url(${this.renderedPhoto})`;
    },
    // editFormTitle() {
    //   switch (this.mode) {
    //     case "edit":
    //       return "Редактирование работы";
    //     case "add":
    //       return "Добавление работы";
    //   }
    // }
  },
  created() {
    if (this.mode === "edit") {
      this.fillFormWithCurrentWorkData();
    }
  },
  watch: {
    currentWork(value) {
      if (this.mode === "edit") {
        this.fillFormWithCurrentWorkData();
      }
    },
    mode(value) {
      if (value === "add") {
        this.clearFormFields();
      }
    }
  },
  methods: {
    ...mapActions("works", ["addNewWork", "updateWork"]),
    async editCurrentWork() {
      if ((await this.$validate()) === false) return;
      this.disableForm = true;
      try {
        const response = await this.updateWork(this.work);
        this.$emit("cancel");
      } catch (error) {
        alert("Error during work editing");
      } finally {
        this.disableForm = false;
        this.validation.reset();
      }
    },
    async addWork() {
      if ((await this.$validate()) === false) return;
      this.disableForm = true;
      const workData = new FormData();
      workData.append('title', this.work.title);
      workData.append('techs', this.work.techs);
      workData.append('link', this.work.link);
      workData.append('photo', this.work.photo);
      workData.append('description', this.work.description);
      try {
        const response = await this.addNewWork(workData);

        this.clearFormFields();
      } catch (error) {
        alert("Error during work adding");
      } finally {
        this.disableForm = false;
        this.validation.reset();
      }
    },
    closeForm() {
      this.clearFormFields();
      this.$emit("cancel");
    },
    clearFormFields() {
      this.work = {};
      this.renderedPhoto = "";
    },
    fillFormWithCurrentWorkData() {
      this.work = { ...this.currentWork };
      this.renderedPhoto = getAbsoluteImgPath(this.currentWork.photo);
    },
    async handlePhotoUpload(e) {
      const file = e.target.files[0];
      this.work.photo = file;

      try {
        const rendererResult = await renderer(file);
        this.renderedPhoto = rendererResult;
      } catch (error) {
        alert("Error during photo rendering");
      }
    }
  }
}
</script>


<style lang="postcss" scoped>
  @import "../../styles/mixins.pcss";

  .content-works__new {
    padding: 0 20px;
    background: #ffffff;
    margin-bottom: 30px;
  }

  .works-new__content {
    display: flex;
    width: 100%;
    padding: 40px 10px;

    @include tablets {
      flex-direction: column;
      align-items: center;
    }
  }

  .works-new__column {
    width: calc(50%-15px);
    margin-right: 30px;

    @include tablets {
      width: 70%;
      margin-right: 0;
    }

    @include bigphones {
      width: 100%;
      margin-right: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  .works-new__column-picture {
    width: 100%;
    height: 276px;
    border: dashed 1px #a1a1a1;
    background: #dee4ed;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .column-picture__text {
    width: 40%;
    text-align: center;
    margin-bottom: 30px;
  }

  .works-new__column_mod {
    margin-top: -20px;

    @include tablets {
      margin-top: 20px;
    }
  }

  .work-name {
    margin-bottom: 20px;
    position: relative;
  }

  .work-name__title {
    margin-top: 20px;
  }

  .work-name__title, .work-name__title {
    font-size: 16px;
    font-weight: 600;
    color: rgba(65, 76, 99, 0.5);
  }

  .work-name__text {
    width: 100%;
    border: none;
    border-bottom: solid 2px black;
    padding: 20px 0;
    outline: none;
  }

  .work-text__text {
    margin-top: 20px;
    width: 100%;
    height: 145px;
    padding: 15px 20px;
    font-size: 16px;
    font-weight: 600;
    color: #414c63;
    line-height: 1.88;
    border: 1px solid rgba(31, 35, 45, 0.25);
  }

  .works-add__stack {
    display: flex;
    justify-content: flex-start;
    margin-top: 20px;
  }

  .new-content__info-buttons {
    display: flex;
    justify-content: flex-end;
  }

  .new-content__info-buttons_mod {

    @include tablets {
      justify-content: center;
    }
  }

  .works-item__stack-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .works-item__stack-item {
    font-size: 13px;
    font-weight: 700;
    color: rgba(40, 51, 64, 0.7);
    padding: 8px 18px;
    background: $white;
    border-radius: 15px;
    margin-left: 8px;
    margin-top: 8px;
  }

  .edit-form__change-pic {
    color: #383bcf;
    font-weight: 600;
  }

  .edit-form__picture {
    display: block;
    min-height: 276px;
    border: dashed 1px #a1a1a1;
    background-color: #dee4ed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 24%;
    cursor: pointer;
    position: relative;
  }

  .edit-form__file-error {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%);
    display: none;
  }

  .edit-form__picture-text {
    margin-bottom: 22px;
    color: rgba(65, 76, 99, 0.5);
    line-height: 2.12;
    font-weight: 600;
    text-align: center;
  }

  .edit-form__btn {
    text-align: center;
  }

  .edit-form__pic {
    margin-bottom: 30px;
    height: 260px;
    background: center center no-repeat / cover;
  }

  .edit-form__change-preview {
    position: relative;
  }

  .edit-form__preview-input {
    position: absolute;
    top: 0;
    left: -9999px;
  }

  .edit-form__img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .error {
    .edit-form__file-error {
      display: block;
    }
  }
</style>

