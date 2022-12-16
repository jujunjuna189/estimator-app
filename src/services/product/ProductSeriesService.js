import axios from "axios"
import resApi from "../../constants/Api"

async function getProductSeries(product_id) {
    let url = resApi.productSeriesShow + '?product_id=' + product_id;
    let response = await axios.get(url);
    return response.data.data;
}

export {
    getProductSeries,
}