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

function AdsPage() {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const ads = useAppSelector(selectAds);
  const adsError = useAppSelector(selectAdsError);
  const adsStatus = useAppSelector(selectAdsStatus);

  const deleteAds = (id: string) => {};

  const columns = React.useMemo(
    () => [{ field: "_id", headerName: "ID" }],
    [deleteAds]
  );

  useEffect(() => {
    dispatch(getAds());
    return () => {
      dispatch(clearAdsState());
    };
  }, []);

  return (
    <div style={{ height: "80vh", padding: "0 1rem" }}>
      <DataGrid
        getRowId={(data) => data._id}
        rows={ads || []}
        columns={columns as GridColumns<any>}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        loading={adsStatus === "loading"}
        components={{ Toolbar: GridToolbar }}
        error={adsError}
        rowHeight={200}
      />
    </div>
  );
}

export default AdsPage;
