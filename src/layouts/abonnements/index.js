
import { useEffect, useState } from 'react';

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Grid from "@mui/material/Grid";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";

//redux
import { useDispatch, useSelector } from "react-redux";
import { fetchAbonnements } from 'redux/actions/abonnementActions';
import AbonnementInfo from './components/AbonnementInfo';
import AbonnementsDetail from './components/abonnementsDetail';
import AddAbonnement from './components/AddAbonnementModal';
import EditAbonnement from './components/EditAbonnement';

function Abonnements() {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [typeAction, setTypeAction] = useState(null);

    const dispatch = useDispatch()
    const { abonnements, error, loading } = useSelector(state => state.abonnementsData);


   
    const handleTypeAction = (action) => {
        setTypeAction(action);
    }

    const handleViewDetail = (index) => {
        setSelectedIndex(index);
        setTypeAction(null)

    }

    useEffect(() => {
        dispatch(fetchAbonnements());
    }, [dispatch]);


    if (loading || abonnements.length === 0) {
        return (
            <DashboardLayout>
                <DashboardNavbar />
                <SoftBox mt={4}>

                    <SoftBox my={3}>
                        Loading...
                    </SoftBox>
                </SoftBox>
                <Footer />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout>
                <DashboardNavbar />
                <SoftBox mt={4}>

                    <SoftBox my={3}>
                        {error.message}
                    </SoftBox>
                </SoftBox>
                <Footer />
            </DashboardLayout>
        );
    }
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox mt={4}>

                <SoftBox my={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={7}>
                            <AbonnementInfo abonnements={abonnements?.data}  onAdd={handleTypeAction} onEdit={handleTypeAction} onViewDetail={handleViewDetail} />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            {!typeAction ? <AbonnementsDetail abonnementsDetails={abonnements?.data} selectedIndex={selectedIndex} /> :
                                typeAction === 'Add' ? <AddAbonnement /> : typeAction.index.action === 'Edit' ? <EditAbonnement abonnement={abonnements?.data[typeAction.index.index]} /> : null
                            }

                        </Grid>
                    </Grid>
                </SoftBox>
            </SoftBox>
            <Footer />
        </DashboardLayout>
    );
}

export default Abonnements;
