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
import { useNavigate } from "react-router-dom";

import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import {
  clearAdsState,
  getAds,
  selectAds,
  selectAdsError,
  selectAdsStatus,
} from "../../features/ads/adsSlice";
import { baseURL } from "../../request";
import {
  removeAd,
  selectRemoveAdError,
  selectRemoveAdStatus,
} from "../../features/ads/removeAdSlice";

function AdsPage() {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const ads = useAppSelector(selectAds);
  const adsError = useAppSelector(selectAdsError);
  const adsStatus = useAppSelector(selectAdsStatus);
  const removeAdStatus = useAppSelector(selectRemoveAdStatus);
  const removeAdError = useAppSelector(selectRemoveAdError);

  const deleteAds = (id: string) => {
    dispatch(removeAd({ id }));
  };

  const columns = React.useMemo(
    () => [
      { field: "_id", headerName: "ID", hidden: true },
      { field: "title", headerName: "title", flex: 1 },
      {
        field: "image",
        headerName: "image",
        flex: 1,
        renderCell: (params: GridRenderCellParams) => {
          return (
            <img
              style={{ objectFit: "contain", width: "80%" }}
              src={params.value && `${baseURL}/${params.value}`}
            />
          );
        },
      },
      {
        field: "actions",
        type: "actions",
        getActions: (params: any) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => deleteAds(params.id)}
          />,
        ],
      },
    ],
    [deleteAds]
  );

  useEffect(() => {
    dispatch(getAds());

    if (removeAdStatus === "success") {
      enqueueSnackbar("添加成功", { variant: "success" });
      dispatch(getAds());
    }

    if (removeAdStatus === "failed") {
      enqueueSnackbar(removeAdError, { variant: "error" });
    }

    return () => {
      dispatch(clearAdsState());
    };
  }, [removeAdStatus]);

  return (
    <div style={{ height: "80vh", padding: "0 1rem" }}>
      <DataGrid
        getRowId={(data) => data._id}
        rows={ads || []}
        columns={columns as GridColumns<any>}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        loading={adsStatus === "loading" || removeAdStatus === "loading"}
        components={{ Toolbar: GridToolbar }}
        error={adsError}
        rowHeight={200}
      />
    </div>
  );
}

export default AdsPage;
