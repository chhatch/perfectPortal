import styles from "../../css modules/uploader.css"
import { FileCounterDetails } from "./FileCounterDetails.js"
import { RetryFailed } from "./RetryFailed.js"

class FileCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingDetailsHidden: true,
            successfulDetailsHidden: true,
            failedDetailsHidden: true
        }
        this.showHideDetails = (fileDetailsHidden) => {
            const toggleHidden = (previousState) => {
                const nextState = {...previousState};
                nextState[fileDetailsHidden] = !nextState[fileDetailsHidden];
                return nextState;
            }
            this.setState(toggleHidden);
        }
    }
    
    render(props) {
        const pendingUploads = this.props.pendingUploads,
            pendingDetailsHidden = this.state.pendingDetailsHidden,
            successfulUploads = this.props.successfulUploads,
            successfulDetailsHidden = this.state.successfulDetailsHidden,
            failedUploads = this.props.failedUploads,
            failedDetailsHidden = this.state.failedDetailsHidden,
            retryFailed = this.props.retryFailed;
        return (
            <div className={styles.fileCounter}>
                <div className={styles.fileCounterWrapper}>
                    <div onClick={(e) => {this.showHideDetails("pendingDetailsHidden");}}
                        className={pendingDetailsHidden ? styles.fileCounterInfo : styles.fileCounterInfoWithDetails}>
                        <div>Pending: {pendingUploads.length}</div>
                    </div>
                    < FileCounterDetails files={pendingUploads} hidden={pendingDetailsHidden}/>
                </div>
                <div className={styles.fileCounterWrapper}>
                    <div onClick={(e) => {this.showHideDetails("successfulDetailsHidden");}}
                        className={successfulDetailsHidden ? styles.fileCounterInfo : styles.fileCounterInfoWithDetails}>
                        <div>Successful: {successfulUploads.length}</div>
                    </div>
                    < FileCounterDetails files={successfulUploads} hidden={successfulDetailsHidden}/>
                </div>
                <div className={styles.fileCounterWrapper}>
                    <div onClick={(e) => {this.showHideDetails("failedDetailsHidden");}}
                        className={failedDetailsHidden ? styles.fileCounterInfo : styles.fileCounterInfoWithDetails}>
                        <div> Failed: {failedUploads.length} </div> {failedUploads.length > 0 && < RetryFailed retryFailed={retryFailed}/> }
                    </div>
                    < FileCounterDetails files={failedUploads} hidden={failedDetailsHidden} fail={true}/>
                </div>
            </div>
        )
    }
}

export default FileCounter;
        