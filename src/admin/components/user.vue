<template lang="pug">
  .feedback-item__person
    .feedback-item__person-picture
      img.feedback-item__pic(:src="user.avatar")
    .feedback-item__person-info
      .item-person__info-name {{user.name}}
      .item-person__info-position {{user.occ}}
</template>

<script>
export default {
  props: {
    user: Object
  }
};
</script>

<style lang="postcss" scoped>
.feedback-item__person {
  padding: 30px 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(31, 35, 45, 0.15);
}

.feedback-item__person-picture {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feedback-item__pic {
  width: auto;
  height: 100%;
}
</style>

