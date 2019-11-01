<template lang="pug">
  .admin__content
    .admin__content-container.container
      .content__title
        h5.content__title-text Block "Feedback"
      .content-feedback
        feedback-form(
          @cancel="showAddingForm = false"
          v-if="showAddingForm"
          :mode="mode"
          :title="formTitle"
        )
        ul.content-feedback__list
          li.content-common.content-common_add.add-button__work(
            @click="addNewReview"
            v-if="showAddingForm === false"
          )
            .add-button__content
              .add-button__content-circle +
              .add-button__content-text Add work
          li.content-common.content-common_item(
            v-for="review in reviews"
          )
            feedback-block(
              :review="review"
              @updateWork="updateWork"
            )

</template>

<script>
import { mapState, mapActions } from "vuex";

import IconBase from '../../assets/icons/IconBase'
import IconCross from '../../assets/icons/IconCross'
import IconPen from '../../assets/icons/IconPen'

export default {
  data() {
    return {
      mode: "",
      showAddingForm: false
    }
  },
  components: {
    feedbackForm: () => import("components/feedback-form.vue"),
    feedbackBlock: () => import("components/feedback-block.vue"),
    IconBase, 
    IconCross,
    IconPen
  },
  computed:{
    ...mapState("feedback", {
      reviews: state => state.reviews
    }),
    formTitle() {
      switch (this.mode) {
        case "add":
          return "New review";
        case "edit":
          return "Edit review";
        default:
          return "";
          console.warn("oooops");
      }
    }
  },
  created() {
    this.collectReviews();
  },
   methods: {
    ...mapActions("feedback", ["fetchReviews"]),
    async collectReviews() {
      try {
        await this.fetchReviews();
      } catch (error) {
        alert("Error during reviews download");
      }
    },
    updateWork() {
      this.mode = "edit";
      this.showAddingForm = true;
    },
    addNewReview() {
      this.mode = "add";
      this.showAddingForm = true;
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

  .content-feedback {
    width: 100%;
    height: 100%;
  }

  .content-feedback__list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .content-common {
    width: calc(33.3%-20px);
    min-width: 320px;
    margin-right: 30px;
    margin-bottom: 30px;
    height: 380px;
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


