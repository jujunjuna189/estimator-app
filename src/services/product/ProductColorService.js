import axios from "axios"
import resApi from "../../constants/Api"

async function getProductColor(product_id) {
    let url = resApi.productColorShow + '?product_id=' + product_id;
    let response = await axios.get(url);
    return response.data.data;
}

export {
    getProductColor,
}