import Vue from 'vue';


const btns = {
  template: "#slider-btns",
  props: {
    works: Array,
    currentIndex: Number
  }
}

const thumbs = {
  template: "#slider-thumbs",
  props: {
    works: Array,
    currentWork: Object
  }
}

const display = {
  template: "#slider-display",
  props: {
    works: Array,
    currentWork: Object,
    currentIndex: Number
  },
  components: {
    btns, thumbs
  }
}

const tags = {
  template: "#slider-tags",
  props: {
    tags: Array
  }
}

const info = {
  template: "#slider-info",
  props: {
    currentWork: Object
  },
  computed: {
    tagsArray() {
      return this.currentWork.skills.split(', ');
    }
  },
  components: {
    tags
  }
}

new Vue ({
  el: "#slider-component",
  template: "#slider-container",
  components: {
    display, info
  },
  data() {
    return {
      works: [],
      currentIndex: 0
    }
  },
  computed: {
    currentWork() {
      return this.works[this.currentIndex];
    }
  },
  methods: {
    makeArrayWithRequiredImages(data) {
      return data.map(item => {
        const requirePic = require(`../images/content/${item.photo}`);
        item.photo = requirePic;

        return item
      })
    },
    handleSlide(direction) {
      if (direction == 'next' && this.currentIndex < this.works.length - 1) {
        this.currentIndex++;
      } else if (direction == 'prev' && this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    thumbChange(thumbId) {
      return this.currentIndex = thumbId;
    },
    async fetchWorks() {
      let response = await fetch("https://webdev-api.loftschool.com//works/164");
      let result = await response.json();
      this.works = result;
      console.log(result);
    }
  },
  async created() {
    try {
      await this.fetchWorks();
    } catch (error) {
      alert('Error during works loading');
    }
  },
  // created() {
  //   const data = require('../data/works.json');

  //   this.works = this.makeArrayWithRequiredImages(data);
  // }
}) 