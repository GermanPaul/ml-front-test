<template>
  <div>
    <div v-if="getLoadingQuery" class="items">Estamos cargando la información...</div>
    <div v-else-if="getItemQueryResult.length > 0" class="items">
      <div class="breadcumb">
        <span v-for="(category, index) in getItemQueryCategories" v-bind:key="index">{{`${category}${(index) != getItemQueryCategories.length - 1 ? ' > ' : ''}`}}</span>
      </div>
      <div class="search-results">
        <result-item
          v-for="(item, index) in getItemQueryResult.slice(0, this.maxResults)"
          v-bind:key="index"
          :id="item.id"
          :price="item.price.amount.toLocaleString('id-ID')"
          :freeShipping="item.free_shipping"
          :title="item.title"
          :condition="item.condition"
          :stateName="item.state_name"
          :imageURL="item.picture"
        />
      </div>      
    </div>
    <div v-else class="items">No se encontraron resultados para tu búsqueda.</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ResultItem from '@/components/resultItem.vue';

export default {
  name: 'Items',
  data: () => {
    return { maxResults: 4 };
  },
  components: {
    ResultItem,
  },
  computed: {
    ...mapGetters(['getItemQueryResult', 'getLoadingQuery', 'getItemQueryCategories']),
  },
  methods: {
    ...mapActions(['updateItemQueryResult']),
  },
  watch: {
    '$route.query.search': function (search) {
      this.updateItemQueryResult(search);
    }
  },
  mounted() {
    if (this.$route.query.search) {
      this.updateItemQueryResult(this.$route.query.search);
    } else {
      this.$router.push({ path: '/' });
    }
  },
};
</script>