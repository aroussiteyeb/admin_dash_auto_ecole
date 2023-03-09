import React, { useState, useEffect } from 'react';
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";

import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import Table from 'examples/Tables/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from 'redux/actions/users';
import Swal from 'sweetalert2';
import { deleteUser } from 'redux/actions/users';

const moment = require('moment');


function User({ image, name, email }) {
    return (
        <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
            <SoftBox mr={2}>
                <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
            </SoftBox>
            <SoftBox display="flex" flexDirection="column">
                <SoftTypography variant="button" fontWeight="medium">
                    {name}
                </SoftTypography>
                <SoftTypography variant="caption" color="secondary">
                    {email}
                </SoftTypography>
            </SoftBox>
        </SoftBox>
    );
}

function Verified({ active }) {
    return (
        <SoftBox display="flex" flexDirection="column">
            <SoftTypography variant="caption" fontWeight="medium" color="text">
                {active ? 'Account verified' : 'Account Not verified'}
            </SoftTypography>

        </SoftBox>
    );
}

const columns = [
    { name: "user", align: "left" },
    { name: "verified", align: "left" },
    { name: "status", align: "center" },
    { name: "createdAt", align: "center" },
    { name: "action", align: "center" },
];

/* const rows = [
  {
    user: <User image={team2} name="John Michael" email="john@creative-tim.com" />,
    function: <Function job="Manager" org="Organization" />,
    status: (
      <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
    ),
    createdAt: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        23/04/18
      </SoftTypography>
    ),
    action: (
      <SoftTypography
        component="a"
        href="#"
        variant="caption"
        color="secondary"
        fontWeight="medium"
      >
        Edit
      </SoftTypography>
    ),
  },
  {
    user: <User image={team3} name="Alexa Liras" email="alexa@creative-tim.com" />,
    function: <Function job="Programator" org="Developer" />,
    status: (
      <SoftBadge variant="gradient" badgeContent="offline" color="secondary" size="xs" container />
    ),
    createdAt: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        11/01/19
      </SoftTypography>
    ),
    action: (
      <SoftTypography
        component="a"
        href="#"
        variant="caption"
        color="secondary"
        fontWeight="medium"
      >
        Edit
      </SoftTypography>
    ),
  },
]; */

function UserDataTable() {
    const [usersData, setUsers] = useState([]);
    const { loading, users, error } = useSelector(state => state.usersData)
    const { loading: loadingDelete, success, error: deleteError } = useSelector(state => state.deleteUser)

    const dispatch = useDispatch()

    const handleDeleteUser = (userId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUser(userId)).then((result) => {
                    if (result.success) {
                        Swal.fire(
                            'Deleted!',
                            result.message,
                            'success'
                        )
                        fetchUsers()
                    }
                    if (result.error) {
                        Swal.fire(
                            'Error!',
                            result.message,
                            'info'
                        )
                    }
                })


            }



        })
    }
    const fetchUsers = async () => {
        const users = await dispatch(getAllUsers())
        const mappedData = users.data.map(user => ({
            user: <User image={user.active ? user.image : team3} name={user.name ? user.name : 'First name Last name'} email={user.email} />,
            verified: <Verified active={user.active} />,
            status: <SoftBadge variant="gradient" badgeContent={user.active ? 'onligne' : 'offligne'} color={user.active ? "success" : "secondary"} size="xs" container />,
            createdAt: <SoftTypography variant="caption" color="secondary" fontWeight="medium">{moment(new Date(user.createdAt)).format("DD/mm/YY")}</SoftTypography>,
            action: <SoftTypography component="a" href="#" variant="caption" color="secondary" fontWeight="medium" onClick={() => handleDeleteUser(user._id)}>Delete</SoftTypography>,
        }));
        setUsers(mappedData)

    }


    useEffect(() => {
        fetchUsers()

    }, [])

    return (
        <Table columns={columns} rows={usersData} />
    );
}

export default UserDataTable;
