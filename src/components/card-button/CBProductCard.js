function CBProductCard(props) {
    return (
        <div className={`border ${props.isActive ? `bg-blue-200` : `bg-white`} p-2 px-3 inline-block m-1 rounded-md hover:shadow-md text-center`} onClick={props.handleClick}>
            <small className="font-medium size-[5px]">{props.title}{props.unique}</small>
        </div>
    );
}

export default CBProductCard;