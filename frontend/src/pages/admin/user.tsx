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
  adminUser,
  clearAdminUserState,
  selectAdminUserData,
  selectAdminUserError,
  selectAdminUserStatus,
} from "../../features/users/adminUserSlice";
import {
  adminActive,
  clearAdminActiveState,
  selectAdminActiveError,
  selectAdminActiveStatus,
} from "../../features/users/adminActiveSlice";
import {
  adminBan,
  clearAdminBanState,
  selectAdminBanError,
  selectAdminBanStatus,
} from "../../features/users/adminBanSlice";
import { useSnackbar } from "notistack";
import {
  adminRevoke,
  clearAdminRevokeState,
  selectAdminRevokeError,
  selectAdminRevokeStatus,
} from "../../features/users/adminRevokeSlice";
import {
  adminDelegate,
  selectAdminDelegateError,
  selectAdminDelegateStatus,
} from "../../features/users/adminDelegateSlice";

function AdminAuth() {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const currentUserInfo = useAppSelector(selectCurrentUserStatus);
  const adminUserStatus = useAppSelector(selectAdminUserStatus);
  const adminUserError = useAppSelector(selectAdminUserError);
  const adminUserData = useAppSelector(selectAdminUserData);
  const adminBanError = useAppSelector(selectAdminBanError);
  const adminBanStatus = useAppSelector(selectAdminBanStatus);
  const adminActiveError = useAppSelector(selectAdminActiveError);
  const adminActiveStatus = useAppSelector(selectAdminActiveStatus);
  const adminRevokeError = useAppSelector(selectAdminRevokeError);
  const adminRevokeStatus = useAppSelector(selectAdminRevokeStatus);
  const adminDelegateError = useAppSelector(selectAdminDelegateError);
  const adminDelegateStatus = useAppSelector(selectAdminDelegateStatus);

  const toggleUserActive = (params: any) => {
    if (params.row.isDelete) {
      dispatch(adminActive({ id: params.id }));
    } else {
      dispatch(adminBan({ id: params.id }));
    }
  };

  const updatePost = (params: any) => {
    if (params.row.isAdmin) {
      dispatch(adminRevoke({ id: params.id }));
    } else {
      dispatch(adminDelegate({ id: params.id }));
    }
  };

  const columns = React.useMemo(
    () => [
      { field: "_id", headerName: "ID", type: "string", flex: 2, hide: true },
      { field: "email", headerName: "Email", type: "string", flex: 2 },
      {
        field: "name",
        headerName: "User Name",
        type: "string",
        flex: 2,
      },
      { field: "avatar", headerName: "Avatar", type: "string", flex: 2 },
      { field: "isAdmin", headerName: "Admin", type: "boolean", flex: 1 },
      { field: "isDelete", headerName: "Delete", type: "boolean", flex: 1 },
      {
        field: "actions",
        type: "actions",
        flex: 2,
        getActions: (params: any) => [
          <GridActionsCellItem
            icon={<SettingsSuggestOutlinedIcon />}
            label="Update"
            onClick={() => updatePost(params)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => toggleUserActive(params)}
          />,
        ],
      },
    ],
    [toggleUserActive, updatePost]
  );

  useLayoutEffect(() => {
    dispatch(adminUser());
    return () => {
      dispatch(clearAdminUserState());
    };
  }, [currentUserInfo]);

  useEffect(() => {
    if (
      adminBanStatus === "success" ||
      adminActiveStatus === "success" ||
      adminDelegateStatus === "success" ||
      adminRevokeStatus === "success"
    ) {
      enqueueSnackbar("操作成功", {
        variant: "success",
      });
      dispatch(adminUser());
    }

    if (
      adminBanStatus === "failed" ||
      adminActiveStatus === "failed" ||
      adminDelegateStatus === "failed" ||
      adminRevokeStatus === "failed"
    ) {
      enqueueSnackbar(
        adminBanError ||
          adminActiveError ||
          adminDelegateError ||
          adminRevokeError,
        {
          variant: "error",
        }
      );
    }
  }, [
    adminBanStatus,
    adminActiveStatus,
    adminDelegateStatus,
    adminRevokeStatus,
  ]);

  return (
    <div style={{ height: "75vh", minWidth: "100%", padding: "0 1rem" }}>
      <DataGrid
        getRowId={(data) => data._id}
        rows={adminUserData || []}
        columns={columns as GridColumns<any>}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        loading={
          adminUserStatus === "loading" ||
          adminBanStatus === "loading" ||
          adminActiveStatus === "loading" ||
          adminRevokeStatus === "loading" ||
          adminDelegateStatus === "loading"
        }
        checkboxSelection
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
}

export default AdminAuth;
