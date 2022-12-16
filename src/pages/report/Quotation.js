import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { LGlogo1 } from "../../assets";
import { fixNanNumber } from "../../utils/fixNan";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDateNow } from "../../utils/formatDate";
import { formatRomawiMonth } from "../../utils/formatMonth";

function Quotation() {
    const location = useLocation();
    const objParam = location?.state;
    const [sumData, setSumData] = useState({});

    useEffect(function () {
        countSum();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const countSum = () => {
        defaultData();
        objParam?.data_product.forEach((val, index) => {
            val.model_product.value.forEach((value, index_value) => {
                sumData.vertical = (sumData.vertical ?? 0) + parseInt(value.sizeVertical);
                sumData.horizontal = (sumData.horizontal ?? 0) + parseInt(value.sizeHorizontal);
                sumData.subTotal = (sumData.subTotal ?? 0) + parseInt(value.price_broad);
            });
        });

        objParam?.data_product.forEach((val, index) => {
            sumData.total = (sumData.total ?? 0) + parseInt(val.sub_total.value);
        });

        setSumData({ ...sumData });
    }

    const countPPN = (grandTotal) => {
        let ppn = Math.ceil((grandTotal * 11) / 100);
        return ppn;
    }

    const defaultData = () => {
        sumData.vertical = 0;
        sumData.horizontal = 0
        sumData.subTotal = 0
        sumData.total = 0;
    }

    return (
        <>
            <div className="flex justify-center relative bg-slate-100 pb-4">
                <div className="print:hidden mt-7 container flex justify-end pr-10 bg-white shadow-md rounded-lg py-2 ">
                    <span className="bg-slate-900 text-white rounded-md px-3 py-2 cursor-pointer" onClick={() => window.print()}>Print</span>
                </div>
            </div>
            <div className="flex justify-center py-10 print:mx-[1rem]">
                <div className="relative container rounded print:border-0 print:p-0 print:max-w-full">
                    <div className="absolute top-0 left-0 print:top-0 print:left-0">
                        <img src={LGlogo1} className="w-[170px]" alt="Logo Handex" />
                    </div>
                    <div className="text-center">
                        <span className="text-[25px] font-black uppercase">Quotation</span>
                    </div>
                    <section className="mt-10">
                        <div className="flex justify-end">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="text-sm"><span className="font-bold">NO. PENAWARAN</span></td>
                                        <td className="text-sm"> : {objParam?.data_report?.number}/HDX/QTT/{formatRomawiMonth(new Date().getMonth())}/{formatDateNow().substring(formatDateNow().length, (formatDateNow.length + (formatDateNow().length - 2)))}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-sm"><span className="font-bold">TANGGAL</span></td>
                                        <td className="text-sm"> : {formatDateNow()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-8">
                            <span className="font-medium">
                                Dengan Hormat, <br /><br />
                                Kami <span className="font-bold">PT. Multi Facade Industri</span> bermaksud mengajukan penawaran harga, dengan detail sebagai berikut:
                            </span>
                        </div>
                        <div className="mt-4 flex justify-between">
                            <div>
                                <table className="text-[14px] mt-2">
                                    <tbody>
                                        <tr>
                                            <th className="align-top text-left w-[10rem]">Nama Proyek</th>
                                            <td className="w-[24rem]">{objParam?.data_form?.project_name}</td>
                                        </tr>
                                        <tr>
                                            <th className="align-top text-left w-[10rem]">Nama Pelanggan</th>
                                            <td className="w-[24rem]">{objParam?.data_form?.contact_name}</td>
                                        </tr>
                                        <tr>
                                            <th className="align-top text-left w-[10rem]">UP</th>
                                            <td className="w-[24rem]">{objParam?.data_form?.jabatan_contact}</td>
                                        </tr>
                                        <tr>
                                            <th className="align-top text-left w-[10rem]">NO.HP/WA</th>
                                            <td className="w-[24rem]">{objParam?.data_form?.no_contact}</td>
                                        </tr>
                                        <tr>
                                            <th className="align-top text-left w-[10rem]">Alamat</th>
                                            <td className="w-[24rem]">
                                                {objParam?.data_form?.alamat}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td colSpan={2} className="text-sm">
                                                {/* <img src={IMGexampleLocation} alt="Lokasi Project" className="w-[220px] rounded-md mt-3" /> */}
                                                <div className="mt-3">
                                                    <img src={objParam?.data_form?.location_image} alt="Image_location" className={`w-[14.5rem] h-[8.5rem] rounded-md ${typeof objParam?.data_form?.location_image === "undefined" ? 'hidden' : ''}`} />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                    <div className="mt-7 overflow-x-auto print:overflow-x-hidden">
                        <p className="font-bold mb-2 text-[14px]">Detail</p>
                        <table className="w-full border-collapse border border-slate-400">
                            <thead className="bg-slate-100">
                                <tr>
                                    <th className="border px-2 border-slate-300 min-w-6 w-6 max-w-10">No.</th>
                                    <th className="border px-2 border-slate-300 min-w-4 w-4 max-w-6">Code</th>
                                    <th className="border px-2 border-slate-300">Series</th>
                                    <th className="border px-2 border-slate-300">Type</th>
                                    <th className="border px-2 border-slate-300 w-20">P <small>(mm)</small></th>
                                    <th className="border px-2 border-slate-300 w-20">L <small>(mm)</small></th>
                                    <th className="border px-2 border-slate-300">Glass</th>
                                    <th className="border px-2 border-slate-300">Color</th>
                                    <th className="border px-2 border-slate-300 min-w-36 w-36 max-w-48">Unit Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {objParam?.data_product.map((val, index) =>
                                    val.model_product.value.map((val_model, index_model) =>
                                        <tr key={index_model + index}>
                                            <td className="border px-2 border-slate-300 text-center">{index_model === 0 ? (index + 1) : ''}</td>
                                            <td className="border px-2 border-slate-300 text-center">{val?.product?.name.substr(0, 1) + `${(index + 1)}`}</td>
                                            <td className="border px-2 border-slate-300 text-left">{val?.product_series?.value?.name}</td>
                                            <td className="border px-2 border-slate-300 text-left">{val_model?.type?.name}</td>
                                            <td className="border px-2 border-slate-300 text-center">{val_model?.sizeVertical}</td>
                                            <td className="border px-2 border-slate-300 text-center">{val_model?.sizeHorizontal}</td>
                                            <td className="border px-2 border-slate-300 text-center">{val_model?.thickness?.name}</td>
                                            <td className="border px-2 border-slate-300 text-center">{val_model?.color?.name}</td>
                                            <td className="border px-2 border-slate-300 text-right">{formatCurrency(val_model?.price_broad)}</td>
                                        </tr>
                                    )
                                )}
                            </tbody >
                            <tfoot className="border border-slate-300 bg-slate-100">
                                <tr>
                                    <td className="border px-2 border-slate-300 text-right font-bold"></td>
                                    <td className="border px-2 border-slate-300 text-right font-bold" colSpan={7}>Sub Total</td>
                                    <td className="border px-2 border-slate-300 text-right font-bold">{formatCurrency(sumData.subTotal)}</td>
                                </tr>
                            </tfoot>
                        </table >
                    </div >
                    <div className="mt-10 overflow-x-auto print:overflow-x-hidden">
                        <p className="font-bold mb-2 text-[14px]">Summary</p>
                        <table className="w-full border-collapse border border-slate-400">
                            <thead className="bg-slate-100">
                                <tr>
                                    <th className="border px-2 border-slate-300 min-w-6 w-6 max-w-10">No.</th>
                                    <th className="border px-2 border-slate-300">Type</th>
                                    <th className="border px-2 border-slate-300 min-w-6 w-6 max-w-10">QTY</th>
                                    <th className="border px-2 border-slate-300">Sub Total</th>
                                    <th className="border px-2 border-slate-300">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {objParam?.data_product.map((val, index) =>
                                    <tr key={index}>
                                        <td className="border px-2 border-slate-300 text-center ">{(index + 1)}</td>
                                        <td className="border px-2 border-slate-300 text-left">{val?.product?.name.substr(0, 1) + `${(index + 1)}`} - {val.product_series.value.name} - {val.product_model.value.name}</td>
                                        <td className="border px-2 border-slate-300 text-center min-w-6 w-6 max-w-10">{val.quantity?.value}</td>
                                        <td className="border px-2 border-slate-300 text-right min-w-36 w-36 max-w-48">{formatCurrency(val.sub_total.value)}</td>
                                        <td className="border px-2 border-slate-300 text-center">{val.description?.value}</td>
                                    </tr>
                                )}
                            </tbody >
                            <tfoot className="border border-slate-300 bg-slate-100">
                                <tr>
                                    <th className="border px-2 border-slate-300 text-right" colSpan={3}>Sub Total</th>
                                    <th className="border px-2 border-slate-300 text-right">{formatCurrency(sumData.total)}</th>
                                    <th className="border px-2 border-slate-300"></th>
                                </tr>
                                <tr>
                                    <th className="border px-2 border-slate-300 text-right" colSpan={3}>Discount</th>
                                    <th className="border px-2 border-slate-300 text-right">{objParam.data_draf?.discon?.value}%</th>
                                    <th className="border px-2 border-slate-300"></th>
                                </tr>
                                <tr>
                                    <th className="border px-2 border-slate-300 text-right" colSpan={3}>Total</th>
                                    <th className="border px-2 border-slate-300 text-right">{formatCurrency(fixNanNumber(objParam.data_draf?.grand_total?.value))}</th>
                                    <th className="border px-2 border-slate-300"></th>
                                </tr>
                                <tr>
                                    <th className="border px-2 border-slate-300 text-right" colSpan={3}>PPN 11%</th>
                                    <th className="border px-2 border-slate-300 text-right">{formatCurrency(countPPN(fixNanNumber(objParam.data_draf?.grand_total?.value)))}</th>
                                    <th className="border px-2 border-slate-300"></th>
                                </tr>
                                <tr>
                                    <th className="border px-2 border-slate-300 text-right" colSpan={3}>Grand Total</th>
                                    <th className="border px-2 border-slate-300 text-right">{formatCurrency(fixNanNumber(objParam.data_draf?.grand_total?.value + countPPN(objParam.data_draf?.grand_total?.value)))}</th>
                                    <th className="border px-2 border-slate-300"></th>
                                </tr>
                            </tfoot>
                        </table >
                    </div>
                    <div className="mt-5">
                        <span className="font-medium">Demikian surat penawaran ini kami ajukan. Besar harapan kami dapat bekerja sama dengan Bpk./Ibu, atas perhatiannya kami ucapkan terima kasih.</span>
                    </div>
                    <div className="mt-3">
                        <span className="font-bold"><u>Kondisi Penawaran</u></span>
                        <ul className="font-medium">
                            <li>- Volume akan disesuaikan kembali dengan volume lapangan</li>
                            <li>- Penawaran Harga ini berlaku 7 hari dari keluarnya tanggal Penawaran Harga ini</li>
                            <li>- Pengiriman material 45 (empat puluh lima) hari setelah shop drawing disetujui</li>
                            <li>- Pembayaran DP 50%</li>
                            <li>- Sisa pembayaran sesuai progress lapangan</li>
                        </ul>
                    </div>
                    <div className="flex justify-end mt-[2rem] mx-20">
                        <table className="text-center font-medium">
                            <tbody>
                                <tr><td>Hormat Kami,</td></tr>
                                <tr><td>PT. Multi Facade Industri</td></tr>
                                <tr><td className="pt-24">(<span className="mx-4">{objParam?.data_form?.sales_person}</span>)</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div >
            </div >
        </>
    );
}

export default Quotation;