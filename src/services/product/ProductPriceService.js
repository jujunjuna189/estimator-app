import axios from "axios"
import resApi from "../../constants/Api"

async function getProductPrice(dataBatch) {
    let url = resApi.productPriceShow + '?data_batch=' + dataBatch;
    let response = await axios.get(url);
    return response.data.data;
}

export {
    getProductPrice,
}