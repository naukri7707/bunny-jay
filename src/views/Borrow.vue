<template>
  <div id="borrow" :style="styleBorrow">
    <h1>Bunny Jay {{ selection.zhName }}</h1>

    <template v-for="card in selection.status.list">
      <Card
        :key="card.id"
        v-if="card.deadline === 0"
        :src="selection.iconOn"
        :title="selection.zhName"
      >
        <div>---</div>
        <div>可預約</div>
      </Card>
      <Card
        :key="card.id"
        v-else
        :src="selection.iconOff"
        :title="selection.zhName"
      >
        <div>{{ card.user }}</div>
        <div>{{ card.deadline }}</div>
      </Card>
    </template>
    <button class="btn btn-primary" @click="addRandomData">
      新增隨機資料
    </button>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import Product from "@/assets/js/product";
// TODO 重新整理資料正確顯示
export default {
  name: "borrow",
  components: {
    Card
  },
  computed: {
    selection() {
      return this.$store.state.product.selection;
    },
    styleBorrow() {
      return {
        backgroundImage: `url(${this.selection.background})`
      };
    }
  },
  methods: {
    loadData(target) {
      this.$store.dispatch("selectProduct", target);
    },
    addRandomData() {
      this.$store.dispatch("addRandomData");
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      next();
      vm.loadData(to.params.product);
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.loadData(to.params.product);
    next();
  },
  beforeRouteLeave(to, from, next) {
    this.$store.state.product.selection = Product.default;
    next();
  }
};
</script>

<style scope lang="scss">
#borrow {
  min-height: inherit;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  background-color: #f5f5f5;
  background-attachment: fixed;
}
</style>
