<template lang="pug">
  button(
    :type="type"
  ).btn-styled {{title}}
</template>

<script>
export default {
  props: {
    title: String,
    type: String
  }
}
</script>


<style lang="postcss" scoped>
  @import "../../styles/mixins.pcss";

  .btn-styled {
    text-transform: uppercase;
    padding: 25px 45px;
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
    background-image: linear-gradient(to right, #006aed, #3f35cb);
    border-radius: 30px;

    &:hover {
      background: linear-gradient(90deg, #ec7e00, $orange);
    }

    &:focus {
      outline: none;
    }
  }
</style>

