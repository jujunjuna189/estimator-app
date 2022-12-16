function FieldNumber(props) {
    return (
        <>
            <small className="sr-only">{props.label}</small>
            <input type="number" className="border px-2 py-1 rounded-md w-full bg-slate-50 outline-none" value={props.value} onChange={props.handleChange} placeholder={props.label} />
        </>
    );
}

export default FieldNumber;