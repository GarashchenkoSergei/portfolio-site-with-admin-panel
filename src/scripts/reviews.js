import Flickity from 'vue-flickity';
import Vue from 'vue';

new Vue ({
  el: "#reviews-component",
  template: "#reviews-container",
  components: {
    Flickity
  },
  
  data() {
    return {
      flickityOptions: {
        draggable: true,
        groupCells: true,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: false,
        freeScroll: false,
        contain: true,
        adaptiveHeight: true
        
        // any options from Flickity can be used
      }
    }
  },
  
  methods: {
    next() {
      this.$refs.flickity.next();
    },
    
    previous() {
      this.$refs.flickity.previous();
    }
  }
});