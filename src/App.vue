<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { debuglog } from 'util';
export default {
  mounted() {
    document.addEventListener('keydown', function (event) {
      if ((event.ctrlKey === true || event.metaKey === true)
          && (event.which === 61 || event.which === 107
              || event.which === 173 || event.which === 109
              || event.which === 187 || event.which === 189)){
                event.preventDefault();
        }
    }, { passive: false });
    document.addEventListener('DOMMouseScroll', function (event) {
      if (event.ctrlKey === true || event.metaKey) {
        event.preventDefault();
      }
    }, { passive: false });

    document.addEventListener('mousewheel', function (event) {
      if (event.ctrlKey === true || event.metaKey) {
        event.preventDefault();
      }
    }, { passive: false });
  }
}
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
