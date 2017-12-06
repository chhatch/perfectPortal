import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

const BasicItemInfo = (props) => {
    return (
        <div>
            <GoogleLogin
                clientId="568076525910-92cnmgpbl465v835ei5gcc0r4do2fjva.apps.googleusercontent.com"
                buttonText="Login"
                autoLoad={true}
                onSuccess={props.signIn}
                //onFailure={responseGoogle}
            />
            <GoogleLogout
                buttonText="Logout"
                onLogoutSuccess={() => ""}
            />
        </div>
    );
}

 export default BasicItemInfo;