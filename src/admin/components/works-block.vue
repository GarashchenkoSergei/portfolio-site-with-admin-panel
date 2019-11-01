<template lang="pug">
  .content-works__item
    .works-item__picture
      .works-item__picture-image
        img(
          :src="imagePath"
        ).works-item__pic
      .works-item__stack
        tags(
          :tags="tagsArray"
        )
    article.works-item__content
      h5.works-item__title {{work.title}}
      p.works-item__text {{work.description}}
      a.works-item__link {{work.link}}
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
          a(
            @click="removeExistedWork"
          ).edit-button
            .edit-change__text Delete
            .edit-change__icon
              icon-base(
                width="13" height="13" icon-name="cross" icon-color="#bf2929" viewBox="0 0 1000 1000"
              )
                icon-cross.icon-cross
</template>

<script>
import requests from "../requests";
import { mapActions, mapMutations } from "vuex";
import { getAbsoluteImgPath } from "../helpers/pictures";

import IconBase from '../assets/icons/IconBase'
import IconCross from '../assets/icons/IconCross'
import IconPen from '../assets/icons/IconPen'

export default {
  components: {
    tags: () => import("./tags"),
    IconBase, 
    IconCross,
    IconPen
  },
  props: {
    work: Object
  },
  computed: {
    imagePath() {
      return getAbsoluteImgPath(this.work.photo);
    },
    tagsArray() {
      return this.work.techs.split(",");
    }
  },
  methods: {
    ...mapActions("works", ["removeWork"]),
    ...mapMutations("works", ["SET_CURRENT_WORK"]),
    updateWork() {
      this.SET_CURRENT_WORK(this.work.id);
      this.$emit("updateWork");
    },
    async removeExistedWork() {
      if (confirm("Delete work?") === false) return;
      try {
        const response = await this.removeWork(this.work.id);
      } catch (error) {
        alert("Error during work delete")
      }
    }
  }
}
</script>


<style lang="postcss" scoped>
  @import "../../styles/mixins.pcss";
  
  .content-works__item {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .works-item__picture {
    position: relative;
    display: flex;
    justify-content: center;
  }

  .works-item__picture-image {
    width: 100%;
    max-width: 340px;
  }

  .works-item__pic {
    width: 100%;
    height: 100%;
  }

  .works-item__stack {
    position: absolute;
    bottom: 10px;
    right: 10px;
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

  .works-item__content {
    padding: 40px 30px;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
  }

  .works-item__text {
    font-size: 16px;
    font-weight: 600;
    color: rgba(65, 76, 99, 0.7);
    line-height: 1.88;
  }

  .works-item__link {
    font-size: 16px;
    font-weight: 600;
    color: $blue;

    &:hover {
      color: $orange;
    }
  }
</style>
