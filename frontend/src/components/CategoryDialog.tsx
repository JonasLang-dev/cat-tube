import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, IconButton, InputAdornment } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../hooks/redux.hooks";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhotoCamera } from "@mui/icons-material";
import styled from "@emotion/styled";
import axiosInstance, { baseURL } from "../request";
import {
  clearPostState,
  post,
  selectPostError,
  selectPostStatus,
} from "../features/post/postSlice";
import {
  selectAddCateError,
  addCategory,
  selectAddCateStatus,
  clearAddCateState,
} from "../features/category/addCateSlice";
import { adminCategory } from "../features/category/adminCateSlice";

const postSchema = object({
  title: string().min(2, { message: "Title min 2 characters" }),
  description: string().min(3, { message: "Description min 3 characters" }),
});

type PostInput = TypeOf<typeof postSchema>;

const CategoryDialog = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const addCateStatus = useAppSelector(selectAddCateStatus);
  const addCateError = useAppSelector(selectAddCateError);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<string>("");
  const [postInfo, setPostInfo] = useState<any>({});
  const { enqueueSnackbar } = useSnackbar();

  const [loadingPostUpload, setLoadingPostUpload] = useState<boolean>(false);
  const handleClose = () => {
    dispatch(clearPostState());
    setLoadingPostUpload(false);
    setPostInfo({});
    setImage("");
    resetField("title");
    resetField("description");
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    formState: { errors },
  } = useForm<PostInput>({
    resolver: zodResolver(postSchema),
  });

  useImperativeHandle(ref, () => ({
    handleClickOpen() {
      setOpen(true);
    },
  }));

  const onSubmit = (value: PostInput) => {
    dispatch(addCategory(value));
  };

  useEffect(() => {
    if (addCateStatus === "success") {
      enqueueSnackbar(t("Success release a category"), { variant: "success" });
      dispatch(clearAddCateState());
      dispatch(adminCategory());
      handleClose();
    }

    if (addCateStatus === "failed") {
      if (Array.isArray(addCateError)) {
        addCateError.forEach((item) => {
          enqueueSnackbar(t(item.message), { variant: "error" });
        });
      } else {
        enqueueSnackbar(addCateError, { variant: "error" });
      }
      dispatch(clearPostState());
    }
    return () => {
      handleClose();
    };
  }, [addCateStatus]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t("Add category")}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            label={t("Title")}
            type="string"
            fullWidth
            {...register("title")}
            error={errors.hasOwnProperty("title")}
            helperText={errors.title?.message}
          />
          <TextField
            required
            margin="dense"
            id="description"
            multiline
            rows={4}
            label={t("Description")}
            type="string"
            fullWidth
            {...register("description")}
            error={errors.hasOwnProperty("description")}
            helperText={errors.description?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("cancel")}</Button>
          <Button onClick={handleSubmit(onSubmit)}>{t("submit")}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
export default CategoryDialog;
