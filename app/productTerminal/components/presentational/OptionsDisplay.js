import styles from "./OptionsDisplay.css"
import SearchCriterion from "./SearchCriterion.js"

const OptionsDisplay = (props) => {
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

 export default OptionsDisplay;