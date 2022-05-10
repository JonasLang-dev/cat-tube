import React, { useLayoutEffect } from "react";
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

function AdminCategory() {
  const dispatch = useAppDispatch();
  const currentUserInfo = useAppSelector(selectCurrentUserStatus);
  const adminCateStatus = useAppSelector(selectAdminCateStatus);
  const adminCateError = useAppSelector(selectAdminCateError);
  const adminCateData = useAppSelector(selectAdminCateData);

  const deletePost = (id: string) => {};

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
            onClick={() => deletePost(params.id)}
          />,
        ],
      },
    ],
    [deletePost]
  );

  useLayoutEffect(() => {
    dispatch(adminCategory());
    return () => {
      dispatch(clearAdminCateState());
    };
  }, [currentUserInfo]);

  return (
    <div style={{ height: "75vh", minWidth: "100%", padding: "0 1rem" }}>
      <DataGrid
        getRowId={(data) => data._id}
        rows={adminCateData || []}
        columns={columns as GridColumns<any>}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        loading={adminCateStatus === "loading"}
        checkboxSelection
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
}

export default AdminCategory;
