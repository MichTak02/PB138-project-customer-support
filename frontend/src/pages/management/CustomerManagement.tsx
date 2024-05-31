import Page from '../../components/base/Page';
import {Typography} from '@mui/material';
import {UserDto} from "../../../../backend/src/repositories/user/types.ts";
import {DataGrid, GridRenderCellParams} from '@mui/x-data-grid';
import Button from '@mui/material/Button';

export function CustomerManagement() {
    const users: UserDto[] = [{
        id: 1,
        email: "email1",
        displayName: "displayName1",
        passwordHash: "passwordHash1",
        createdOn: new Date(),
        role: "ADMIN",
    },
        {
            id: 2,
            email: "email2",
            displayName: "displayName2",
            passwordHash: "passwordHash2",
            createdOn: new Date(),
            role: "ADMIN",
        }
    ]   // TODO: replace with userController when it's implemented

    type UserRow = UserDto & { button: string };

    return (
        <Page title="Customer Management">
            <Typography component="p" variant="h5">
                Manage your customers here.
            </Typography>
            <DataGrid
                rows={users}
                columns={[
                    {field: 'id', headerName: 'ID', width: 70},
                    {field: 'displayName', headerName: 'Display Name', width: 200},
                    {field: 'email', headerName: 'Email', width: 200},
                    {field: 'role', headerName: 'Role', width: 150},
                    {field: 'createdOn', headerName: 'Created On', width: 200},
                    {
                        field: 'chat',
                        headerName: 'Chat',
                        width: 150,
                        renderCell: (params) => (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => console.log((params as GridRenderCellParams<UserRow>).row.displayName)}
                            >
                                Show chat
                            </Button>
                        ),
                    },
                ]}
                disableRowSelectionOnClick
            />
        </Page>

    );
}

export default CustomerManagement;
