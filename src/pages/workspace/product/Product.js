import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LGlogo1 } from "../../../assets";
import { BTDownloadFloatRange, CBProductCard, FieldNumber, FieldText, FieldTextArea, ImageChoose } from "../../../components";
import CBSmallCard from "../../../components/card-button/CBSmallCard";
import resApi from "../../../constants/Api";
import { getProductColor } from "../../../services/product/ProductColorService";
import { getProductModel } from "../../../services/product/ProductModelService";
import { getProductPrice } from "../../../services/product/ProductPriceService";
import { getProductSeries } from "../../../services/product/ProductSeriesService";
import { getProduct } from "../../../services/product/ProductService";
import { getProductThickness } from "../../../services/product/ProductThicknessService";
import { getProductType } from "../../../services/product/ProductTypeService";
import { storeProductWorkspace } from "../../../services/product/ProductWorkspaceService";
import { formatCurrency } from "../../../utils/formatCurrency";

function Product() {
    // Navigation
    const navigation = useNavigate();
    // //
    const [product, setProduct] = useState([]);
    const [productAttribute, setProductAttribute] = useState({});
    // Product draf
    const [productDraf, setProductDraf] = useState({});
    // List Draf
    const [listDraf, setListDraf] = useState([]);
    // Navigation
    const [navProp, setNavProp] = useState({ nav_right: 1, });
    // Form Information
    const [formInformationProp, setFormInformationProp] = useState({});

    useEffect(function () {
        getProduct().then(function (data) {
            setProduct(data);
        });
    }, []);

    const getModel = (product_id) => {
        getProductModel(product_id).then(function (data) {
            setAttribute('model', data);
            setDraf('product_model', data[0]);
            setProductModel(0);
        });
    }

    const getSeries = (product_id) => {
        getProductSeries(product_id).then(function (data) {
            setAttribute('series', data);
            setDraf('product_series', data[0]);
        });
    }

    const getType = (product_id, product_series_id) => {
        getProductType(product_id, product_series_id).then(function (data) {
            setAttribute('type', data);
        });
    }

    const getThickness = (product_id) => {
        getProductThickness(product_id).then(function (data) {
            setAttribute('thickness', data);
        });
    }

    const getColor = (product_id) => {
        getProductColor(product_id).then(function (data) {
            setAttribute('color', data);
        });
    }

    const getPrice = async (dataBatch) => {
        await getProductPrice(dataBatch).then(function (data) {
            data.forEach((val, index) => {
                productDraf.model_product.value[index].price = val.price ?? val.label;
                setProductDraf({
                    ...productDraf,
                });
            });
        });
    }

    const setAttribute = (key, data) => {
        if (data.length === 0) {
            productAttribute[key] = undefined;
        } else {
            productAttribute[key] = {
                label: key,
                data: data,
            };
        }
        setProductAttribute({
            ...productAttribute
        });
    }

    const setDraf = (key, data) => {
        productDraf[key] = {
            value: data,
        };
        setProductDraf({
            ...productDraf
        });
    }

    const setProductModel = (ttlModel = 0) => {
        let data = [];
        for (let i = 0; i <= ttlModel; i++) {
            data.push({
                label: 'Setting ' + (i + 1),
                sizeVertical: 0,
                sizeHorizontal: 0,
            });
        }

        setAttribute('model_product', data);
        setDraf('model_product', data);
        setDraf('model_product_setting', 0);
    }

    const setIsActiveData = (index, array) => {
        let data = [];
        array.forEach((val, index_val) => {
            data.push({ ...val, isActive: index === index_val ? true : false });
        });
        return data;
    }

    const onClickProduct = (index, { id }) => {
        let productData = product[index];
        productDraf['product'] = productData;
        setProductDraf({ ...productDraf });
        getSeries(id);
        getModel(id);
        setProduct(setIsActiveData(index, product));
    }

    const onClickSeries = (index, { id, product_id, name }) => {
        productDraf.model_product.value.map((val, index) => productDraf.model_product.value[index].type = undefined);
        getType(product_id, id);
        setDraf('product_series', {
            id: id,
            name: name
        });
        productAttribute.series.data = setIsActiveData(index, productAttribute.series.data);
        setProductAttribute({ ...productAttribute });
    }

    const onCLickModel = (index = 0, val) => {
        setProductModel(index);
        setDraf('product_model', val);
        productAttribute.model.data = setIsActiveData(index, productAttribute.model.data);
        setProductAttribute({ ...productAttribute });
    }

    const onClickProductModel = (index) => {
        getType(productDraf?.product.id, productDraf.product_series?.value?.id);
        getThickness(productDraf?.product.id);
        getColor(productDraf?.product.id);
        setDraf('model_product_setting', index);
    }

    const onClickType = (index, { id, name }) => {
        productDraf.model_product.value[productDraf.model_product_setting.value].type = {
            id: id,
            name: name,
        };
        setProductDraf({
            ...productDraf
        });
        productAttribute.type.data = setIsActiveData(index, productAttribute.type.data);
        setProductAttribute({ ...productAttribute });
    }

    const onClickThickness = (index, { id, name }) => {
        productDraf.model_product.value[productDraf.model_product_setting.value].thickness = {
            id: id,
            name: name,
        };
        setProductDraf({
            ...productDraf
        });
        productAttribute.thickness.data = setIsActiveData(index, productAttribute.thickness.data);
        setProductAttribute({ ...productAttribute });
    }

    const onClickColor = (index, { id, name }) => {
        productDraf.model_product.value[productDraf.model_product_setting.value].color = {
            id: id,
            name: name,
        };
        setProductDraf({
            ...productDraf
        });
        productAttribute.color.data = setIsActiveData(index, productAttribute.color.data);
        setProductAttribute({ ...productAttribute });
    }

    const onChangeRangeProduct = (index, event, keyRange) => {
        productAttribute.model_product.data[index][keyRange] = event.target.value;
        setProductAttribute({
            ...productAttribute
        });
    }

    const onChangeQuantity = (value) => {
        productDraf.quantity = { value: value };
        calculateSubTotal();
    }

    const onChangeDiscon = (value) => {
        productDraf.discon = { value: value };
        setProductDraf({ ...productDraf });
        calculateGrandTotal();
    }

    const onCheckPrice = () => {
        let data = [];
        productDraf.model_product?.value.map((val, index) => data.push({
            product_id: productDraf.product.id,
            product_series_id: productDraf.product_series?.value?.id,
            product_type_id: val.type?.id,
        }));
        getPrice(JSON.stringify(data)).then(function () {
            calculateSubTotal();
            console.log(productDraf);
        });
    }

    const onChangeDescription = (value) => {
        setDraf('description', value);
    }

    const onChangePicture = (data) => {
        onSetFormProduct('location_image', data);
    }

    const calculateSubTotal = () => {
        let subTotal = 0;
        productDraf.model_product?.value.forEach((val, index) => {
            let priceInt = parseInt(val.price);
            let priceFix = isNaN(priceInt) ? 0 : val.price;
            let vertical_fix = val.sizeVertical / 1000;
            let horizontal_fix = val.sizeHorizontal / 1000;
            let broad = vertical_fix * horizontal_fix;
            let priceBroad = broad * priceFix;
            let priceCeil = Math.ceil(priceBroad);
            val.price_broad = priceCeil; //To array
            subTotal += priceCeil; // To GSub total
        });
        subTotal = parseInt(subTotal) * (productDraf.quantity?.value ?? 0);
        setDraf('sub_total', subTotal);
    }

    const calculateGrandTotal = () => {
        let grandTotal = 0;
        listDraf.forEach((val, index) => {
            grandTotal += val.sub_total?.value;
        });
        let discon = Math.ceil((grandTotal * (isNaN(productDraf.discon?.value) ? 0 : productDraf.discon?.value)) / 100);
        grandTotal = Math.ceil(grandTotal - discon);
        setDraf('grand_total', grandTotal);
        setDraf('discount_price', discon);
    }

    const onSaveProductDraf = () => {
        calculateSubTotal();
        listDraf.push({ ...productDraf });
        setListDraf([...listDraf]);
        calculateGrandTotal();
    }

    const removeItemListDraf = (index) => {
        listDraf.splice(index, 1);
        setListDraf([...listDraf]);
        calculateGrandTotal();
    }

    // Information
    const onSetFormProduct = (key, value) => {
        formInformationProp[key] = value;
        setFormInformationProp({ ...formInformationProp });
    }

    // Final onstep
    const setDataBatch = () => {
        let dataBatch = {
            data_draf: productDraf,
            data_product: listDraf,
            data_form: formInformationProp,
        };
        return dataBatch;
    }

    const onToQuotation = () => {
        storeProductWorkspace({
            databatch: JSON.stringify(setDataBatch()),
        }).then(function (data) {
            let dataBatch = {
                ...setDataBatch(),
                data_report: { number: data.number },
            };
            navigation('/quotation', { state: dataBatch });
        });
    }

    // Right Tab
    const rightTab = () => {
        if (navProp.nav_right === 1) {
            return previewSettingTab();
        } else if (navProp.nav_right === 2) {
            return listProductTab();
        } else {
            return informationTab();
        }
    }

    const todoProduct = product.map((val, index) => <CBProductCard key={index} title={val.name} isActive={val.isActive} handleClick={() => onClickProduct(index, val)} />);
    const todoProductModel = productAttribute.model?.data.map((val, index) => <CBSmallCard key={index} title={val.name} isActive={val.isActive} ttlIcons={index} handleClick={() => onCLickModel(index, val)} />);
    const todoProductSeries = productAttribute.series?.data.map((val, index) => <CBProductCard key={index} title={val.name} isActive={val.isActive} handleClick={() => onClickSeries(index, val)} />);
    const todoProductType = productAttribute.type?.data.map((val, index) => <CBProductCard key={index} title={val.name} isActive={val.isActive} handleClick={() => onClickType(index, val)} />);
    const todoProductThickness = productAttribute.thickness?.data.map((val, index) => <CBProductCard key={index} title={val.name} isActive={val.isActive} handleClick={() => onClickThickness(index, val)} />);
    const todoProductColor = productAttribute.color?.data.map((val, index) => <CBProductCard key={index} title={val.name} isActive={val.isActive} handleClick={() => onClickColor(index, val)} />);

    const previewSettingTab = () => {
        return (
            <>
                <div className="mb-3 border p-2 rounded-lg">
                    <small className="font-bold">Description Product</small>
                    <div className="mt-1 flex flex-wrap gap-2">
                        <small className="border border-dashed border-slate-400 font-medium rounded-md p-1 px-2">{productDraf.product?.name}</small>
                        <small className="border border-dashed border-slate-400 font-medium rounded-md p-1 px-2">{productDraf.product_series?.value?.name}</small>
                        <small className="border border-dashed border-slate-400 font-medium rounded-md p-1 px-2">{productDraf.product_model?.value?.name}</small>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {productDraf.model_product?.value.map((val, index) =>
                        <div key={index} className="border shadow-sm py-4 px-2 rounded-md">
                            <div className="flex justify-center">
                                <small className="size-md font-bold rounded-lg bg-slate-100 px-3 py-1 inline-flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-settings" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                    <span className="font-bold text-sm">{val.label}</span>
                                </small>
                            </div>
                            <ul className="px-2 mt-3 text-sm">
                                <li>{val.type?.name}</li>
                                <li>{val.color?.name}</li>
                                <li>{val.thickness?.name}</li>
                                <li>(P) {val.sizeVertical} mm</li>
                                <li>(L) {val.sizeHorizontal} mm</li>
                                <li className="pt-2"><span className="font-bold">{typeof val.price === 'number' ? formatCurrency(val.price.toString()) : val.price}{typeof val.price === 'number' ? <span>/m<sup>2</sup></span> : ''}</span></li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className="mt-6">
                    <FieldTextArea value={productDraf?.description?.value} handleChange={(event) => onChangeDescription(event.target.value)} />
                </div>
                <div className="mt-3">
                    <div className="">
                        <FieldNumber value={isNaN(productDraf?.quantity?.value) ? '' : productDraf?.quantity?.value} label="Qty" handleChange={(event) => onChangeQuantity(event.target.value)} />
                    </div>
                </div>
                <div className="border border-dashed border-slate-400 mt-3 flex justify-between p-3 rounded-md font-bold mb-3">
                    <span>Sub Total</span>
                    <span>{formatCurrency(isNaN(productDraf.sub_total?.value) ? 0 : productDraf.sub_total?.value)}</span>
                </div>
                <div className="pt-4 mb-3 border-t border-dashed">
                    <small className="rounded-md bg-blue-200 py-2 px-3 font-bold size-[10px] inline-block cursor-pointer" onClick={() => onCheckPrice()}>
                        Check Price
                    </small>
                    <small className="rounded-md bg-green-200 py-2 px-3 font-bold size-[10px] inline-block ml-2 cursor-pointer" onClick={() => onSaveProductDraf()}>
                        Save
                    </small>
                </div>
            </>
        );
    }

    const listProductTab = () => {
        return (
            <>
                <div>
                    <small className="font-bold">List product</small>
                    <div className="mt-2">
                        {listDraf.map((val, index) =>
                            <div key={index} className="border border-dashed border-slate-400 font-medium rounded p-2 mb-1 leading-none flex flex-wrap justify-between items-center">
                                <div>
                                    <small>{val?.product?.name.substr(0, 1) + `${(index + 1)}`} - {val.product_series?.value?.name} - {val.product_model?.value?.name}</small>
                                    <div>
                                        <small className="font-bold">{formatCurrency(isNaN(val.sub_total?.value) ? 0 : val.sub_total?.value)}</small>
                                    </div>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash cursor-pointer" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round" onClick={() => removeItemListDraf(index)}>
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <line x1="4" y1="7" x2="20" y2="7" />
                                        <line x1="10" y1="11" x2="10" y2="17" />
                                        <line x1="14" y1="11" x2="14" y2="17" />
                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="mt-6">
                        <FieldNumber value={isNaN(productDraf?.discon?.value) ? '' : productDraf?.discon?.value} label="Discount" max={15} maxLabel="Discount amount Not allowed" handleChange={(event) => onChangeDiscon(event.target.value)} />
                    </div>
                    <div className="border border-dashed border-slate-400 mt-3 flex justify-between p-3 rounded-md font-bold mb-3">
                        <span>Grand Total</span>
                        <span>{formatCurrency(isNaN(productDraf.grand_total?.value) ? 0 : productDraf.grand_total?.value)}</span>
                    </div>
                </div>
            </>
        );
    }

    const informationTab = () => {
        return (
            <>
                <div>
                    <div className="pb-4 border-b border-dashed">
                        <small className="font-bold">Sales Information</small>
                        <div>
                            <FieldText value={formInformationProp.sales_person} label="Sales Person" handleChange={(event) => onSetFormProduct('sales_person', event.target.value)} />
                            <FieldText value={formInformationProp.code_name} label="Code Name" handleChange={(event) => onSetFormProduct('code_name', event.target.value)} />
                        </div>
                    </div>
                    <div>
                        <small className="font-bold">Project Information</small>
                        <div>
                            <FieldText value={formInformationProp.project_name} label="Nama Proyek" handleChange={(event) => onSetFormProduct('project_name', event.target.value)} />
                            <FieldText value={formInformationProp.contact_name} label="Nama Pelanggan" handleChange={(event) => onSetFormProduct('contact_name', event.target.value)} />
                            <FieldText value={formInformationProp.jabatan_contact} label="UP" handleChange={(event) => onSetFormProduct('jabatan_contact', event.target.value)} />
                            <FieldText value={formInformationProp.no_contact} label="NO. HP/WA" handleChange={(event) => onSetFormProduct('no_contact', event.target.value)} />
                            <FieldText value={formInformationProp.alamat} label="Alamat" handleChange={(event) => onSetFormProduct('alamat', event.target.value)} />
                        </div>
                    </div>
                    <div className="mt-3">
                        <small className="font-bold">Foto</small>
                        <div className="mt-2">
                            <ImageChoose handleChangePicture={(data) => onChangePicture(data)} />
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="h-screen w-screen bg-slate-50">
            <div className="px-3 py-[0.8rem] bg-white flex justify-between items-center">
                <img src={LGlogo1} className="w-[130px]" alt="Logo Handex" />
                <div className="flex gap-2">
                    <BTDownloadFloatRange downloadLink={resApi.productWorkspaceExport} />
                    <span className="border border-slate-500 border-dashed rounded-md px-2 py-2 text-sm text-white font-medium flex items-center gap-1 cursor-pointer" onClick={() => onToQuotation()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-report" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#0f172a" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="17" cy="17" r="4" />
                            <path d="M17 13v4h4" />
                            <path d="M12 3v4a1 1 0 0 0 1 1h4" />
                            <path d="M11.5 21h-6.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v2m0 3v4" />
                        </svg>
                    </span>
                </div>
            </div>
            <div className="md:flex md:fixed md:w-screen md:bottom-0 md:top-16 ">
                <div className="w-full border-dashed rounded-r-lg px-3 pt-2 overflow-y-auto md:w-[17rem]">
                    <div>
                        <small className="font-bold mb-4">General Type</small>
                        <div className="max-h-[15rem] overflow-y-auto mt-1">
                            {todoProduct}
                        </div>
                    </div>
                    <div className="mt-3">
                        <small className="size-sm font-bold">{productAttribute.series?.label}</small>
                        <div className="max-h-[15rem] overflow-y-auto mt-1">
                            {todoProductSeries}
                        </div>
                    </div>
                    <div className="mt-3">
                        <small className="font-bold">{productAttribute.model?.label}</small>
                        <div className="max-h-[15rem] overflow-y-auto mt-1">
                            {todoProductModel}
                        </div>
                    </div>
                </div>
                <div className="flex-1 border border-slate-200 rounded-lg mx-2 bg-white overflow-auto">
                    <div className="inline-flex min-w-full max-w-none justify-center pt-10 px-2">
                        {productAttribute.model_product?.data.map((val, index) =>
                            <div key={index}>
                                <div className="border border-dashed border-slate-600 hover:border-slate-900 w-[8rem] h-[13rem] relative" onClick={() => onClickProductModel(index)}>
                                    <small className="absolute right-1 top-24 font-bold">(P)</small>
                                    <small className="absolute right-[4.3rem] bottom-1 font-bold">(L)</small>
                                </div>
                                <div className="mt-4">
                                    <div className="relative">
                                        <small className="font-bold text-slate-700 mr-2">P</small>
                                        <input type="number" autoFocus className="text-[12.5px] text-slate-700 p-1 font-bold outline-none bg-transparent border w-[6.5rem]" value={val.sizeVertical} onChange={(event) => onChangeRangeProduct(index, event, 'sizeVertical')} />
                                        <div className="absolute top-0 right-0"><small className="font-bold text-slate-700 mr-2">mm</small></div>
                                    </div>
                                    {/* <input type="range" step={1} min="0" max="100" defaultValue={val.sizeVertical} className="appearance-none bg-slate-300 rounded-md h-1.5" onChange={(event) => onChangeRangeProduct(index, event, 'sizeVertical')} /> */}
                                </div>
                                <div>
                                    <div className="relative">
                                        <small className="font-bold text-slate-700 mr-2">L</small>
                                        <input type="number" autoFocus className="text-[12.5px] text-slate-700 p-1 font-bold outline-none bg-transparent border w-[6.5rem]" value={val.sizeHorizontal} onChange={(event) => onChangeRangeProduct(index, event, 'sizeHorizontal')} />
                                        <div className="absolute bottom-1 right-0"><small className="font-bold text-slate-700 mr-2">mm</small></div>
                                    </div>
                                    {/* <input type="range" step={1} min="0" max="100" defaultValue={val.sizeHorizontal} className="appearance-none bg-slate-300 rounded-md h-1.5" onChange={(event) => onChangeRangeProduct(index, event, 'sizeHorizontal')} /> */}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="border-t border-dashed border-slate-300 mt-6 p-3">
                        <small className="size-md font-bold rounded-lg bg-slate-100 px-3 py-1 inline-flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-settings" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                            {productDraf.model_product?.value[productDraf.model_product_setting?.value]?.label}
                        </small>
                        <div className="px-3">
                            <div className="mt-2">
                                <small className="size-sm font-bold">{productAttribute.type?.label}</small>
                                <div className="mt-2 max-h-40 overflow-y-auto">
                                    {todoProductType}
                                </div>
                            </div>
                            <div>
                                <small className="size-sm font-bold">{productAttribute.color?.label}</small>
                                <div className="mt-2 max-h-40 overflow-y-auto">
                                    {todoProductColor}
                                </div>
                            </div>
                            <div>
                                <small className="size-sm font-bold">{typeof productAttribute.thickness?.label === 'undefined' ? '' : 'glass'} {productAttribute.thickness?.label}</small>
                                <div className="mt-2 max-h-40 overflow-y-auto">
                                    {todoProductThickness}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 border border-slate-200 rounded-l-lg bg-white max-w-[30rem] overflow-auto">
                    <div className="p-2 flex gap-2 overflow-x-auto border-b">
                        <small className="size-md font-bold rounded-lg bg-slate-100 px-3 py-1 inline-flex whitespace-nowrap items-center gap-1 cursor-pointer" onClick={() => setNavProp({ nav_right: 3 })}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-info-circle" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <circle cx="12" cy="12" r="9" />
                                <line x1="12" y1="8" x2="12.01" y2="8" />
                                <polyline points="11 12 12 12 12 16 13 16" />
                            </svg>
                            <span>Information</span>
                        </small>
                        <small className="size-md font-bold rounded-lg bg-slate-100 px-3 py-1 inline-flex whitespace-nowrap items-center gap-1 cursor-pointer" onClick={() => setNavProp({ nav_right: 1 })}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-settings" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                            <span>Preview Setting</span>
                        </small>
                        <small className="size-md font-bold rounded-lg bg-slate-100 px-3 py-1 inline-flex whitespace-nowrap items-center gap-1 cursor-pointer" onClick={() => setNavProp({ nav_right: 2 })}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-box" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" />
                                <line x1="12" y1="12" x2="20" y2="7.5" />
                                <line x1="12" y1="12" x2="12" y2="21" />
                                <line x1="12" y1="12" x2="4" y2="7.5" />
                            </svg>
                            <span>List Product</span>
                            <small className="rounded-lg bg-slate-900 px-2 text-white">{listDraf.length}</small>
                        </small>
                    </div>
                    <div className="overflow-auto p-4">
                        {/* Content nav right */}
                        {rightTab()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;