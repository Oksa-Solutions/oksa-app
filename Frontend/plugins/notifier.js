export default ({app, store}, inject) => {
  inject('notifier', {
    showMessage({content = '', color = ''}) {
      store.commit('snackbar/showMessage', {content, color});
    },
  });
};

// As seen on https://dev.to/stephannv/how-to-create-a-global-snackbar-using-nuxt-vuetify-and-vuex-1bda
