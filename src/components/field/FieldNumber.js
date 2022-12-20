function FieldNumber(props) {

    const max = () => {
        if (props.value > props.max) {
            return (
                <small className="absolute -top-10 left-0 bg-white border rounded-md p-1 font-medium transition ease-in-out delay-150 text-slate-900 animate-bounce shadow-sm">
                    {props.maxLabel}
                    <div className="w-4 overflow-hidden inline-block absolute -bottom-[12px] left-2">
                        <div className=" h-3 w-3 bg-white border -rotate-45 transform origin-top-left"></div>
                    </div>
                </small>
            );
        }
    }

    return (
        <div className="relative">
            <small className="sr-only">{props.label}</small>
            <input type="number" className="border px-2 py-1 rounded-md w-full bg-slate-50 outline-none" value={props.value} onChange={props.handleChange} placeholder={props.label} />
            {max()}
        </div>
    );
}

export default FieldNumber;