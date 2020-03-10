<template>
  <div>
    <b-table striped hover :items="items" :fields="fields">
      <template v-slot:cell(actions)="row">
        <b-button
          v-if="row.item.current === false"
          size="sm"
          @click="logoutDevice(row.item, row.index, $event.target)"
          class="float-right"
        >
          登出
        </b-button>
        <div v-else class="float-right">當前裝置</div>
      </template>
    </b-table>
    <b-button class="float-right" @click="logoutAllDevice()">
      登出所有裝置
    </b-button>
  </div>
</template>

<script>
export default {
  name: "loginDevice",
  data() {
    return {
      fields: [
        { key: "date", label: "登入時間" },
        { key: "agent", label: "登入環境" },
        { key: "actions", label: "" }
      ],
      items: []
    };
  },
  created() {
    this.$store.dispatch("user/loginDevice").then(
      ({ data }) => {
        this.items = data.map(item => {
          item.date = new Date(item.date).format("yyyy/MM/dd hh:mm");
          return item;
        });
      },
      ({ status, data }) => {
        this.toast(data, {
          title: `Error ${status}`,
          variant: "danger"
        });
      }
    );
  },
  methods: {
    logoutDevice(item, index) {
      this.$store.dispatch("user/logoutDevice", item._id).then(
        ({ data }) => {
          this.items.splice(index, 1);

          this.toast(`成功登出${data.deletedCount}個裝置`, {
            title: "登出完成",
            variant: "success"
          });
        },
        ({ status, data }) => {
          this.toast(data, {
            title: `Error ${status}`,
            variant: "danger"
          });
        }
      );
    },
    logoutAllDevice() {
      this.$store.dispatch("user/logoutAllDevice").then(
        ({ data }) => {
          this.toast(
            `成功登出${data.deletedCount - 1}個裝置，失敗${data.n -
              data.deletedCount}個
          `,
            {
              title: "批次登出完成",
              variant: "success"
            }
          );
        },
        ({ status, data }) => {
          this.toast(data, {
            title: `Error ${status}`,
            variant: "danger"
          });
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped></style>
