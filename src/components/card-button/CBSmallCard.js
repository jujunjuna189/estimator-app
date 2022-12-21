function CBSmallCard(props) {

    const renderIcons = () => {
        let icons = [];
        for (let i = 0; i <= props.ttlIcons; i++) {
            icons.push(<div key={i} className="border border-dashed border-slate-500 hover:border-slate-600 w-[1rem] h-[2rem]"></div>);
        }

        return icons;
    }

    return (
        <div className={`border inline-block ${props.isActive ? `bg-blue-200` : `bg-white`} px-3 m-2 py-3 rounded-md hover:shadow-md text-center`} onClick={props.handleClick}>
            <div className="flex justify-center">
                {renderIcons()}
            </div>
            <div className="mt-1">
                <small className="font-medium size-[5px]">{props.title}</small>
            </div>
        </div>
    );
}

export default CBSmallCard;