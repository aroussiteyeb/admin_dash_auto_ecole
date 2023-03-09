import { useState , useEffect} from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "redux/actions/auth/login";
import { ThreeDots } from "react-loader-spinner";
import SoftAlert from "components/SoftAlert";
import { Icon } from "@mui/material";
import authAlertSucess from "components/sweetAlert";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  
  //redux
  const dispatch = useDispatch()
  const {loading,token,error} = useSelector(state => state.authData);

  //navigation
  const navigate = useNavigate()

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    dispatch(auth(email,password))
    
  };

  useEffect(() => {
    console.log(localStorage.getItem("token"))
    if(token && localStorage.getItem("token"))
    {
      authAlertSucess()
      navigate('/dashboard')
    }
  }, [loading])
  

  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
    >

      <SoftBox component="form" role="form" onSubmit={handleFormSubmit}>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton type="submit" variant="gradient" color="info" fullWidth>
           {loading ? <ThreeDots
                  height="20"
                  width="30"
                  radius="9"
                  color='white'
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                /> : 'sign in'}
          </SoftButton>
        </SoftBox>
        {error && (
        <SoftAlert color="error" fontSize="small">
          <Icon fontSize="small">error</Icon>&nbsp;
          {error}
        </SoftAlert>
      )}
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
        
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
