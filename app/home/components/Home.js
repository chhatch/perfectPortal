import { connect } from 'react-redux'

let Home = (props) => {
    return (
        <div>
            Welcome to Perfect Portal..
            {!props.signedIn && <div>Please sign in to continue.</div>}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        signedIn: state.portal.signedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

Home = connect(
    mapStateToProps,
    mapDispatchToProps
    )(Home);

export default Home;