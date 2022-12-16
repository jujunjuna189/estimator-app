import axios from "axios"
import resApi from "../../constants/Api"

async function getProductModel(product_id) {
    let url = resApi.productModelShow + '?product_id=' + product_id;
    let response = await axios.get(url);
    return response.data.data;
}

export {
    getProductModel,
}