import { Route } from 'react-router-dom'

const RouteButton = (props) => {return (
    <button
        type='button'
        onClick={() => { props.routeToPath(props.path); }}
        >
        {props.title}
    </button>
)}
  
 export default RouteButton;

/*import { Route } from 'react-router-dom'

const RouteButton = (props) => {return (
    <Route render={({ history}) => (
       <button
           type='button'
           onClick={() => { history.push(props.path) }}
        >
        {props.title}
        </button>
    )} />
)}
  
 export default RouteButton;*/