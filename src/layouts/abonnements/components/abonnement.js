
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteAbonnement } from "redux/actions/abonnementActions";
import Swal from "sweetalert2";
import zIndex from "@mui/material/styles/zIndex";
import { useEffect } from "react";
import { fetchAbonnements } from "redux/actions/abonnementActions";

function Abonnement({ description, title, type, price, currency, timePostfix, abonnementId, noGutter, onEdit, onViewDetail, index }) {

    const dispatch = useDispatch()
    const { abonnements, error, loading } = useSelector(state => state.abonnementsData);

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            backdrop: "rgba(0,0,0,0.1)" // set opacity to 50%

        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteAbonnement(abonnementId))
                dispatch(fetchAbonnements());

                Swal.fire(
                    {
                        title: 'Deleted!',
                        text: "Your file has been deleted.",
                        icon: 'success',
                        backdrop: "rgba(0,0,0,0.1)" // set opacity to 50%

                    }
                )
            }
        })
    }

    const handleEdit = (index,action) => {
        onEdit({action:action,index:index})
    }

    const handleViewDetail = (action) => {
        onViewDetail(index)
    }


    return (
        <SoftBox
            component="li"
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            bgColor="grey-100"
            borderRadius="lg"
            p={3}
            mb={noGutter ? 0 : 1}
            mt={2}
        >
            <SoftBox width="100%" display="flex" flexDirection="column">
                <SoftBox
                    display="flex"
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    flexDirection={{ xs: "column", sm: "row" }}
                    mb={2}
                >
                    <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize">
                        {description}
                    </SoftTypography>

                    <SoftBox
                        display="flex"
                        alignItems="center"
                        mt={{ xs: 2, sm: 0 }}
                        ml={{ xs: -1.5, sm: 0 }}
                    >
                        <SoftBox mr={1}>
                            <SoftButton variant="text" color="dark" onClick={() => handleViewDetail(index)}>
                                <Icon>visibility</Icon>&nbsp;show Details
                            </SoftButton>
                            <SoftButton variant="text" color="dark" onClick={() => handleEdit(index,'Edit')}>
                                <Icon>edit</Icon>&nbsp;edit
                            </SoftButton>
                            <SoftButton variant="text" color="error" onClick={() => handleDelete()}>
                                <Icon>delete</Icon>&nbsp;delete
                            </SoftButton>
                        </SoftBox>


                    </SoftBox>
                </SoftBox>
                <SoftBox mb={1} lineHeight={0}>
                    <SoftTypography variant="caption" color="text">
                        Abonnement Title:&nbsp;&nbsp;&nbsp;
                        <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                            {title}
                        </SoftTypography>
                    </SoftTypography>
                </SoftBox>
                <SoftBox mb={1} lineHeight={0}>
                    <SoftTypography variant="caption" color="text">
                        Type:&nbsp;&nbsp;&nbsp;
                        <SoftTypography variant="caption" fontWeight="medium">
                            {type}&nbsp;&nbsp;&nbsp;
                        </SoftTypography>
                    </SoftTypography>
                    <SoftTypography variant="caption" color="text">
                        Price:&nbsp;&nbsp;&nbsp;
                        <SoftTypography variant="caption" fontWeight="medium">
                            {price}&nbsp;&nbsp;&nbsp;
                        </SoftTypography>
                    </SoftTypography>
                    <SoftTypography variant="caption" color="text">
                        Currency:&nbsp;&nbsp;&nbsp;
                        <SoftTypography variant="caption" fontWeight="medium">
                            {currency}
                        </SoftTypography>
                    </SoftTypography>
                </SoftBox>
                <SoftTypography variant="caption" color="text">
                    Abonnement TimePostfix:&nbsp;&nbsp;&nbsp;
                    <SoftTypography variant="caption" fontWeight="medium">
                        {timePostfix}
                    </SoftTypography>
                </SoftTypography>
            </SoftBox>
        </SoftBox>
    );
}

// Setting default values for the props of Bill
Abonnement.defaultProps = {
    noGutter: false,
};

// Typechecking props for the Bill
Abonnement.propTypes = {
    name: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    vat: PropTypes.string.isRequired,
    noGutter: PropTypes.bool,
};

export default Abonnement;
