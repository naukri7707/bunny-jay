<template>
  <aside ref="sidebar" id="sidebar">
    <MenuIcon :class="{ hidden }" :cross="!hidden" @click="hidden = !hidden" />
    <div
      :class="['sidebar-menu', 'auto-hide-scrollbar', { hidden: hidden }]"
      @click="autoClose()"
    >
      <router-link class="brand" to="/">
        <div class="sup-title">多媒體設計系 系辦</div>
        <div class="title">租借項目</div>
        <img alt="icon" class="responsive" src="@/assets/img/Bunny_s.png" />
      </router-link>
      <b-nav vertical>
        <b-nav-item @click="autoClose()">
          <SidebarCard
            v-for="product in productInfoList"
            :key="product.key"
            :to="`/product/${product.key}`"
          >
            <b-card-title>{{ product.zhName }}</b-card-title>
            <b-card-sub-title>{{ product.name }}</b-card-sub-title>
            <b-card-img :src="product.iconSide" :alt="product.key"></b-card-img>
            <div v-show="product === selectionInfo">
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
            <b-button v-show="product !== selectionInfo">快速預借</b-button>
          </SidebarCard>
        </b-nav-item>
      </b-nav>
    </div>
  </aside>
</template>

<script>
import MenuIcon from "@/components/MenuIcon.vue";
import SidebarCard from "@/components/SidebarCard.vue";
import Responsive from "@/assets/js/responsive";

export default {
  name: "Sidebar",
  components: {
    MenuIcon,
    SidebarCard
  },
  created() {
    this.hidden = Responsive.windowWidth["=="]("XS");
    this.$store.dispatch("product/infoList").then(
      () => {},
      ({ status, data }) => {
        this.toast(data, {
          title: `Error ${status}`,
          variant: "danger"
        });
      }
    );
  },
  computed: {
    selectionInfo() {
      return this.$store.state.product.selectionInfo;
    },
    hidden: {
      get() {
        return this.$store.state.sidebar.hidden;
      },
      set(value) {
        this.$store.state.sidebar.hidden = value;
      }
    },
    productInfoList() {
      return this.$store.state.product.infoList;
    }
  },
  methods: {
    autoClose() {
      this.hidden = Responsive.windowWidth["=="]("XS");
    }
  }
};
</script>

<style scope lang="scss">
$font-size: 1em;
$color: #d6d6d6;

#sidebar {
  position: fixed;
  z-index: 1021;

  .menu-icon {
    position: absolute;

    top: 0.5rem;
    left: calc(100% - 3.5rem);
    transition: $sidebar-transition;

    &.hidden {
      position: absolute;
      left: 1rem;

      > div {
        background-color: rgba(255, 255, 255, 0.5);
      }
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
</style>
