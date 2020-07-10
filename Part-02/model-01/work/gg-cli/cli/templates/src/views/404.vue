<template>
  <div class="not-found">
    <div class="inner-container">
      <img class="img-404" src="@images/login/404.png" alt />
      <img class="img-back" @click="back" src="@images/login/back.png" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: '404',
  methods: {
    back() {
    this.$router.replace({ path: "/" }).catch(err => {
      err;
    });
  }
  }
}
</script>

<style scoped>
@media screen and (max-height: 646px) {
  .not-found {
    height: 646px;
  }
}
@media screen and (min-height: 646px) {
  .not-found {
    height: 100vh;
  }
}

.not-found {
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}
.not-found .inner-container {
  flex-basis: 514px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}
.not-found .inner-container .img-404 {
  flex-basis: 439px;
  width: 557px;
}
.not-found .inner-container .img-back {
  align-self: center;
  width: 175px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
  margin-top: 25px;
}
</style>
