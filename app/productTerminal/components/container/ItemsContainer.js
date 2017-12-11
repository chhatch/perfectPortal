import { connect } from 'react-redux'
import ItemDisplay from "\\productTerminal\\components\\presentational\\ItemDisplay.js"
import { toggleItemInfo } from "\\productTerminal\\actions\\actions.js"

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

const ItemsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemDisplay);

export default ItemsContainer;