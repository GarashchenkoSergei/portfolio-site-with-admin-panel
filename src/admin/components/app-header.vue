<template lang="pug">
  .admin__header-container.container
    .header-logo
      img.header-logo__pic(src="../../images/content/user.jpg")
    .header-content
      .header-content__desc
        .header-content__desc-name Sergei Garashchenko
        .header-content__desc-admin Administration panel
      .header-content__exit
        a.header-content__exit Exit
</template>

<style lang="postcss" scoped>
  @import "../../styles/mixins.pcss";
  
  .admin__header-container {
    padding: 20px 0;
    display: flex;
    color: $white;
  }

  .header-content {
    width: 100%;
    padding-left: 20px;
    display: flex;
    align-items: center; 
    justify-content: space-between;

    @include bigphones {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .header-content__desc {
    display: flex;
    align-items: center; 
  }

  .header-logo {
    width: 44px;
    height: 44px;
    min-width: 44px;

    &__pic {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .header-content__desc-name {
    font-size: 18px;
    font-weight: 600;

  }

  .header-content__desc-admin {
    margin-left: 30px;
    font-size: 14px;
    font-weight: normal;
    opacity: .5;

    @include bigphones {
      display: none;
    }
  }

  .header-content__exit {
    font-size: 16px;
    font-weight: normal;
    text-decoration: underline;

    &:hover {
      color: $orange;
    }
  }
</style>

