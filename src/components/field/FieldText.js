function FieldText(props) {
    return (
        <>
            <small>{props.label}</small>
            <input type="text" className="border px-2 py-1 rounded-md w-full bg-slate-50 outline-none" value={props.value ?? ''} onChange={props.handleChange} />
        </>
    );
}

export default FieldText;