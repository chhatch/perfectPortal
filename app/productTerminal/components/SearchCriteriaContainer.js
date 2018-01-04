import SearchCriterion from "\\components\\presentational\\SearchCriterion.js"

class SearchCriteriaContainer extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.criteria);
    }
    render() {
        return (
            <ul>
                {
                    this.props.criteria.map((criterion) =>
                        <SearchCriterion criterion={criterion} />
                    )
                }
            </ul>
        );
    }
}
 export default SearchCriteriaContainer;