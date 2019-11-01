<template lang="pug">
  .admin
    header.admin__header
      app-header
    nav.admin__nav
      app-nav
    .content__block
      router-view

</template>

<script>
import appHeader from "./components/app-header";
import appNav from "./components/app-nav";
import about from "./components/pages/about";
import feedback from "./components/pages/feedback";
import works from "./components/pages/works";

export default {
  components: {
    about, feedback, works, appHeader, appNav
  }
}
</script>


<style lang="postcss">
  @import url("../styles/mixins.pcss");
  @import url("../styles/main.pcss");
  @import url("../styles/layout/base.pcss");

  @import url("./admin-styles/*.pcss");

  .admin__header {
    background-image: linear-gradient(to right, #3e3e59, #454573);
  }

  .content__block {
    width: 100%;
    height: 100%;
  }

</style>
