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
import {
  removePost,
  selectRemovePostError,
  selectRemovePostStatus,
} from "../../features/post/removePostSlice";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { baseURL } from "../../request";

function StudioVideo() {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const currentUserInfo = useAppSelector(selectCurrentUserStatus);
  const postStatus = useAppSelector(selectUserPostStatus);
  const postError = useAppSelector(selectUserPostError);
  const postsData = useAppSelector(selectUserPostData);
  const postData = useAppSelector(selectPostData);
  const removePostStatus = useAppSelector(selectRemovePostStatus);
  const removePostError = useAppSelector(selectRemovePostError);
  const deletePost = (id: string) => {
    dispatch(removePost(id));
  };

  const updatePost = (id: string) => {};

  const viewPost = (id: string) => {
    navigate(`/watch?v=${id}`);
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
              <source src={params.value && `${baseURL}/${params.value}`} />
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
      dispatch(userPost());
    }
    return () => {
      dispatch(clearUserPostState());
    };
  }, [currentUserInfo, postData]);

  useEffect(() => {
    if (removePostStatus === "success") {
      if (currentUserInfo?._id) {
        enqueueSnackbar(t("Remove post success"), { variant: "success" });
        dispatch(userPost());
      }
    }
    if (removePostStatus === "failed") {
      enqueueSnackbar(removePostError, { variant: "error" });
    }
  }, [removePostStatus]);

  return (
    <div style={{ height: "80vh", padding: "0 1rem" }}>
      <DataGrid
        getRowId={(data) => data._id}
        rows={postsData || []}
        columns={columns as GridColumns<any>}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        loading={postStatus === "loading" || removePostStatus === "loading"}
        components={{ Toolbar: GridToolbar }}
        error={postError}
        rowHeight={200}
      />
    </div>
  );
}

export default StudioVideo;
