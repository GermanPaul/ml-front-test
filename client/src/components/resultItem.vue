<template>
  <div class="item" @click="$router.push({ path: `/items/${id}`})">
    <div class="item__image"><img :src="imageURL" :alt="title"></div>
    <div class="item__details">
      <div class="item-info">
        <div class="item-info__price"> 
          <div>$ {{price}}</div>
          <div v-if="freeShipping" class="tooltip item-info__shipping">&#128666;
            <span class="tooltiptext">¡Envío gratis!</span>
          </div>
        </div>
        <div class="item-info__title">{{title}}</div>
        <div class="item-info__condition">{{condition === 'new' ? 'Nuevo' : 'Usado'}}</div>
      </div>
      <div class="item-location">{{stateName}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultItem',
  props: {
    id: {
      type: String,
      default: ''
    },
    price: {
      type: String,
      default: 'N/A',
    },
    freeShipping: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'N/A',
    },
    condition: {
      type: String,
      default: 'used'
    },
    stateName: {
      type: String,
      default: 'N/A'
    },
    imageURL: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss">
  .item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 212px;
    border-bottom: 1px solid #EEEEEE;
    &__image {
      width: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 16px;
      margin-right: 16px;
      img {
        max-width: 180px;
        max-height: 180px;
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
    }
    &__details {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      .item-location {
        width: 30%;
        font-size: 12px;
      }
    }
    &:hover {
      border: 1px solid #999999;
      cursor: pointer;
    }
  }
  .item-info {
    width: 70%;
    &__title, &__condition {
      font-size: 18px;
    }
    &__price {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 32px;
      &:first-child {
        font-weight: 600;
        font-size: 24px;
      }
    }
    &__shipping {
      display: inline-block;
      margin-bottom: 8px;
      margin-left: 4px;
      .tooltiptext {
        font-size: 18px;
      }
    }
  }
</style>