import { FileName } from "./FileName.js"
import styles from "../../css modules/uploader.css"

export const FileCounterDetails = (props) => {
    if (props.files.length > 0 && !props.hidden) {
        return (
            <div className={styles.fileCounterDetailsWrapper}>
                <div className={styles.fileCounterDetails}>
                    {props.files.map((file) => {
                        return (<div tabindex="0" className={styles.fileDetail}> 
                                    <div>
                                        {file.name}
                                    </div>
                                    <FileName name={file.name} />
                                </div>);
                    })}
                </div>
            </div>
        );
    } else if (props.files.length === 0 && !props.hidden) {
        return (
            <div className={styles.fileCounterDetailsWrapper}>
                Nothin'
            </div>
        );
    } else {
        return "";
    }
}