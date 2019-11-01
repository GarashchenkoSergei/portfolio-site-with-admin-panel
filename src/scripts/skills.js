import Vue from 'vue';
import { resolveProjectReferencePath } from 'typescript';

const skill = {
  template: "#skill",
  props: {
    skillName: String,
    skillPercent: Number
  },
  methods: {
    drawColoredCircle() {
      const circle = this.$refs['circle'];
      const dashArray = parseInt(
        getComputedStyle(circle).getPropertyValue("stroke-dasharray")
      );
  
      const percent = (dashArray/100) * (100 - this.skillPercent);
      
      circle.style.strokeDashoffset = percent;
    }
  },
  mounted() {
    this.drawColoredCircle();
  }
}

const row = {
  template: "#skills-row",
  props: {
    skill: Object
  },
  components: {
    skill
  }
}

new Vue({
  el: "#skills-container",
  template: "#skills-list",
  components: {
    row
  },
  data() {
    return {
      skills: []
    }
  },
  async created() {
    try {
      await this.fetchCategories(); 
    } catch (error) {
      alert('Error during skills loading');
    }
  },
  methods: {
    async fetchCategories() {
      let response = await fetch("https://webdev-api.loftschool.com//categories/164");
      let result = await response.json();
      this.skills = result;
    }
  }
}) 