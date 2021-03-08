import axios from 'axios';

export class MlApi {
    getItems(query) {
        return axios.get('/api/items', {
            params: {
                q: query
            }
        })
    }
    getItemInfo(id) {
        const url = `/api/items/${id}`;
        return axios.get(url, {})
    }
}