<template lang="pug">
  .admin__content
    .admin__content-container.container
      .content__title
        h5.content__title-text Block "About Me"
        button(
          @click="showAddingForm = true"
          v-if="showAddingForm === false"
        ).content__title-button Add group
      .content-about
          


        ul.content-about__list
          li.content-about__item.content-common(
              v-if="showAddingForm"
            )
            skills-block-add(
              @clicked="deleteSkillGroup"
            )

          li.content-about__item.content-common(
            v-for="category in categories"
          )
            skills-block(
              :category="category"
              :skills="filterSkillsByCategoryId(category.id)"
            )
</template>

<script>
import { mapActions, mapState } from "vuex";
import $axios from '../../requests'

import skillsBlock from '../skills-block'
import skillsBlockAdd from '../skills-block-add'

export default {
  components: {
    skillsBlock,
    skillsBlockAdd
  },
  data() {
    return {
      showAddingForm: false 
    }
  },
  computed: {
    ...mapState('categories', {
      categories: state => state.categories
    }),
    ...mapState('skills', {
      skills: state => state.skills
    })
  },
  methods: {
    ...mapActions('categories', ['fetchCategories']),
    ...mapActions('skills', ['fetchSkills']),
    filterSkillsByCategoryId(categoryId) {
      return this.skills.filter(skill => skill.category === categoryId);
    },
    deleteSkillGroup() {
      return this.showAddingForm = false;
    },

  },
  async created() {
    try {
      await this.fetchCategories(); 
    } catch (error) {
      alert('Error during categories load');
    }
    try {
      this.fetchSkills(); 
    } catch (error) {
      alert('Error during skills load');
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

  .content__title-button {
    display: flex;
    cursor: pointer;
    color: $blue;
    font-size: 16px;
    font-weight: 600;
    margin-left: 10px;
    background: transparent;

    @include bigphones {
      margin-top: 20px;
    }

    &:before {
      content: "+";
      display: block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-image: linear-gradient(to right, #006aed, #3f35cb);
      line-height: 20px;
      color: #fff;
      margin-right: 13px;
      flex-shrink: 0;
      flex-basis: 20px;
    }

    &:hover {
      transform: scale(1.1);
    }

    &:focus {
      outline: none;
    }
  }

  .content-common {
    box-shadow: 4.1px 2.9px 20px 0 rgba(0, 0, 0, 0.07);
  }

  .content-about {
    width: 100%;
    height: 100%;
  }

  .content-about__list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .content-about__item {
    width: calc(50% - 20px);
    margin-right: 30px;
    margin-bottom: 30px;
    height: 390px;
    background: #ffffff;
    padding: 0 20px;

    @include tablets {
      margin-right: 20px;
      margin-bottom: 20px;
    }

    @include bigphones {
      width: 100%;
      margin-right: 0;
    }

    &:nth-child(even) {
      margin-right: 0;
    }
  }
</style>

