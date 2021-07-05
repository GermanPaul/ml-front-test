class Item {
  static formatResponse(itemResponse, descriptionResponse) {
    return {
      author: {
        name: 'German',
        lastname: 'Pretelt',
      },
      item: {
        id: itemResponse.id,
        title: itemResponse.title,
        price: {
          currency: itemResponse.currency_id,
          amount: itemResponse.price,
        },
        picture: itemResponse.thumbnail,
        condition: itemResponse.condition,
        free_shipping: itemResponse.shipping.free_shipping,
        sold_quantity: itemResponse.sold_quantity,
        description: descriptionResponse.plain_text,
      },
    };
  }

  static getCategories(data) {
    const categories = [];
    data.path_from_root.forEach((category) => {
      categories.push(category.name);
    });
    return categories;
  }
}

module.exports = Item;
