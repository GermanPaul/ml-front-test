const axios = require('axios');
const Items = require('../helpers/items');
const Item = require('../helpers/item');

const apiUrl = process.env.API_URL;
const sitesEndpoint = `${apiUrl}/sites/MLA/search`;
const itemsEndpoint = `${apiUrl}/items/{id}`;
const categoryEndpoint = `${apiUrl}/categories/{id}`;

module.exports = {
  getItems: (req, res) => {
    axios.get(sitesEndpoint, {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        q: req.query.q
      }
    }).then((response) => {
      const data = response.data;
      const categories = Items.getCategories(data);
      const items = Items.getItems(data);
      const formattedResponse = {
        author: {
          name: 'German',
          lastname: 'Pretelt'
        },
        categories: categories,
        items: items
      };
      res.json(formattedResponse);
    }).catch((error) => {
      if(error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res.status(500).json(error.message);
      };
    })
  },
  getItem: (req, res) => {
    const itemUrl = itemsEndpoint.replace('{id}', req.params.id);
    let formattedResponse = {};
    axios.all([
      axios.get(itemUrl),
      axios.get(`${itemUrl}/description`)
    ]).then(axios.spread((...responses) => {
      const itemResponse = responses[0].data;
      const descriptionResponse = responses[1].data;
      formattedResponse = Item.formatResponse(itemResponse, descriptionResponse);
      const categoryUrl = categoryEndpoint.replace('{id}', responses[0].data.category_id);
      return axios.get(categoryUrl);
    })).then(response => {
      formattedResponse.item.categories = Item.getCategories(response.data);
      res.json(formattedResponse);
    }).catch((error) => {
      if(error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res.status(500).json(error.message);
      };
    });
  }
};