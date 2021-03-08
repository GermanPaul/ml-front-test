<template>
  <div class="search-box">
    <div class="search-box__logo" @click="$router.push({ path: '/'})"></div>
    <input
      class="search-box__input"
      type="text"
      name=""
      id=""
      placeholder="Nunca dejes de buscar"
      v-model="query"
      v-on:keyup.enter="search()"
    />
    <button class="search-box__button" @click="search()"></button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: 'SearchBox',
  computed: {
    query: {
      get() {
        return this.getItemQuery
      },
      set(newValue) {
        this.updateItemQuery(newValue);
      }
    },
    ...mapGetters(["getItemQuery"]),
  },
  methods: {
    search() {
      if(this.query == '') {
        this.$router.push({ path: '/'});
      } else if(this.$route.query.search != this.query) {
        this.$router.push({ path: '/items', query: { search: this.query }})
      };
    },
    ...mapActions(["updateItemQuery"]),
  },
};
</script>