import { useState } from "react";

function ImageChoose(props) {
    const [picture, setPicture] = useState('');

    const onChangePicture = (event) => {
        setPicture(URL.createObjectURL(event.target.files[0]));
        props.handleChangePicture(URL.createObjectURL(event.target.files[0]));
    };

    return (
        <div className="relative">
            <span className="hidden w-60 font-bold print:block absolute">{picture === '' && 'Tidak ada lokasi yang dicantumkan'}</span>
            <label htmlFor="image" className="w-60 h-36 flex justify-center items-center border border-dashed border-slate-500 rounded-md py-10 text-sm gap-1 font-bold text-slate-500 print:border-transparent">
                <img src={picture} alt="Image_Choose" className={`absolute top-1 bottom-0 right-0 left-1 w-[14.5rem] h-[8.5rem] rounded-md ${picture === '' && 'hidden'}`} />
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-photo text-slate-500 print:hidden" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1="15" y1="8" x2="15.01" y2="8" />
                    <rect x="4" y="4" width="16" height="16" rx="3" />
                    <path d="M4 15l4 -4a3 5 0 0 1 3 0l5 5" />
                    <path d="M14 14l1 -1a3 5 0 0 1 3 0l2 2" />
                </svg>
                <span className="print:hidden">Choose</span>
            </label>
            <input type="file" id="image" hidden onChange={(event) => onChangePicture(event)} />
        </div>
    );
}

export default ImageChoose;