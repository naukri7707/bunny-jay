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
          v-for="(item, index) in items"
          :key="item.name"
          v-bind="item"
          @click.native="selectItem(index)"
        />
      </nav>
    </div>
  </aside>
</template>

<script>
import SidebarItem from "@/components/SidebarItem.vue";

export default {
  name: "Sidebar",
  components: {
    SidebarItem
  },
  data() {
    return {
      mSelection: 0,
      items: [
        {
          name: "Key",
          title: "鑰匙",
          path: "/borrow/key",
          img: require("@/assets/img/sidebar/key.png"),
          day: 0
        },
        {
          name: "Camera",
          title: "相機",
          path: "/borrow/camera",
          img: require("@/assets/img/sidebar/camera.png"),
          day: 3
        },
        {
          name: "Tripod",
          title: "腳架",
          path: "/borrow/tripod",
          img: require("@/assets/img/sidebar/tripod.png"),
          day: 3
        },
        {
          name: "Laptop",
          title: "筆記型電腦",
          path: "/borrow/laptop",
          img: require("@/assets/img/sidebar/laptop.png"),
          day: 0
        },
        {
          name: "Pad",
          title: "平板電腦",
          path: "/borrow/pad",
          img: require("@/assets/img/sidebar/pad.png"),
          day: 3
        },
        {
          name: "Digitizer",
          title: "電腦繪圖版",
          path: "/borrow/digitizer",
          img: require("@/assets/img/sidebar/digitizer.png"),
          day: 3
        },
        {
          name: "Arduino",
          title: "Arduino",
          path: "/borrow/arduino",
          img: require("@/assets/img/sidebar/arduino.png"),
          day: 3
        },
        {
          name: "VR headset",
          title: "VR頭戴裝置",
          path: "/borrow/VR",
          img: require("@/assets/img/sidebar/vr.png"),
          day: 3
        },
        {
          name: "Drone",
          title: "空拍機",
          path: "/borrow/drone",
          img: require("@/assets/img/sidebar/drone.png"),
          day: 3
        }
      ]
    };
  },
  created() {
    this.items = this.items.map(it => {
      return Object.assign({}, it, {
        remain: 0,
        selected: false
      });
    });
  },
  computed: {
    selection: {
      get() {
        return this.mSelection;
      },
      set(value) {
        if (this.items.legalIndex(value)) {
          this.items[this.mSelection].selected = false;
          this.items[value].selected = true;
          this.mSelection = value;
        }
      }
    },
    currentItem() {
      return this.items[this.selection];
    }
  },
  methods: {
    selectItem(target) {
      // TODO loading anim
      // TODO item card fixed size
      this.axios
        .get("/test", {
          params: {
            thing: this.currentItem.name
          }
        })
        .then(res => {
          // axios 回傳物件為 res.data 而非 res
          this.selection = target;
          this.currentItem.remain = res.data;
        })
        .catch(err => {
          // 請求失敗處理
          alert(err);
        })
        .finally(() => {
          // 不管如何都執行
        });
    }
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
  padding-top: 60px;
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
  }
}
</style>
