interface SnackbarState {
  content: string;
  color: string;
}

export const state = (): SnackbarState => ({
  content: '',
  color: '',
});

export const mutations = {
  showMessage(state: SnackbarState, payload: {content: string; color: string}) {
    state.content = payload.content;
    state.color = payload.color;
  },
};

// As seen on https://dev.to/stephannv/how-to-create-a-global-snackbar-using-nuxt-vuetify-and-vuex-1bda
