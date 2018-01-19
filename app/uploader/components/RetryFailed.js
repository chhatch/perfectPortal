import styles from "../../css modules/uploader.css"

export const RetryFailed = (props) => {
        return (
            <div onClick={() => props.retryFailed()} className={styles.retryFailedButton}>
                Retry
            </div>
        );
}