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
import {
  clearUserPostState,
  userPost,
  selectUserPostData,
  selectUserPostError,
  selectUserPostStatus,
} from "../../features/post/userPostSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { post, selectPostData } from "../../features/post/postSlice";
import { YouTube } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function StudioVideo() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUserInfo = useAppSelector(selectCurrentUserStatus);
  const postStatus = useAppSelector(selectUserPostStatus);
  const postError = useAppSelector(selectUserPostError);
  const postsData = useAppSelector(selectUserPostData);
  const postData = useAppSelector(selectPostData);

  const deletePost = (id: string) => {};

  const updatePost = (id: string) => {};

  const viewPost = (id: string) => {
    navigate(`/watch/${id}`);
  };
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
                src={params.value && `http://localhost:5020/${params.value}`}
              />
            </video>
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
        field: "likes",
        headerName: "likes",
      },
      {
        field: "views",
        headerName: "views",
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
          />,
          <GridActionsCellItem
            icon={<YouTube />}
            label="View"
            onClick={() => viewPost(params.id)}
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
        columns={columns as GridColumns<any>}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
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
