import { connect } from 'react-redux'
import styles from "./OptionsDisplay.css"
import SearchCriterion from "./SearchCriterion.js"

let OptionsContainer = (props) => {
    console.log(props);
    return (
            <ul>
                {
                    props.criteria.map((criterion) =>
                        <SearchCriterion criterion={criterion} />
                    )
                }
            </ul>
    );
}

const mapStateToProps = state => {
    return {
        criteria: state.itemApp.criteria
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

OptionsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OptionsContainer);

export { OptionsContainer }