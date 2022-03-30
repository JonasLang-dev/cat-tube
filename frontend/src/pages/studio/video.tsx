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
import EditIcon from "@mui/icons-material/Edit";
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
  const columns = React.useMemo(
    () => [
      { field: "_id", headerName: "ID", hide: true },
      {
        field: "videoUrl",
        headerName: "Video Url",
        width: 270,
        renderCell: (params: GridRenderCellParams) => {
          return (
            <video
              controls
              preload="metadata"
              controlsList="nodownload nofullscreen noremoteplayback"
              style={{ objectFit: "contain", width: "100%" }}
            >
              <source
                src={
                  params.value
                    ? `http://localhost:5020${params.value}`
                    : "http://localhost:5020/avatar.png"
                }
              />
            </video>
          );
        },
      },
      {
        field: "postUrl",
        headerName: "Post Url",
        renderCell: (params: GridRenderCellParams) => {
          return (
            <img
              style={{ objectFit: "contain", width: "100%" }}
              src={
                params.value
                  ? `http://localhost:5020${params.value}`
                  : "http://localhost:5020/avatar.png"
              }
            />
          );
        },
        width: 200,
      },
      {
        field: "user",
        headerName: "User",
        width: 160,
        renderCell: (params: GridRenderCellParams) => {
          return (
            <>
              <Avatar
                alt={params.value.name}
                src={
                  params.value.avatar
                    ? `http://localhost:5020${params.value.avatar}`
                    : "http://localhost:5020/avatar.png"
                }
              />{" "}
              &nbsp; {params.value.name}
            </>
          );
        },
      },
      { field: "title", headerName: "Title", type: "string", width: 160 },
      {
        field: "description",
        headerName: "Description",
        type: "string",
        width: 200,
      },
      {
        field: "isActive",
        headerName: "Visibility",
        type: "boolean",
      },

      {
        field: "createdAt",
        headerName: "CreatedAt",
        type: "dateTime",
        valueGetter: ({ value }: { value: string }) => value && new Date(value),
        width: 160,
      },
      {
        field: "updatedAt",
        headerName: "updatedAt",
        valueGetter: ({ value }: { value: string }) => value && new Date(value),
        type: "dateTime",
        width: 160,
      },
      {
        field: "actions",
        type: "actions",
        getActions: (params: any) => [
          <GridActionsCellItem
            icon={<EditIcon />}
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
    <div style={{ height: "80vh", padding: "0 1rem" }}>
      <DataGrid
        getRowId={(data) => data._id}
        rows={postsData || []}
        columns={columns}
        pageSize={5}
        checkboxSelection
        loading={postStatus === "loading"}
        components={{ Toolbar: GridToolbar }}
        error={postError}
        rowHeight={200}
      />
    </div>
  );
}

export default StudioVideo;
