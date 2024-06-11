import React from 'react';
import Page from '../../components/base/Page';
import { Typography } from '@mui/material';
import { useUsers, useUser, useCreateUser, useUpdateUser, useDeleteUser } from '../../hooks/useUsers.ts';
import {UserDto, UserExtendedDto, UserCreateDto, UserUpdateDto, UserFilters} from '../../models/user';
import CreateUserDialog from '../../components/dialogs/user/CreateUserDialog.tsx';
import EditUserDialog from '../../components/dialogs/user/EditUserDialog.tsx';
import DetailUserDialog from '../../components/dialogs/user/DetailUserDialog.tsx';
import DeleteUserDialog from '../../components/dialogs/user/DeleteUserDialog.tsx';
import CursorPaginatedDataGrid from '../../components/dataDisplay/CursorPaginatedDataGrid.tsx';

const UserManagement: React.FC = () => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'displayName', headerName: 'Display Name', width: 200 },
        { field: 'role', headerName: 'Role', width: 150 },
    ];

    return (
        <Page title="User Management">
            <Typography component="h1" variant="h5">
                User Management
            </Typography>
            <CursorPaginatedDataGrid<UserDto, UserExtendedDto, UserCreateDto, UserUpdateDto, UserFilters>
                useEntitiesHook={useUsers}
                useEntityHook={useUser}
                useCreateEntityHook={useCreateUser}
                useUpdateEntityHook={useUpdateUser}
                useDeleteEntityHook={useDeleteUser}
                columns={columns}
                createFilterObject={(model) => { return {
                    id: model.items.find(item => item.field === 'id')?.value ?? undefined,
                    email: model.items.find(item => item.field === 'email')?.value ?? undefined,
                    displayName: model.items.find(item => item.field === 'displayName')?.value ?? undefined,
                    role: model.items.find(item => item.field === 'role')?.value ?? undefined,
                }}}
                createDialog={<CreateUserDialog />}
                editDialog={<EditUserDialog />}
                detailDialog={<DetailUserDialog />}
                deleteDialog={<DeleteUserDialog />}
            />
        </Page>
    );
};

export default UserManagement;
