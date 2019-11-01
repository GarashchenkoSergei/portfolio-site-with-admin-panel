<template lang="pug">
  .admin__nav-container.container
    ul.admin__nav-list
      li.admin__nav-item(v-for='nav in navs')
        router-link(
          :data-text="nav.title"
          :to="nav.href"
          exact-active-class="active"
        ).admin__nav-link
</template>

<script>
export default {
  data() {
    return {
      navs: [
        { title: 'About Me', href: '/' },
        { title: 'My Works', href: '/works' },
        { title: 'Feedback', href: '/feedback' }
      ]
    }
  }
}
</script>


<style lang="postcss" scoped>
  @import "../../styles/mixins.pcss";
  
  .admin__nav-list {
    display: flex;
    height: 77px;
    
    @include phones {
      justify-content: space-between;
    }
  }

  .admin__nav-item {
    font-size: 16px;
    font-weight: 600;
  }

  .admin__nav-link {
    vertical-align: middle;
    white-space: nowrap;
    display: flex;
    height: 100%;
    align-items: center;
    cursor: pointer;
    width: 125px;
    justify-content: center;
    border-bottom: 3px solid transparent;
    text-decoration: none;
    
    @include phones {
      width: 100px;
    }

    &:before {
      content: attr(data-text);
    }

    &:hover, &.active {
      color: #383bcf;
      font-weight: 600;
      border-color: currentColor;
    }
  }
</style>

