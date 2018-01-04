import styles from "../../../css modules/uploader.css"

const Uploader = (props) => {
    return (
            <div>
                <input className={styles.input} name="fieldUploader" type="file" id="fieldUploader" onChange={props.uploadPics}  multiple/>
                <label className={styles.label} htmlFor="fieldUploader"> Pick Files </label>
            </div>
    );
}

 export default Uploader;