/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import ListDetails from "./ListDetails";

// Listdetail page components

function AbonnementsDetail({ abonnementsDetails, selectedIndex }) {
    const selectedDetail = abonnementsDetails[selectedIndex]?.abonnement_détails;

    return (
        <Card sx={{ height: "100%" }}>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
                <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                    List Details&apos;
                </SoftTypography>
                {/* <SoftBox display="flex" alignItems="flex-start">
          <SoftBox color="text" mr={0.5} lineHeight={0}>
            <Icon color="inherit" fontSize="small">
              date_range
            </Icon>
          </SoftBox>
          <SoftTypography variant="button" color="text" fontWeight="regular">
            23 - 30 March 2020
          </SoftTypography>
        </SoftBox> */}
            </SoftBox>
            <SoftBox pt={3} pb={2} px={2}>
                <SoftBox
                    component="ul"
                    display="flex"
                    flexDirection="column"
                    p={0}
                    m={0}
                    sx={{ listStyle: "none" }}
                >

                    {selectedDetail?.length !== 0 ? selectedDetail?.map((detail, index) => (
                        <ListDetails
                            color="success"
                            icon="arrow_upward"
                            //name="Stripe"
                            description={detail.description}
                        //value="+ $ 750"
                        />

                    )) : <ListDetails
                        //color="success"
                        //icon="arrow_upward"
                        //name="Stripe"
                        description='No detail found for this abonnement'
                    //value="+ $ 750"
                    />}

                </SoftBox>
            </SoftBox>
        </Card>
    );
}

export default AbonnementsDetail;
