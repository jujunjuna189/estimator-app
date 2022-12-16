function FieldTextArea(props) {
    return (
        <>
            <textarea id="message" rows="2" className="block p-2.5 w-full text-sm text-gray-900 bg-slate-50 outline-none rounded-lg border border-gray-300" placeholder="Description..." value={props?.value ?? ''} onChange={props.handleChange} ></textarea>
        </>
    );
}

export default FieldTextArea;