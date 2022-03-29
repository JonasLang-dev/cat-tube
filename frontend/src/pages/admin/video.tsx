import React, { useLayoutEffect } from "react";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import { selectCurrentUserStatus } from "../../features/auth/currentUserSlice";
import {
  clearAdminPostState,
  adminPost,
  selectAdminPostError,
  selectAdminPostData,
  selectAdminPostStatus,
} from "../../features/post/adminPostSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";

function AdminVideo() {
  const dispatch = useAppDispatch();
  const currentUserInfo = useAppSelector(selectCurrentUserStatus);
  const adminPostStatus = useAppSelector(selectAdminPostStatus);
  const adminPostError = useAppSelector(selectAdminPostError);
  const adminPostData = useAppSelector(selectAdminPostData);

  const deletePost = (id: string) => {};

  const updatePost = (id: string) => {};

  const adminColumns = React.useMemo(
    () => [
      { field: "_id", headerName: "ID", flex: 2, hide: true },
      { field: "title", headerName: "Title", type: "string", flex: 2 },
      {
        field: "description",
        headerName: "Description",
        type: "string",
        flex: 2,
      },
      { field: "isActive", headerName: "isActive", type: "boolean", flex: 1 },
      { field: "videoUrl", headerName: "Video Url", type: "string", flex: 2 },
      { field: "postUrl", headerName: "Post Url", type: "string", flex: 2 },
      {
        field: "createdAt",
        headerName: "CreatedAt",
        type: "dateTime",
        flex: 2,
      },
      {
        field: "updatedAt",
        headerName: "updatedAt",
        type: "dateTime",
        flex: 2,
      },
      { field: "user", headerName: "User", flex: 2, hide: true },
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
            showInMenu
          />,
        ],
      },
    ],
    [deletePost, updatePost]
  );

  useLayoutEffect(() => {
    dispatch(adminPost());
    return () => {
      dispatch(clearAdminPostState());
    };
  }, [currentUserInfo]);

  return (
    <div style={{ height: "75vh", minWidth: "100%", padding: "0 1rem" }}>
      <DataGrid
        getRowId={(data) => data._id}
        rows={adminPostData || []}
        columns={adminColumns}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        loading={adminPostStatus === "loading"}
        checkboxSelection
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
}

export default AdminVideo;
