const domain = 'https://dev-estimator-backend.hkmu.co.id/';
// const domain = 'http://127.0.0.1:8000/';
const api = domain + 'api/';

const resApi = {
    domain: domain,
    domainApi: api,
    // Auth
    authSignIn: api + 'login',
    // Dashboard product 
    // Product
    productShow: api + 'dashboard/product',
    // Product model
    productModelShow: api + 'dashboard/product/model',
    // Product series
    productSeriesShow: api + 'dashboard/product/series',
    // Product type
    productTypeShow: api + 'dashboard/product/series/type',
    // Product thickness
    productThicknessShow: api + 'dashboard/product/thickness',
    // Product color
    productColorShow: api + 'dashboard/product/color',
    // Product price
    productPriceShow: api + 'dashboard/product/price',
    // Product Workspace
    productWorkspaceStore: api + 'dashboard/product/workspace/store',
}

export default resApi;