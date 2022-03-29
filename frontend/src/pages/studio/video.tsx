import React, { useLayoutEffect } from "react";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import { selectCurrentUserStatus } from "../../features/auth/currentUserSlice";
import {
  clearGetPostState,
  getPost,
  selectGetPostData,
  selectGetPostError,
  selectGetPostStatus,
} from "../../features/post/getPostSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcom from "@mui/icons-material/Update";

function StudioVideo() {
  const dispatch = useAppDispatch();
  const currentUserInfo = useAppSelector(selectCurrentUserStatus);
  const postStatus = useAppSelector(selectGetPostStatus);
  const postError = useAppSelector(selectGetPostError);
  const postData = useAppSelector(selectGetPostData);

  const deletePost = (id: string) => {};

  const updatePost = (id: string) => {};

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
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => deletePost(params.id)}
          />,
          <GridActionsCellItem
            icon={<UpdateIcom />}
            label="Toggle Admin"
            onClick={() => updatePost(params.id)}
            showInMenu
          />,
        ],
      },
    ],
    [deletePost, updatePost]
  );

  useLayoutEffect(() => {
    if (currentUserInfo?._id) {
      dispatch(getPost(currentUserInfo._id));
    }
    return () => {
      dispatch(clearGetPostState());
    };
  }, [currentUserInfo]);
  return (
    <div style={{ height: "75vh", minWidth: "100%", padding: "0 1rem" }}>
      {postStatus === "loading" && <div>Loading...</div>}
      {postData && (
        <DataGrid
          getRowId={(data) => data._id}
          rows={postData}
          columns={columns}
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          checkboxSelection
          components={{ Toolbar: GridToolbar }}
        />
      )}
    </div>
  );
}

export default StudioVideo;
