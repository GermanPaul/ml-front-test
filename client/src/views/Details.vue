<template>
  <div>
    <div v-if="getLoadingDetails" class="items">Estamos cargando la información...</div>
    <div v-else-if="getDetailsResult.id != ''" class="items">
      <div class="breadcumb">
        <span v-for="(category, index) in getDetailsResult.categories" v-bind:key="index">{{`${category}${(index) != getDetailsResult.categories.length - 1 ? ' > ' : ''}`}}</span>
      </div>
      <div class="details-result">
        <div class="product-info">
          <div class="product-info__image"><img :src="getDetailsResult.picture" alt=""></div>
          <div class="product-info-data">
            <div class="product-info-data__sold-quantity">{{getDetailsResult.condition == 'new' ? 'Nuevo' : 'Usado' }} - {{getDetailsResult.sold_quantity}} vendidos</div>
            <div class="product-info-data__title">{{getDetailsResult.title}}</div>
            <div class="product-info-data__price">$ {{getDetailsResult.price.amount.toLocaleString('id-ID')}} 
              <div v-if="getDetailsResult.free_shipping" class="tooltip">&#128666;
                <span class="tooltiptext">¡Envío gratis!</span>
            </div>
            </div>
            <div class="product-info-data__button"><button>Comprar</button></div>
          </div>
        </div>
        <div class="details-description">
          <div class="details-description__title">Descripción del producto</div>
          <div class="details-description__text">{{getDetailsResult.description}}</div>
        </div>
      </div>
    </div>
    <div v-else class="items">
      No se encontró ningún producto con ID="{{$route.params.id}}".
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Details',
  computed: {
    ...mapGetters(['getDetailsResult', 'getLoadingDetails']),
  },
  methods: {
    ...mapActions(['updateDetailsResult']),
  },
  mounted() {
    if (this.$route.params.id) {
      this.updateDetailsResult(this.$route.params.id);
    } else {
      this.$router.push({ path: '/' });
    }
  },
}
</script>

<style lang="scss">
  .details-result {
    padding: 32px;
    max-width: 1200px;
    width: 100%;
    background-color: white;
    box-sizing: border-box;
  }
  .product-info {
    display: flex;
    flex-direction: row;
    margin-bottom: 32px;
    &__image{
      img {
        width: 580px;
        height: 580px;
      }
    }
  }
  .product-info-data {
    width: 100%;
    margin-left: 18px;
    &__sold-quantity {
      font-size: 14px;
    }
    &__title {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 16px;
    }
    &__price {
      font-size: 46px;
      font-weight: 500;
      .tooltip {
        font-size: 28px;
        position: absolute;
        .tooltiptext {
          font-size: 18px;
        }

      }
    }
    &__button {
      button {
        width: 100%;
        height: 40px;
        background-color: #3483FA;
        border: none;
        border-radius: 4px;
        color: white;
        font-weight: 500;
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
  .details-description {
    &__title {
      font-size: 28px;
      margin-bottom: 16px;
    }
    &__text {
      font-size: 16px;
      text-align: justify;
      text-justify: inter-word;
    }
  }
</style>