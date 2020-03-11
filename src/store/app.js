export default {
  namespaced: true,
  state: {
    style: {
      backgroundImage: String
    }
  },
  mutations: {
    setBackgroundImage(state, path) {
      if (path) {
        state.style.backgroundImage = `url(${path})`;
      } else {
        state.style.backgroundImage = undefined;
      }
    }
  }
};
