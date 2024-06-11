import React from 'react';
import {
    GridColDef
} from '@mui/x-data-grid';
import {
    useCategories, useCategory,
    useCreateCategory, useDeleteCategory, useUpdateCategory
} from '../../hooks/useCategories.ts';
import Page from "../../components/base/Page.tsx";
import CursorPaginatedDataGrid from "../../components/dataDisplay/CursorPaginatedDataGrid.tsx";
import { CategoryCreateDto, CategoryDto, CategoryUpdateDto } from "../../models/category.ts";
import CreateCategoryDialog from "../../components/dialogs/category/CreateCategoryDialog.tsx";
import EditCategoryDialog from "../../components/dialogs/category/EditCategoryDialog.tsx";
import DetailCategoryDialog from "../../components/dialogs/category/DetailCategoryDialog.tsx";
import DeleteCategoryDialog from "../../components/dialogs/category/DeleteCategoryDialog.tsx";

const CategoryManagement: React.FC = () => {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 200 },
    ];

    return (
        <Page title="Category Management">
            <CursorPaginatedDataGrid<CategoryDto, CategoryDto, CategoryCreateDto, CategoryUpdateDto>
                columns={columns}
                createDialog={<CreateCategoryDialog />}
                editDialog={<EditCategoryDialog />}
                detailDialog={<DetailCategoryDialog />}
                deleteDialog={<DeleteCategoryDialog />}
                useEntityHook={useCategory}
                useEntitiesHook={useCategories}
                useCreateEntityHook={useCreateCategory}
                useUpdateEntityHook={useUpdateCategory}
                useDeleteEntityHook={useDeleteCategory}
            />
        </Page>
    );
};

export default CategoryManagement;