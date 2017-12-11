import styles from "./ItemDisplay.css"
import SingleItemContainer from "./SingleItemContainer.js"

const ItemDisplay = (props) => {
    return (
        <div>
            <div className={styles.ItemDisplay}>
                <div>Name</div> 
                <div>Cost</div>
                <div>Retail</div>
            </div>
            <ul>
                {props.items.map((item,index) => {
                   return <SingleItemContainer index={index} item={item}  key={index} handleClick={props.handleClick}/>;
                })}
            </ul>
        </div>
    );
}

 export default ItemDisplay;