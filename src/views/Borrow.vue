<template>
  <div id="borrow" :style="styleBorrow">
    <h1>Bunny Jay {{ selection.zhName }}</h1>

    <template v-for="card in selection.status.list">
      <Card
        :key="card.id"
        v-if="card.user === 'none'"
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
  </div>
</template>

<script>
import Card from "@/components/Card.vue";

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
  // TODO 連結後台回傳 cardList，讓 v-for cardList 自動響應
  methods: {
    loadData(target) {
      this.$store.dispatch("selectProduct", target);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      next();
      vm.loadData(to.params.product);
    });
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.loadData(to.params.product);
  },
  beforeRouteLeave(to, from, next) {
    next();
    this.$store.state.product.selection = {};
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
