import BasicItemInfo from "./BasicItemInfo.js";
import ItemInfo from "./ItemInfo.js";

const SingleItemContainer = props => {
    return (
        <li>
            <BasicItemInfo name={props.item.name} cost={props.item.cost} retail={props.item.retail}/>
            <ItemInfo handleClick={props.handleClick} hidden={props.item.hidden} index={props.index}/>
        </li>
    );
}
export default SingleItemContainer;