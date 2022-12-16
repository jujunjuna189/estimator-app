import axios from "axios"
import resApi from "../../constants/Api"

async function getProduct() {
    let response = await axios.get(resApi.productShow);
    return response.data.data;
}

export {
    getProduct,
}