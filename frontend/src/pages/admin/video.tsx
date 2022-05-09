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
  clearAdminPostState,
  adminPost,
  selectAdminPostError,
  selectAdminPostData,
  selectAdminPostStatus,
} from "../../features/post/adminPostSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import {
  adminRemovePost,
  selectAdminRemovePostError,
  selectAdminRemovePostStatus,
} from "../../features/post/adminRemovePostSlice";
import {
  adminUpdatePost,
  selectAdminUpdatePostError,
  selectAdminUpdatePostStatus,
} from "../../features/post/adminUpdatePostSlice";
import { useSnackbar } from "notistack";

function AdminVideo() {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const currentUserInfo = useAppSelector(selectCurrentUserStatus);
  const adminPostStatus = useAppSelector(selectAdminPostStatus);
  const adminPostError = useAppSelector(selectAdminPostError);
  const adminPostData = useAppSelector(selectAdminPostData);
  const adminRemovePostError = useAppSelector(selectAdminRemovePostError);
  const adminRemovePostStatus = useAppSelector(selectAdminRemovePostStatus);
  const adminUpdatePostError = useAppSelector(selectAdminUpdatePostError);
  const adminUpdatePostStatus = useAppSelector(selectAdminUpdatePostStatus);

  const deletePost = (id: string) => {
    dispatch(adminRemovePost({ id }));
  };

  const updatePost = (id: string) => {
    dispatch(adminUpdatePost({ id }));
  };

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
        field: "user",
        headerName: "User",
        flex: 2,
        renderCell: (params: GridRenderCellParams) => {
          return params.value.name;
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

  useEffect(() => {
    if (
      adminRemovePostStatus === "success" ||
      adminUpdatePostStatus === "success"
    ) {
      enqueueSnackbar("操作成功", {
        variant: "success",
      });
      dispatch(adminPost());
    }

    if (
      adminRemovePostStatus === "failed" ||
      adminUpdatePostStatus === "failed"
    ) {
      enqueueSnackbar(adminRemovePostError || adminUpdatePostError, {
        variant: "error",
      });
    }
  }, [adminRemovePostStatus, adminUpdatePostStatus]);

  return (
    <div style={{ height: "75vh", minWidth: "100%", padding: "0 1rem" }}>
      <DataGrid
        getRowId={(data) => data._id}
        rows={adminPostData || []}
        columns={adminColumns as GridColumns<any>}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        loading={
          adminPostStatus === "loading" ||
          adminRemovePostStatus === "loading" ||
          adminUpdatePostStatus === "loading"
        }
        checkboxSelection
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
}

export default AdminVideo;
