import { useEffect, useState } from "react";
import { Checkbox } from "@mui/material";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import { useDispatch, useSelector } from "react-redux";
import { createAbonnement } from "redux/actions/abonnementActions";
import Swal from "sweetalert2";
import { fetchAbonnements } from "redux/actions/abonnementActions";

function AddAbonnement() {

    const dispatch =useDispatch()
    const { abonnements, error, loading ,createResponse } = useSelector(state => state.abonnementsData);

    const [formData, setFormData] = useState({
      
        abonnement_détails: [],
    });

    const [selectedOption, setSelectedOption] = useState("");

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setFormData({ ...formData, type: event.target.value });
    };

    const [abonnementDetails, setAbonnementDetails] = useState([]);

    const addAbonnementDetail = () => {
        setAbonnementDetails([...abonnementDetails, { description: "" }]);
    };

    const removeAbonnementDetail = (index) => {
        const newDetails = [...abonnementDetails];
        newDetails.splice(index, 1);
        setAbonnementDetails(newDetails);
    };

    const handleAbonnementDetailChange = (event, index) => {
        const { name, value } = event.target;
        const newDetails = [...abonnementDetails];
        newDetails[index] = { ...newDetails[index], description: value };
        setAbonnementDetails(newDetails);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newFormData = {
            ...formData,
            abonnement_détails: abonnementDetails,
        };
        delete newFormData[""];
        console.log(newFormData)
        dispatch(createAbonnement(newFormData))

        
    };

    useEffect(() => {
        if(createResponse)
        {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: createResponse?.error ? 'warning' : 'success',
                title: createResponse?.message
              })

            if(createResponse.success)
            {
                dispatch(fetchAbonnements())
                dispatch({ type: "STATE_ABONNEMENT_RESET" });

            }

        }
    }, [createResponse])
    
    return (
        <Card sx={{ height: "100%" }}>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
                <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                    Add abonnement&apos;
                </SoftTypography>
            </SoftBox>
            <SoftBox pt={2} pb={3} px={3}>
                <SoftBox component="form" role="form" onChange={handleInputChange} onSubmit={handleSubmit}>
                    <SoftBox mb={2}>
                        <SoftInput type="text" name="title" placeholder="Abonnement title" />
                    </SoftBox>
                    <SoftBox mb={2}>
                        <SoftInput type="text" name="description" placeholder="Description" />
                    </SoftBox>
                    <SoftBox mb={2}>
                        <SoftInput type="text" name="descriptionPrice" placeholder="Description Price" />
                    </SoftBox>
                    <SoftBox mb={2}>
                        <SoftInput type="text" name="discount" placeholder="Discount" />
                    </SoftBox>
                    <SoftBox mb={2}>
                        <SoftInput type="text" name="currency" placeholder="Currency" />
                    </SoftBox>
                    <SoftBox mb={2}>
                        <SoftInput type="text" name="timePostfix" placeholder="Time Postfix" />
                    </SoftBox>
                    <SoftBox mb={2}>
                        <SoftInput type="number" name="price" placeholder="Price" />
                    </SoftBox>
                    {abonnementDetails.map((abonnementDetail, index) => (
                        <SoftBox mb={2} display="flex" alignItems="center" key={index}>
                            <SoftInput
                                type="text"
                                //name={`abonnement_details[${index}].description`}
                                placeholder="Abonnement details"
                                // value={abonnementDetail.description}
                                onChange={(event) => handleAbonnementDetailChange(event, index)}
                            />
                            <SoftButton
                                type="button"
                                variant="contained"
                                color="error"
                                sx={{ ml: 1 }}
                                onClick={() => removeAbonnementDetail(index)}
                            >
                                <Icon>delete</Icon>
                            </SoftButton>
                        </SoftBox>
                    ))}
                    <SoftBox display="flex" alignItems="center" sx={{ mb: 2 }}>
                        <SoftButton type="button" variant="outlined" color="primary" onClick={addAbonnementDetail}>
                            Add abonnement detail
                        </SoftButton>
                    </SoftBox>
                    <SoftBox display="flex" alignItems="center">
                        <Checkbox
                            checked={selectedOption === "weekly"}
                            value="weekly"
                            name="type"
                            onChange={handleOptionChange}
                        />
                        <SoftTypography
                            variant="button"
                            fontWeight="regular"
                            sx={{ cursor: "pointer", userSelect: "none" }}
                        >
                            &nbsp;&nbsp;Weekly&nbsp;&nbsp;
                        </SoftTypography>
                        <Checkbox
                            checked={selectedOption === "month"}
                            value="month"
                            name="type"
                            onChange={handleOptionChange}
                        />
                        <SoftTypography
                            variant="button"
                            fontWeight="regular"
                            sx={{ cursor: "pointer", userSelect: "none" }}
                        >
                            &nbsp;&nbsp;Monthly&nbsp;&nbsp;
                        </SoftTypography>
                        <Checkbox checked={selectedOption === "year"} value="year" name="type" onChange={handleOptionChange} />
                        <SoftTypography
                            variant="button"
                            fontWeight="regular"
                            sx={{ cursor: "pointer", userSelect: "none" }}
                        >
                            &nbsp;&nbsp;Year&nbsp;&nbsp;
                        </SoftTypography>
                    </SoftBox>
                    <SoftBox mt={4} mb={1}>
                        <SoftButton type="submit" variant="gradient" color="dark" fullWidth>
                            Add
                        </SoftButton>
                    </SoftBox>
                </SoftBox>
            </SoftBox>

        </Card>
    );
}

export default AddAbonnement;
