import styles from "../../css modules/uploader.css"
import { FileCounterDetails } from "./FileCounterDetails.js"

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
            failedDetailsHidden = this.state.failedDetailsHidden;
        return (
            <div className={styles.fileCounter}>
                <div onClick={(e) => {this.showHideDetails("pendingDetailsHidden");}}
                    className={pendingDetailsHidden ? styles.fileCounterInfo : styles.fileCounterInfoWithDetails}>
                    Pending Uploads: {pendingUploads.length}
                    < FileCounterDetails files={pendingUploads} hidden={pendingDetailsHidden}/>
                </div>
                <div onClick={(e) => {this.showHideDetails("successfulDetailsHidden");}}
                    className={successfulDetailsHidden ? styles.fileCounterInfo : styles.fileCounterInfoWithDetails}>
                    Successful Uploads: {successfulUploads.length}
                    < FileCounterDetails files={successfulUploads} hidden={successfulDetailsHidden}/>
                </div>
                <div onClick={(e) => {this.showHideDetails("failedDetailsHidden");}}
                    className={failedDetailsHidden ? styles.fileCounterInfo : styles.fileCounterInfoWithDetails}>
                    Failed Uploads: {failedUploads.length}
                    < FileCounterDetails files={failedUploads} hidden={failedDetailsHidden}/>
                </div>
            </div>
        )
    }
}

export default FileCounter;
        