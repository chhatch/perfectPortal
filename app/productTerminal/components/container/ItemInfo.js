const ItemInfo = props => {
        return (
            <div>
                <button onClick={() => props.handleClick(props.index)}>
                    expand
                </button>
                {props.hidden ? null :
                    <div>
                        I shall be hidden
                    </div>
                }
            </div>
        );
    }
 export default ItemInfo;