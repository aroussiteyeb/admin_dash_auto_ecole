

// @mui material components
import { Grid, Icon } from "@mui/material";
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Billing page components
import Abonnement from "layouts/abonnements/components/abonnement";
import AbonnementsDetail from "./abonnementsDetail";
import SoftButton from "components/SoftButton";
import { useState } from "react";


function AbonnementInfo({ abonnements ,onAdd ,onEdit ,onViewDetail }) {
    const [typeAction, setTypeAction] = useState(null);

   

    const handleAdd = (action) => {
        onAdd(action);
    }
    
    const handleTypeAction = (index,action) => {
        onEdit({action :action , index :index})
    }

    const handleViewDetail = (action) => {
        onViewDetail(action)

    }

    return (
        <Card id="delete-account">

            <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
                <SoftTypography variant="h6" fontWeight="medium">
                    Abonnement Information
                </SoftTypography>
                <SoftButton variant="gradient" color="dark" onClick={()=>handleAdd(`Add`)}>
                    <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                    &nbsp;add new abonnement
                </SoftButton>
            </SoftBox>
            <SoftBox pt={1} pb={2} px={2}>
                <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                    {abonnements?.map((abonnement, index) => (
                            
                            <Abonnement
                                description={abonnement.description}
                                title={abonnement.title}
                                type={abonnement.type}
                                price={abonnement.price}
                                currency={abonnement.currency}
                                timePostfix={abonnement.timePostfix}
                                abonnementId ={abonnement._id}
                                index ={index}
                                onEdit={handleTypeAction}
                                onViewDetail={handleViewDetail}
                                
                            />

                    ))}


                </SoftBox>

            </SoftBox>
        </Card>

    );
}

export default AbonnementInfo;
