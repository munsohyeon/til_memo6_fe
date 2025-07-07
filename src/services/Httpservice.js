import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8080/practice'

class HttpService {
    async postMemo(bodyJson) {
        const res = await axios.post('/memo', bodyJson);
        return res.data;
    }
    async getListMemo(params) {
        const res = await axios.get('/memo', { params });
        return res.data;
    }
    async getMemo(id) {
        const res = await axios.get(`/memo/${id}`);
        return res.data;
    }
    async putMemo(bodyJson) {
        const res = await axios.put('/memo', bodyJson);
        return res.data;
    }
    async deleteMemo(id) {
        const res = await axios.delete(`/memo?id=${id}`);
        return res.data;
    }
}
export default new HttpService();