import React, { useEffect, useLayoutEffect } from "react";
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
import {
  adminAuthRemove,
  selectAdminAuthRemoveError,
  selectAdminAuthRemoveStatus,
} from "../../features/auth/adminRemoveSlice";
import { useSnackbar } from "notistack";
import { baseURL } from "../../request";

function AdminAuth() {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const currentUserInfo = useAppSelector(selectCurrentUserStatus);
  const adminAuthStatus = useAppSelector(selectAdminAuthStatus);
  const adminAuthError = useAppSelector(selectAdminAuthError);
  const adminAuthData = useAppSelector(selectAdminAuthData);
  const adminAuthRemoveError = useAppSelector(selectAdminAuthRemoveError);
  const adminAuthRemoveStatus = useAppSelector(selectAdminAuthRemoveStatus);

  const deleteAuth = (id: string) => {
    dispatch(adminAuthRemove({ id }));
  };

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
              <Avatar
                alt={params.value.name}
                src={`${baseURL}/${params.value.avatar}`}
              />
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
    [deleteAuth]
  );

  useLayoutEffect(() => {
    dispatch(adminAuth());
    return () => {
      dispatch(clearAdminAuthState());
    };
  }, [currentUserInfo]);

  useEffect(() => {
    if (adminAuthRemoveStatus === "success") {
      enqueueSnackbar("操作成功", {
        variant: "success",
      });
      dispatch(adminAuth());
    }

    if (adminAuthRemoveStatus === "failed") {
      enqueueSnackbar(adminAuthRemoveError, {
        variant: "error",
      });
    }
  }, [adminAuthRemoveStatus]);

  return (
    <div style={{ height: "75vh", minWidth: "100%", padding: "0 1rem" }}>
      <DataGrid
        getRowId={(data) => data._id}
        rows={adminAuthData || []}
        columns={adminColumns as GridColumns<any>}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        loading={
          adminAuthStatus === "loading" || adminAuthRemoveStatus === "loading"
        }
        checkboxSelection
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
}

export default AdminAuth;
