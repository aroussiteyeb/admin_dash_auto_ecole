import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
import curved6 from "assets/images/curved-images/curved14.jpg";
import { useDispatch, useSelector } from "react-redux";
import { registerAdmin } from "redux/actions/auth/register";
import { ThreeDots } from 'react-loader-spinner';
import SoftAlert from "components/SoftAlert";
import { Icon } from "@mui/material";
import Swal from 'sweetalert2';
import EmailValidation from "components/sweetAlert";
import { verifyEmail } from "redux/actions/auth/activate";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreement, setAgreement] = useState(true);
  const [showVerificationCodeInput, setShowVerificationCodeInput] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const dispatch = useDispatch();
  const { loading, error, registeredAdmin } = useSelector(state => state.registration);
  const { verifying, verifyingResponse } = useSelector(state => state.activate);
  const navigate = useNavigate();

  const handleSetAgremment = () => setAgreement(!agreement);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { email, password, confirmPassword };
    dispatch(registerAdmin(formData))
      .then((data) => {
        if (data && data.success) {
          Swal.fire({
            title: "Enter Verification Code",
            input: "text",
            inputPlaceholder: "Enter verification code",
            confirmButtonText: "Verify Email",
            showLoaderOnConfirm: true,
            inputValidator: (value) => {
              if (!value) {
                return 'You need to choose something!'
              }
            },
            preConfirm: async (code) => {
              const result = await dispatch(verifyEmail({ email: email, code: code }))
              if (result && result.success) {
                await Swal.fire({
                  icon: "success",
                  title: "Email Verified",
                  timer: 1500,
                });
                navigate("/authentication/sign-in");

              } else if (result && result.data.error) {
                Swal.showValidationMessage(`Verification code is invalid: ${result.data.error}`);

              }


            },
            allowOutsideClick: () => !Swal.isLoading(),
          }).then((result) => {
            if (result.isConfirmed) {
              setShowVerificationCodeInput(false);
              setVerificationCode("");
            }
          });
          setShowVerificationCodeInput(true);
        }
      });
  };

  useEffect(() => {

  }, [registeredAdmin]);

  return (
    <BasicLayout
      title="Welcome!"
      description="Use these social to login or create new account ."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Register with
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <Socials />
        </SoftBox>
        <Separator />
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form" onSubmit={handleSubmit}>
            <SoftBox mb={2}>
              <SoftInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </SoftBox>
            <SoftBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgremment} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                sx={{ cursor: "poiner", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton type="submit" variant="gradient" color="dark" fullWidth>
                {loading ? <ThreeDots
                  height="20"
                  width="30"
                  radius="9"
                  color='white'
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                /> : ' sign up '}
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
      {error && (
        <SoftAlert color="error" fontSize="small">
          <Icon fontSize="small">error</Icon>&nbsp;
          {error.message}
        </SoftAlert>
      )}

      {registeredAdmin && registeredAdmin.error && (
        <SoftAlert color="error" fontSize="small">
          <Icon fontSize="small">error</Icon>&nbsp;
          {registeredAdmin.message}
        </SoftAlert>
      )}
    </BasicLayout>
  );
}

export default SignUp;
