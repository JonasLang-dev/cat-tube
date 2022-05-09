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
  adminUser,
  clearAdminUserState,
  selectAdminUserData,
  selectAdminUserError,
  selectAdminUserStatus,
} from "../../features/users/adminUserSlice";

function AdminAuth() {
  const dispatch = useAppDispatch();
  const currentUserInfo = useAppSelector(selectCurrentUserStatus);
  const adminUserStatus = useAppSelector(selectAdminUserStatus);
  const adminUserError = useAppSelector(selectAdminUserError);
  const adminUserData = useAppSelector(selectAdminUserData);

  const deletePost = (id: string) => {};

  const updatePost = (id: string) => {};

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
            icon={<SettingsSuggestOutlinedIcon />}
            label="Update"
            onClick={() => updatePost(params.id)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => deletePost(params.id)}
          />,
        ],
      },
    ],
    [deletePost, updatePost]
  );

  useLayoutEffect(() => {
    dispatch(adminUser());
    return () => {
      dispatch(clearAdminUserState());
    };
  }, [currentUserInfo]);

  return (
    <div style={{ height: "75vh", minWidth: "100%", padding: "0 1rem" }}>
      <DataGrid
        getRowId={(data) => data._id}
        rows={adminUserData || []}
        columns={columns as GridColumns<any>}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        loading={adminUserStatus === "loading"}
        checkboxSelection
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
}

export default AdminAuth;
