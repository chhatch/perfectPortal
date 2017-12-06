import styles from "./BasicItemInfo.css"

const BasicItemInfo = (props) => {
    return (
        <div className={styles.BasicItemInfo}>
            <div>{props.name}</div>
            <div>{props.cost}</div>
            <div>{props.retail}</div>
        </div>
    );
}

 export default BasicItemInfo;