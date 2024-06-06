import React/*, {useState}*/ from 'react';
/*import Page from '../../components/base/Page';
import {Typography, Button} from '@mui/material';*/
import {
    DataGrid,
    /*GridColDef,*/
    GridPaginationMeta,
    GridPaginationModel,
    /*GridRenderCellParams,*/
    GridRowId
} from '@mui/x-data-grid';
import {useCategories/*, useCreateCategory, useUpdateCategory, useDeleteCategory*/} from '../../hooks/useCategories';
/*import {CategoryDto} from '../../models/category';
import AddCategoryDialog from '../../components/dialogs/AddCategoryDialog';
import EditCategoryDialog from '../../components/dialogs/EditCategoryDialog';*/
import {GET_MANY_SIZE} from "../../api/apiService.ts";

const CategoryManagement: React.FC = () => {
    /*const [cursorId, setCursorId] = useState<number | undefined>(undefined);
    const {data: categories, isLoading, error} = useCategories(cursorId);
    const createCategoryMutation = useCreateCategory();
    const updateCategoryMutation = useUpdateCategory();
    const deleteCategoryMutation = useDeleteCategory();

    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<CategoryDto | null>(null);

    const handleAddCategory = (name: string) => {
        createCategoryMutation.mutate({name});
    };

    const handleEditCategory = (id: number, name: string) => {
        updateCategoryMutation.mutate({id, category: {name}});
    };

    const handleDeleteCategory = (id: number) => {
        deleteCategoryMutation.mutate(id);
    };

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'name', headerName: 'Name', width: 200},
        {
            field: 'edit',
            headerName: 'Edit',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        setCurrentCategory(params.row as CategoryDto);
                        setIsEditDialogOpen(true);
                    }}
                >
                    Edit
                </Button>
            ),
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteCategory((params.row as CategoryDto).id)}
                >
                    Delete
                </Button>
            ),
        },
    ];


    return (
        <Page title="Category Management">
            <Typography component="h1" variant="h5">
                Category Management
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setIsCreateDialogOpen(true)}>
                Add Category
            </Button>
            <DataGrid
                rows={categories || []}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 20, page: 0 },
                    },
                }}


                pageSize={10}
                rowsPerPageOptions={[10]}
                rowCount={rows.length}
                paginationMode="server"
                onPageChange={() => handleRowsScrollEnd()}
                loading={isFetchingNextPage}
                disableRowSelectionOnClick
            />

            <AddCategoryDialog
                open={isCreateDialogOpen}
                onClose={() => setIsCreateDialogOpen(false)}
                onAddCategory={handleAddCategory}
            />

            <EditCategoryDialog
                open={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
                onEditCategory={handleEditCategory}
                category={currentCategory}
            />
        </Page>
    );*/

    const { data, fetchNextPage, hasNextPage, isFetching} = useCategories();
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: GET_MANY_SIZE,
    });

    const rows = React.useMemo( () => {
        //fetchNextPage();
        return data?.pages[paginationModel.page] ?? []
    }, [paginationModel])

    const handlePaginationModelChange = async (newPaginationModel: GridPaginationModel) => {
        if (data?.pages && data?.pages.length - 1 < newPaginationModel.page) {
            await fetchNextPage();
        }

        setPaginationModel(newPaginationModel);
    };

    const paginationMetaRef = React.useRef<GridPaginationMeta>();
    // Memoize to avoid flickering when the `hasNextPage` is `undefined` during refetch
    // paginationMeta = whether next page is available
    const paginationMeta = React.useMemo(() => {
        if (
            hasNextPage !== undefined &&
            paginationMetaRef.current?.hasNextPage !== hasNextPage
        ) {
            paginationMetaRef.current = { hasNextPage };
        }
        return paginationMetaRef.current;
    }, [hasNextPage]);

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={[
                    { field: 'id', headerName: 'ID', width: 90 },
                    { field: 'name', headerName: 'Name', width: 150 }
                ]}
                paginationMode="server"
                rowCount={-1}
                initialState={{ pagination: { rowCount: -1 } }}
                paginationModel={paginationModel}
                onPaginationModelChange={handlePaginationModelChange}
                paginationMeta={paginationMeta}
                loading={isFetching}
            />
        </div>
    );
};

export default CategoryManagement;