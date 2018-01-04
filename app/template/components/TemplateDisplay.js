import { connect } from 'react-redux'
import Template from "../presentational/Template.js"

let TemplateDisplay = (props) => {
    return (
        < Template />
    );
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

TemplateDisplay = connect(
    mapStateToProps,
    mapDispatchToProps
    )(TemplateDisplay);

export default TemplateDisplay;