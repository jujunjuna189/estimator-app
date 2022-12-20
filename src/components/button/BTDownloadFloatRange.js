import { useState } from "react";

function BTDownloadFloatRange(props) {
    const [inputViewProp, setInputViewProp] = useState(<></>);
    let fromController = '';
    let toController = '';
    let passwordController = '';

    const openPopup = () => {
        setInputViewProp(
            <small className="absolute z-10 top-0 -left-44 bg-white border rounded-md pt-1 pb-8 px-3 font-medium transition ease-in-out delay-150 text-slate-900 shadow-md">
                <div>
                    <div>
                        <small className="font-bold">From</small><br />
                        <input type="date" className="border py-1 px-2 rounded outline-none" onChange={(e) => fromController = e.target.value} />
                    </div>
                    <div>
                        <small className="font-bold">To</small><br />
                        <input type="date" className="border py-1 px-2 rounded outline-none" onChange={(e) => toController = e.target.value} />
                    </div>
                    <div>
                        <small className="font-bold">Password</small><br />
                        <input type="text" className="border py-1 px-2 w-[8.5rem] rounded outline-none" onChange={(e) => passwordController = e.target.value} />
                    </div>
                    <div className="flex gap-1 absolute -bottom-3">
                        <div className="rounded-full p-1 border inline-block bg-slate-900 cursor-pointer" onClick={() => closePopup()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </div>
                        <div className="rounded-full p-1 border inline-block border-dashed border-slate-700 bg-white cursor-pointer" onClick={() => execute()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-download" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                                <polyline points="7 11 12 16 17 11" />
                                <line x1="12" y1="4" x2="12" y2="16" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="w-4 overflow-hidden inline-block absolute top-2 -right-[0.85rem] -rotate-90">
                    <div className=" h-3 w-3 bg-white border -rotate-45 transform origin-top-left"></div>
                </div>
            </small>
        );
    }

    const closePopup = () => {
        setInputViewProp(<></>);
    }

    const execute = () => {
        if (typeof props.downloadLink !== 'undefined') {
            if (passwordController === 'adminHandexystem') {
                window.location.href = props.downloadLink + '?range=' + fromController + '~' + toController;
            }
        }
    }

    return (
        <div className="relative">
            <span className="bg-slate-900 rounded-md px-2 py-2 text-sm text-white font-medium flex items-center gap-1 cursor-pointer" onClick={() => openPopup()} >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-cloud-download" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M19 18a3.5 3.5 0 0 0 0 -7h-1a5 4.5 0 0 0 -11 -2a4.6 4.4 0 0 0 -2.1 8.4" />
                    <line x1="12" y1="13" x2="12" y2="22" />
                    <polyline points="9 19 12 22 15 19" />
                </svg>
            </span>
            {inputViewProp}
        </div>
    );
}

export default BTDownloadFloatRange;