import React from 'react';
import {
    GridColDef
} from '@mui/x-data-grid';
import {
    useCategories, useCategory,
    useCreateCategory, useDeleteCategory, useUpdateCategory/*, useCreateCategory, useUpdateCategory, useDeleteCategory*/
} from '../../hooks/useCategories.ts';
import Page from "../../components/base/Page.tsx";
import {Typography} from "@mui/material";
import CursorPaginatedDataGrid from "../../components/dataDisplay/CursorPaginatedDataGrid.tsx";
import {CategoryCreateDto, CategoryDto, CategoryUpdateDto} from "../../models/category.ts";
import CreateCategoryDialog from "../../components/dialogs/CreateCategoryDialog.tsx";
import EditCategoryDialog from "../../components/dialogs/EditCategoryDialog.tsx";
import DetailCategoryDialog from "../../components/dialogs/DetailCategoryDialog.tsx";


const CategoryManagement: React.FC = () => {
    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'name', headerName: 'Name', width: 200},
    ];

    return (
        <Page title="Category Management">
            <Typography component="h1" variant="h5">
                Category Management
            </Typography>
            <CursorPaginatedDataGrid<CategoryDto, CategoryDto, CategoryCreateDto, CategoryUpdateDto>
                columns={columns} createDialog={<CreateCategoryDialog/>} editDialog={<EditCategoryDialog/>}
                detailDialog={<DetailCategoryDialog/>} useEntityHook={useCategory} useEntitesHook={useCategories}
                useCreateEntityHook={useCreateCategory} useUpdateEntityHook={useUpdateCategory}
                useDeleteEntityHook={useDeleteCategory}/>
        </Page>
    );
};

export default CategoryManagement;