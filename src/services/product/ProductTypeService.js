import axios from "axios"
import resApi from "../../constants/Api"

async function getProductType(product_id, product_series_id) {
    let url = resApi.productTypeShow + '?product_id=' + product_id + '&product_series_id=' + product_series_id;
    let response = await axios.get(url);
    return response.data.data;
}

export {
    getProductType,
}