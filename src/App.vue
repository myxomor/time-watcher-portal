<template>
  <div id="app">
    <div id="container">
          <router-view></router-view>
    </div>
  </div>
</template>

<style lang="stylus" scope>
#app {
  background: #f5f5f5
  display: flex
  justify-content: center
  height: 100vh
}

#container {
  max-width: 550px
  padding: 8px
  display: flex
  justify-content: center
}
</style>
