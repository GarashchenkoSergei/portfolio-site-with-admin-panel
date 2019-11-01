<template lang="pug">
  .content-feedback__new
    h5.content__new-title {{title}}
    .content-feedback__new-content
      
      label(
        :class="{ 'error' : validation.hasError('review.photo') }"
      ).new-content__picture
        input(
          type="file"
          @change="appendFileAndRenderPhoto"
        ).reviews__form-file-input
        .new-content__picture-pic
          .feedback__pic(
            :class="{'filled' : this.rendedPhotoUrl.length}"
            :style="{'backgroundImage' : `url(${this.rendedPhotoUrl})`}"
          )
        .new-content__picture-text Add photo
        .edit-form__file-error
          errors-tooltip(
            :errorText="validation.firstError('review.photo')"
          )
      form.new-content__info(action="")
        .new-content__info-author
          app-input(
            type="text"
            title="Author's name"
            placeholder="Bruce Wayne"
            v-model="review.author"
            :errorText="validation.firstError('review.author')"
          ).info-author
          app-input(
            type="text"
            title="Author's title"
            placeholder="Batman"
            v-model="review.occ"
            :errorText="validation.firstError('review.occ')"
          ).info-author
        .new-content__info-text
          app-input(
            title="Feedback"
            field-type="textarea"
            v-model="review.text"
            :errorText="validation.firstError('review.text')"
          ).info-text
        .new-content__info-buttons
          button.button-cancel(
            type="reset"
            @click="closeForm"
            ) Cancel
          button(
            type="submit"
            @click="mode === 'add' ? addReview() : editCurrentReview()"
          ).save Save
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex"
import { getAbsoluteImgPath } from "../helpers/pictures";
import { Validator } from "simple-vue-validator";

import appInput from './app-input.vue'
import appButton from './app-button.vue'

export default {
  mixins: [require('simple-vue-validator').mixin],
  validators: {
    'review.author': value => {
      return Validator.value(value).required('Enter name');
    },
    'review.occ': value => {
      return Validator.value(value).required('Enter occupation');
    },
    'review.text': value => {
      return Validator.value(value).required('Leave feedback');
    },
    "review.photo": value => {
      return Validator.value(value).required("Need photo");
    }
  },
  props: {
    title: {
      type: String,
      default: "New review"
    },
    mode: {
      type: String,
      default: "add",
      validator: value => ["add", "edit"].includes(value)
    }
  },
  components: {
    appInput,
    appButton,
    errorsTooltip: () => import("./errors-tooltip.vue")
  },
  data() {
    return {
      rendedPhotoUrl: "",
      review: {
        id: 0,
        author: "",
        occ: "",
        text: "",
        photo: ""
      }
    };
  },
  computed: {
    ...mapState("feedback", {
      currentReview: state => state.currentReview
    }),
    userAvatarUrl() {
      return `url(${this.rendedPhotoUrl})`;
    }
  },
  watch: {
    currentReview(value) {
      if (this.mode === "edit") this.fillFormWithCurrentReviewData();
    }
  },
  created() {
    if (this.mode === "edit") this.fillFormWithCurrentReviewData();
  },
  methods: {
    ...mapActions('feedback', ['addNewReview', "updateReview"]),
    appendFileAndRenderPhoto(e) {
      const file = e.target.files[0];
      this.review.photo = file;
      const reader = new FileReader();
      try {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.rendedPhotoUrl = reader.result;
        };
      } catch (error) {
        alert("Error during photo rendering");
      }
    },
    async addReview() {
      if ((await this.$validate()) === false) return;
      const reviewData = new FormData();
      reviewData.append('author', this.review.author);
      reviewData.append('occ', this.review.occ);
      reviewData.append('text', this.review.text);
      reviewData.append('photo', this.review.photo);
      try {
        await this.addNewReview(reviewData);
        this.clearFormFields();

      } catch (error) {
        alert("Error during review adding");
      } finally {
        this.validation.reset();
      }
    },
    async editCurrentReview() {
      if ((await this.$validate()) === false) return;
      try {
        const response = await this.updateReview(this.review);

        this.$emit("cancel");
      } catch (error) {
        alert("Error during review editing");
      } 
      finally {
        this.validation.reset();
      }
    },
    closeForm() {
      this.review = {};
      this.$emit("cancel");
    },
    clearFormFields() {
      this.review = {};
      this.rendedPhotoUrl = "";
    },
    fillFormWithCurrentReviewData() {
      this.review = { ...this.currentReview };
      this.rendedPhotoUrl = getAbsoluteImgPath(this.currentReview.photo);
    }
  }
}
</script>


<style lang="postcss" scoped>
@import "../../styles/mixins.pcss";

.content-feedback__new {
  padding: 0 20px;
  background: #ffffff;
  margin-bottom: 30px;
}

.content__new-title {
  padding: 30px 10px;
  border-bottom: 1px solid rgba(31, 35, 45, 0.15);
}

.content-feedback__new-content {
  display: flex;
  padding: 50px 10px;

  @include bigphones {
    flex-direction: column;
    padding: 30px 10px;
  }
}

.new-content__picture {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 30px;
  position: relative;

  @include tablets {
    justify-content: flex-start;
    margin-bottom: 30px;
    margin-right: 10px;
  }

  @include bigphones {
    justify-content: center;
    align-items: center;
  }

  &.error {
    .edit-form__file-error {
      display: block;
    }
  }
}

.edit-form__file-error {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  display: none;
}

.new-content__picture-pic {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
}

.feedback__pic {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #dee4ed;
  position: relative;

  &:before {
    content: "";
    height: 115px;
    width: 85px;
    background: url("../../images/content/man-user.png") center center no-repeat /contain;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &.filled {
    background: center center no-repeat / cover;
    &:before {
      display: none;
    }
  }
}

.new-content__picture-text {
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  color: $blue;
  margin-top: 25px;
}

.new-content__info {
  width: 60%;

  @include tablets {
    width: 100%;
  }
}

.new-content__info-author {
  display: flex;
  width: 100%;

  @include tablets {
    flex-direction: column;
  }
}

.info-author {
  width: 50%;
  margin-right: 30px;
  position: relative;

  &:last-child {
    margin-right: 0;
  }

  @include tablets {
    width: 80%;
    margin-bottom: 30px;
  }

  @include tablets {
    width: 100%;
    margin-bottom: 30px;
  }
}

.info-author__title, .info-text__title {
  font-size: 16px;
  font-weight: 600;
  color: rgba(65, 76, 99, 0.5);
}

.info-author__text {
  width: 100%;
  border: none;
  border-bottom: solid 2px black;
  padding: 20px 0;
  outline: none;
}

.new-content__info-text {
  margin-top: 40px;
  position: relative;

  @include tablets {
    margin-top: 10px;
  }
}

.new-content__info-buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 30px;

  @include bigphones {
    justify-content: center;
  }
}

.reviews__form-file-input {
  position: absolute;
  top: 0;
  left: -9999px;
}
</style>
