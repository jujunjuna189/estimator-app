import axios from "axios"
import resApi from "../../constants/Api"

async function storeProductWorkspace(data) {
    let url = resApi.productWorkspaceStore;
    let response = await axios.post(url, data, {
        headers: {
            Accept: 'application/json',
        },
    });
    return response.data.data;
}

export {
    storeProductWorkspace,
}