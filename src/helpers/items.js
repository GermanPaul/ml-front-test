class Items {
  static getCategories(data) {
    const categories = [];
    const categoryFilter = data.filters.filter(item => item.id === 'category');

    if (categoryFilter.length > 0 && categoryFilter[0].values.length > 0) {
      categoryFilter[0].values[0].path_from_root.forEach(path => {
        categories.push(path.name);
      })
    };

    return categories;
  };

  static getItems(data) {
    const items = [];
    data.results.forEach(result => {
      items.push({
        id: result.id,
        title: result.title,
        price: {
          currency: result.currency_id,
          amount: result.price
        },
        picture: result.thumbnail,
        condition: result.condition,
        free_shipping: result.shipping.free_shipping,
        state_name: result.address.state_name
      });
    });
    return items;
  };
};

module.exports = Items;