import React, { useLayoutEffect } from "react";
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import { selectCurrentUserStatus } from "../../features/auth/currentUserSlice";
import {
  clearUserPostState,
  userPost,
  selectUserPostData,
  selectUserPostError,
  selectUserPostStatus,
} from "../../features/post/userPostSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import { Avatar, Skeleton } from "@mui/material";
import { post, selectPostData } from "../../features/post/postSlice";

function StudioVideo() {
  const dispatch = useAppDispatch();
  const currentUserInfo = useAppSelector(selectCurrentUserStatus);
  const postStatus = useAppSelector(selectUserPostStatus);
  const postError = useAppSelector(selectUserPostError);
  const postsData = useAppSelector(selectUserPostData);
  const postData = useAppSelector(selectPostData);

  const deletePost = (id: string) => {};

  const updatePost = (id: string) => {};
  console.log(post);
  const columns = React.useMemo(
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
      {
        field: "videoUrl",
        headerName: "Video Url",
        renderCell: (params: GridRenderCellParams) => {
          return (
            <video
              width="100%"
              height="auto"
              src={
                params.value
                  ? `http://localhost:5020${params.value}`
                  : "http://localhost:5020/avatar.png"
              }
            />
          );
        },
        flex: 2,
      },
      {
        field: "postUrl",
        headerName: "Post Url",
        renderCell: (params: GridRenderCellParams) => {
          return (
            <img
              width="100%"
              height="auto"
              src={
                params.value
                  ? `http://localhost:5020${params.value}`
                  : "http://localhost:5020/avatar.png"
              }
            />
          );
        },
        flex: 2,
      },
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
      {
        field: "user",
        headerName: "User",
        flex: 2,
        renderCell: (params: GridRenderCellParams) => {
          return (
            <Avatar
              alt={params.value.name}
              src={
                params.value.avatar
                  ? `http://localhost:5020${params.value.avatar}`
                  : "http://localhost:5020/avatar.png"
              }
            />
          );
        },
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
            showInMenu
          />,
        ],
      },
    ],
    [deletePost, updatePost, post]
  );

  useLayoutEffect(() => {
    if (currentUserInfo?._id) {
      dispatch(userPost(currentUserInfo._id));
    }
    return () => {
      dispatch(clearUserPostState());
    };
  }, [currentUserInfo, postData]);
  return (
    <div style={{ height: "75vh", minWidth: "100%", padding: "0 1rem" }}>
      <DataGrid
        getRowId={(data) => data._id}
        rows={postsData || []}
        columns={columns}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        checkboxSelection
        loading={postStatus === "loading"}
        components={{ Toolbar: GridToolbar }}
        autoHeight
      />
    </div>
  );
}

export default StudioVideo;
