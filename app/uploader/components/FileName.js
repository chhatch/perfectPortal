import styles from "../../css modules/uploader.css"

export const FileName = (props) => {
    return (
        <div className={styles.fileName}>
            {props.name}
        </div>
    );
}