import { connect } from 'react-redux'
import styles from "./ItemDisplay.css"
import SingleItemContainer from "./SingleItemContainer.js"
import { toggleItemInfo } from "../actions/actions.js"

let ItemContainer = (props) => {
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

const mapStateToProps = state => {
    return {
        items: state.itemApp.items
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleClick: (index) => {
            dispatch(toggleItemInfo(index));
        }
    }
}

ItemContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemContainer);

export { ItemContainer };