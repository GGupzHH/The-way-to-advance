<template>
  <div class="no-access">
    <div class="container">
      <div class="show-segment">
        <img class="img-no-access" src="@images/account/no-access.png" alt />
        <p class="back" @click="back">返回</p>
      </div>
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
.no-access {
  min-width: 1366px;
  min-height: 646px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
}
.no-access .container {
  height: 100vh;
  flex: 1;
}
.no-access .container .show-segment {
  height: 413px;
  width: 472px;
  margin: 0 auto;
  position: relative;
  top: 50%;
  margin-top: -267px;
}
.no-access .container .show-segment .img-no-access {
  width: 472px;
  height: 351px;
}
.no-access .container .show-segment .back {
  width: 121px;
  height: 30px;
  margin: 0 auto;
  margin-top: 25px;
  background: rgba(0, 122, 255, 1);
  border-radius: 15px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
}
</style>
