<template lang="pug">
  .content-feedback__item
    user(
      :user="constructUserObj(review)"
    )
    .feedback-item__content 
      p.feedback-item__text {{review.text}}
      .item__edit
        .edit
          a(
            @click="updateWork"
          ).edit-button 
            .edit-change__text Edit
            .edit-change__icon
              icon-base(
                width="14" height="14" icon-name="pen" icon-color="blue" viewBox="0 0 528.899 528.899"
              )
                icon-pen.icon-pen
          a.edit-button(
            @click="removeExistedReview"
          )
            .edit-change__text Delete
            .edit-change__icon
              icon-base(
                width="13" height="13" icon-name="cross" icon-color="#bf2929" viewBox="0 0 1000 1000"
              )
                icon-cross.icon-cross
</template>

<script>
import { getAbsoluteImgPath } from "../helpers/pictures";
import { mapState, mapActions, mapMutations } from "vuex"

import IconBase from '../assets/icons/IconBase'
import IconCross from '../assets/icons/IconCross'
import IconPen from '../assets/icons/IconPen'

export default {
  props: {
    review: Object
  },
  components: {
    IconBase, 
    IconCross,
    IconPen,
    user: () => import("./user")
  },
  methods: {
    ...mapActions("feedback", ["removeReview"]),
    ...mapMutations("feedback", ["SET_CURRENT_REVIEW"]),
    constructUserObj(data) {
      return {
        name: data.author,
        occ: data.occ,
        avatar: getAbsoluteImgPath(data.photo)
      };
    },
    updateWork() {
      this.SET_CURRENT_REVIEW(this.review.id);
      this.$emit("updateWork");
    },
    async removeExistedReview() {
    if (confirm('Delete review?') === true)
      try {
        const response = await this.removeReview(this.review.id);
      } catch (error) {
        alert("Error during review delete");
      };
    }
  }
}
</script>


<style lang="postcss" scoped>
@import "../../styles/mixins.pcss";

.content-feedback__item {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.content-feedback__item_add {
  @include bigphones {
    height: 115px;
  }
}

.content-feedback__item {
  background: #ffffff;
}

.feedback-item__content {
  width: 100%;
  height: 100%;
  padding: 30px 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.feedback-item__text {
  font-size: 16px;
  font-weight: 600;
  color: rgba(65, 76, 99, 0.7);
  line-height: 1.88;
}

</style>
