<template>
  <b-container id="product">
    <transition name="title-fade">
      <h1 v-show="selectionInfo.zhName">
        Bunny Jay {{ selectionInfo.zhName }}
      </h1>
    </transition>
    <transition-group class="fade-group" name="fade">
      <ProductCard
        class="fade-item"
        v-for="card in selectionInfo.status.list"
        :key="card._id"
        v-bind="card"
      />
    </transition-group>
    <b-button @click="addRandomData()">
      ADD
    </b-button>
  </b-container>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import Product from "@/assets/js/product";

export default {
  name: "product",
  components: {
    ProductCard
  },
  computed: {
    selectionInfo() {
      return this.$store.state.product.selectionInfo;
    }
  },
  methods: {
    loadData(target) {
      this.$store.dispatch("product/update", target).then(
        () => {
          this.$store.commit(
            "app/setBackgroundImage",
            this.selectionInfo.background
          );
        },
        ({ status, data }) => {
          this.toast(data, {
            title: `Error ${status}`,
            variant: "danger"
          });
        }
      );
    },
    addRandomData() {
      this.$store.dispatch("product/addRandomData");
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.loadData(to.params.product);
      next();
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.loadData(to.params.product);
    next();
  },
  beforeRouteLeave(to, from, next) {
    this.$store.state.product.selectionInfo = Product.default;
    next();
  }
};
</script>

<style scope lang="scss">
.title-fade-enter-active,
.title-fade-leave-active {
  transition: opacity 0.5s;
}
.title-fade-enter,
.title-fade-leave-to {
  opacity: 0;
}
</style>
