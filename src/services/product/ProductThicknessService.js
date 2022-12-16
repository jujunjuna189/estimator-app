import axios from "axios"
import resApi from "../../constants/Api"

async function getProductThickness(product_id) {
    let url = resApi.productThicknessShow + '?product_id=' + product_id;
    let response = await axios.get(url);
    return response.data.data;
}

export {
    getProductThickness,
}