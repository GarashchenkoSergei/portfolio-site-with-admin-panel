<template lang="pug">
  .auth
    .auth-block
      form(@submit.prevent="login").auth__form
        .auth-close
          a.item-elem__block.item-elem__block_choice
            icon-base(
              width="20" height="20" icon-name="cross" viewBox="0 0 1000 1000"
            )
              icon-cross
        h2.auth-title Authorization
        .auth__row
          app-input(
            type="text"
            title="Login"
            placeholder="Enter login"
            icon="user"
            viewBox="0 0 482.9 482.9"
            v-model="user.name"
            :errorText="validation.firstError('user.name')"
          )
        .auth__row
          app-input(
            type="password"
            title="Password"
            placeholder="Enter password"
            icon="key"
            viewBox="0 0 512 512"
            v-model="user.password"
            :errorText="validation.firstError('user.password')"
          )
        .auth__row
          app-button(
            title="send"
            type="submit"
          )
</template>

<script>
import $axios from '../../requests'
import { Validator } from "simple-vue-validator"

import IconBase from '../../assets/icons/IconBase'
import IconCross from '../../assets/icons/IconCross'
import appInput from '../app-input.vue'
import appButton from '../app-button.vue'

export default {
  mixins: [require('simple-vue-validator').mixin],
  validators: {
    'user.name': value => {
      return Validator.value(value).required("Enter user name");
    },
    'user.password': value => {
      return Validator.value(value).required('Enter password')
    }
  },
  components: {
    appInput,
    appButton,
    IconBase, 
    IconCross
  },
  data() {
    return {
      user: {
        name: "ssg0719",
        password: "ssg0719"
      }
    }
  },
  methods: {
    async login() {
      if ((await this.$validate()) === false) return;
      try {
        const {
          data : {token}
        } = await $axios.post('/login', this.user);
        
        localStorage.setItem('token', token);
        $axios.defaults.headers["Authorization"] = `Bearer ${token}`;
        this.$router.push("/");
      } catch (error) {
          alert("Invalid name or password");
      } finally {
        this.validation.reset();
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
  @import "../../../styles/mixins.pcss";

  .auth{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(../../../images/content/TrainBridge.jpg) center center no-repeat;
    background-size: cover;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: $orange;
      opacity: .2;
    }
  }

  .auth-block {
    width: 560px;
    height: 560px;
    background: #fff;
    padding: 80px;
    line-height: 1;
    position: relative;
  }

  .auth-close {
    position: absolute;
    top: 30px;
    right: 30px;
    width: 20px;
    height: 20px;
  }

  .auth-title {
    text-align: center;
  }

  .auth__row {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    position: relative;
  }

  /* .error {
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    color: red;
  } */
</style>

