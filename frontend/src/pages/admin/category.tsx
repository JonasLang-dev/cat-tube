import React, { useEffect, useLayoutEffect } from "react";
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
  GridColumns,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import { selectCurrentUserStatus } from "../../features/auth/currentUserSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import {
  adminCategory,
  clearAdminCateState,
  selectAdminCateData,
  selectAdminCateError,
  selectAdminCateStatus,
} from "../../features/category/adminCateSlice";
import {
  removeCategory,
  selectRemoveCateStatus,
  selectRemoveCateError,
  clearRemoveCateState,
} from "../../features/category/removeCateSlice";
import { useSnackbar } from "notistack";

function AdminCategory() {
  const dispatch = useAppDispatch();
  const currentUserInfo = useAppSelector(selectCurrentUserStatus);
  const adminCateStatus = useAppSelector(selectAdminCateStatus);
  const adminCateError = useAppSelector(selectAdminCateError);
  const adminCateData = useAppSelector(selectAdminCateData);
  const removeCateStatus = useAppSelector(selectRemoveCateStatus);
  const removeCateError = useAppSelector(selectRemoveCateError);
  const { enqueueSnackbar } = useSnackbar();

  const deleteCategory = (id: string) => {
    dispatch(removeCategory({ id }));
  };

  const columns = React.useMemo(
    () => [
      { field: "_id", headerName: "ID", type: "string", flex: 2, hide: true },
      {
        field: "user",
        headerName: "User",
        flex: 2,
        renderCell: (params: GridRenderCellParams) => {
          return params.value.name;
        },
      },
      {
        field: "title",
        headerName: "Title",
        type: "string",
        flex: 2,
      },
      {
        field: "description",
        headerName: "Description",
        type: "string",
        flex: 2,
      },
      {
        field: "createdAt",
        headerName: "CreatedAt",
        valueGetter: ({ value }: { value: string }) => value && new Date(value),
        type: "dateTime",
        flex: 2,
      },
      {
        field: "updatedAt",
        headerName: "updatedAt",
        valueGetter: ({ value }: { value: string }) => value && new Date(value),
        type: "dateTime",
        flex: 2,
      },
      {
        field: "actions",
        type: "actions",
        flex: 2,
        getActions: (params: any) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => deleteCategory(params.id)}
          />,
        ],
      },
    ],
    [deleteCategory]
  );

  useLayoutEffect(() => {
    dispatch(adminCategory());
    return () => {
      dispatch(clearAdminCateState());
    };
  }, [currentUserInfo]);

  useEffect(() => {
    if (removeCateStatus === "success") {
      enqueueSnackbar("操作成功", { variant: "success" });
      dispatch(clearRemoveCateState());
      dispatch(adminCategory());
    }
  }, [removeCateStatus]);

  return (
    <div style={{ height: "75vh", minWidth: "100%", padding: "0 1rem" }}>
      <DataGrid
        getRowId={(data) => data._id}
        rows={adminCateData || []}
        columns={columns as GridColumns<any>}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        loading={
          adminCateStatus === "loading" || removeCateStatus === "loading"
        }
        checkboxSelection
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
}

export default AdminCategory;
