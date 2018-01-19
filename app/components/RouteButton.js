import { Route } from 'react-router-dom'
import styles from "../css modules/portal.css"

const RouteButton = (props) => {
    if (props.buttonPath === props.appPath) {
        return(
            <div className={styles.routeButtonSelected} onClick={() => { props.routeToApp(props.buttonPath, props.app); }} >
                {props.title}
            </div>
    )} else {
        return(
            <div className={styles.routeButton} onClick={() => { props.routeToApp(props.buttonPath, props.app); }} >
                {props.title}
            </div>
    )}
}
  
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