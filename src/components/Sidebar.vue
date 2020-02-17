<template>
  <aside id="sidebar">
    <div class="container">
      <div class="brand">
        <div class="sup-title">多媒體設計系 系辦</div>
        <div class="title">租借項目</div>
        <router-link to="/">
          <img alt="icon" class="responsive" src="@/assets/img/Bunny_s.png" />
        </router-link>
      </div>
      <nav>
        <SidebarItem
          v-for="product in $store.state.product.list"
          :key="product.key"
          v-bind="product"
          :link="`/borrow/${product.key}`"
          :image="product.iconSide"
          :selected="product === $store.state.product.selection"
        />
      </nav>
    </div>
  </aside>
</template>

<script>
import SidebarItem from "@/components/SidebarItem.vue";

// TODO loading anim
// TODO item card fixed size
export default {
  name: "Sidebar",
  components: {
    SidebarItem
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scope lang="scss">
$font-size: 1em;
$color: #d6d6d6;

#main {
  margin-left: 20em;
}

#sidebar {
  height: 100%;
  width: 20em;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #49494b;
  overflow-x: hidden;
  padding: 4em 2em 4em;
  transition: 0.5s;
  font-family: BunnyJay;

  .brand {
    @include buttonify;

    .bunnylogo img {
      padding-top: 11px;
      width: 100%;
    }

    .sup-title {
      color: $color;
      text-align: left;
      font-size: 11pt;
      font-weight: bold;
    }

    .title {
      color: $color;
      text-align: left;
      font-size: 19pt;
      font-weight: bold;
    }
  }
}

@media (max-width: 992px) {
  #main {
    margin-left: 0;
  }

  #sidebar {
    width: 0;
    padding: 0;
  }
}
</style>
