import React, { useLayoutEffect } from "react";
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
  GridRenderCellParams,
  GridColumns,
} from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import { selectCurrentUserStatus } from "../../features/auth/currentUserSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import {
  adminAuth,
  clearAdminAuthState,
  selectAdminAuthData,
  selectAdminAuthError,
  selectAdminAuthStatus,
} from "../../features/auth/adminAuthSlice";
import { Avatar } from "@mui/material";

function AdminAuth() {
  const dispatch = useAppDispatch();
  const adminAuthStatus = useAppSelector(selectAdminAuthStatus);
  const adminAuthError = useAppSelector(selectAdminAuthError);
  const adminAuthData = useAppSelector(selectAdminAuthData);

  const deleteAuth = (id: string) => {};

  const updateAuth = (id: string) => {};

  const adminColumns = React.useMemo(
    () => [
      { field: "_id", headerName: "ID", flex: 2, hide: true },
      {
        field: "user",
        headerName: "User",
        flex: 2,
        renderCell: (params: GridRenderCellParams) => {
          return (
            <>
              <Avatar alt={params.value.name} src={params.value.avatar} />
              &nbsp; {params.value.name}
            </>
          );
        },
      },
      { field: "valid", headerName: "Valid", type: "boolean", flex: 1 },
      {
        field: "createdAt",
        headerName: "CreatedAt",
        type: "dateTime",
        valueGetter: ({ value }: { value: string }) => value && new Date(value),
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
            onClick={() => deleteAuth(params.id)}
          />,
        ],
      },
    ],
    [deleteAuth, updateAuth]
  );

  useLayoutEffect(() => {
    dispatch(adminAuth());
    return () => {
      dispatch(clearAdminAuthState());
    };
  }, []);

  return (
    <div style={{ height: "75vh", minWidth: "100%", padding: "0 1rem" }}>
      <DataGrid
        getRowId={(data) => data._id}
        rows={adminAuthData || []}
        columns={adminColumns as GridColumns<any>}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        loading={adminAuthStatus === "loading"}
        checkboxSelection
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
}

export default AdminAuth;
