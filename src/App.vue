<template>
  <div id="app">
    <div >
      <router-link to="/dashboard"><md-button >Dashboard</md-button></router-link>
      <router-link to="/works"><md-button >Works</md-button></router-link>
    </div>
    <div id="container">
          <router-view></router-view>
    </div>
  </div>
</template>

<style lang="stylus" scope>
#app {
  background: #f5f5f5
  //display: flex
  justify-content: center
  height: 100vh
}

#container {
  display: flex
  justify-content: center
}
</style>
