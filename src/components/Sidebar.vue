<template>
  <aside ref="sidebar" id="sidebar">
    <MenuIcon :class="{ hidden }" :cross="!hidden" @click="hidden = !hidden" />
    <div :class="['sidebar-menu', { hidden: hidden }]">
      <router-link class="brand" to="/">
        <div class="sup-title">多媒體設計系 系辦</div>
        <div class="title">租借項目</div>
        <img alt="icon" class="responsive" src="@/assets/img/Bunny_s.png" />
      </router-link>
      <b-nav vertical>
        <b-nav-item>
          <SidebarCard
            v-for="product in $store.state.product.list"
            :key="product.key"
            :to="`/borrow/${product.key}`"
          >
            <b-card-title>{{ product.zhName }}</b-card-title>
            <b-card-sub-title>{{ product.name }}</b-card-sub-title>
            <b-card-img :src="product.iconSide" :alt="product.key"></b-card-img>
            <div v-show="product === selection">
              <template v-if="product.status.remain === -99">
                <b-spinner variant="primary" label="Spinning"></b-spinner>
              </template>
              <template v-else>
                <b-card-text>剩餘{{ product.status.remain }}台</b-card-text>
                <b-card-text>{{
                  product.day === 0 ? "需當天還" : `可借用${product.day}天`
                }}</b-card-text>
              </template>
            </div>
            <b-button v-show="product !== selection">快速預借</b-button>
          </SidebarCard>
        </b-nav-item>
      </b-nav>
    </div>
  </aside>
</template>

<script>
import MenuIcon from "@/components/MenuIcon.vue";
import SidebarCard from "@/components/SidebarCard.vue";
// TODO 定義 響應式邊界 (參考 bootstrap ?)
// TODO 小螢幕自動隱藏
export default {
  name: "Sidebar",
  components: {
    MenuIcon,
    SidebarCard
  },
  computed: {
    selection() {
      return this.$store.state.product.selection;
    },
    hidden: {
      get() {
        return this.$store.state.sidebar.hidden;
      },
      set(value) {
        this.$store.state.sidebar.hidden = value;
      }
    }
  }
};
</script>

<style scope lang="scss">
$font-size: 1em;
$color: #d6d6d6;

#sidebar {
  position: fixed;
  z-index: 1;

  .menu-icon {
    position: absolute;
    top: 1rem;
    left: calc(100% - 4rem);
    transition: $sidebar-transition;

    &.hidden {
      left: 1rem;
    }
  }

  .sidebar-menu {
    height: 100vh;
    width: $sidebar-width;
    background-color: #49494b;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 4rem 2rem 4rem;
    font-family: BunnyJay;
    transition: $sidebar-transition;

    &.hidden {
      width: 0;
      padding-left: 0;
      padding-right: 0;
    }

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
}
// TODO app 做 resp
// @media (max-width: 992px) {
//   #main {
//     margin-left: 0;
//   }

//   #sidebar {
//     width: 0;
//     padding: 0;
//   }
// }
</style>
