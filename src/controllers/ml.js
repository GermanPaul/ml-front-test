const axios = require('axios');
const apiUrl = 'https://api.mercadolibre.com';
const sitesEndpoint = `${apiUrl}/sites/MLA/search`;
const itemsEndpoint = `${apiUrl}/items/{id}`;

module.exports = {
  getItems: (req, res) => {
    axios.get(sitesEndpoint, {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        q: req.query.q
      }
    }).then(function (response) {
      const categories = [];
      const categoryFilter = response.data.available_filters.filter(item => item.id === 'category');
      if (categoryFilter.length > 0) {
        categoryFilter[0].values.forEach(category => {
          categories.push(category.name);
        })
      }
      const items = [];
      response.data.results.forEach(result => {
        items.push({
          id: result.id,
          title: result.title,
          price: {
            currency: result.currency_id,
            amount: result.price
          },
          picture: result.thumbnail,
          condition: result.condition,
          free_shipping: result.shipping.free_shipping
        });
      });
      const formattedResponse = {
        author: {
          name: 'German',
          lastname: 'Pretelt'
        },
        categories: categories,
        items: items
      };
      res.json(formattedResponse);
    }).catch(function (error) {
      res.status(500).json(error.message);
    })
  },
  getItem: (req, res) => {
    const itemUrl = itemsEndpoint.replace('{id}', req.params.id);
    axios.all([
      axios.get(itemUrl),
      axios.get(`${itemUrl}/description`)
    ]).then(axios.spread((...responses) => {
      const formattedResponse = {
        author: {
          name: 'German',
          lastname: 'Pretelt'
        },
        item: {
          id: responses[0].data.id,
          title: responses[0].data.title,
          price: {
            currency: responses[0].data.currency_id,
            amount: responses[0].data.price
          },
          picture: responses[0].data.thumbnail,
          condition: responses[0].data.condition,
          free_shipping: responses[0].data.shipping.free_shipping,
          sold_quantity: responses[0].data.sold_quantity,
          description: responses[1].data.plain_text
        }
      };
      res.json(formattedResponse);
    })).catch(function (error) {
      res.status(500).json(error.message);
    });
  }
}