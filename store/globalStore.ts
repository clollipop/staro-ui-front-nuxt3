import {defineStore} from "pinia";

export const useGlobalStore = defineStore("globalStoreId", {
  state: () => {
    return {
      showSearch: false,
      showComment: false,
      showFriendForm: false
    };
  },
  actions: {
    setShowSearch(showSearch: boolean) {
      this.showSearch = showSearch;
    },
    setShowFriendForm(showFriendForm: boolean) {
      this.showFriendForm = showFriendForm;
    }
  }
});
