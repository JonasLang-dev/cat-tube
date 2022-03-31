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
import axiosInstance from "../request";
import {
  clearPostState,
  post,
  selectPostError,
  selectPostStatus,
} from "../features/post/postSlice";

const Input = styled("input")({
  display: "none",
});

const postSchema = object({
  title: string().nonempty({ message: "Title is required" }),
  description: string().nonempty({ message: "Title is required" }),
});

type PostInput = TypeOf<typeof postSchema>;

const PostDialog = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const postStatus = useAppSelector(selectPostStatus);
  const postError = useAppSelector(selectPostError);

  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<PostInput>({
    resolver: zodResolver(postSchema),
  });
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [loadingPostUpload, setLoadingPostUpload] = useState<boolean>(false);
  const handleClose = () => {
    dispatch(clearPostState());
    setLoadingPostUpload(false);
    setVideoUrl("");
    setImage("");
    resetField("title");
    resetField("description");
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({
    handleClickOpen() {
      setOpen(true);
    },
    setVideoUrl(url: string) {
      setVideoUrl(url);
    },
  }));

  const uploadPosterHandler = async (e: any) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("poster", file);
    setLoadingPostUpload(true);
    try {
      const { data } = await axiosInstance.post(
        "/api/upload/poster",
        bodyFormData
      );
      setImage(data.message);
      setLoadingPostUpload(false);
    } catch (error: any) {
      enqueueSnackbar(error.response.data.message || error.message, {
        variant: "error",
      });
      setLoadingPostUpload(false);
    }
  };

  const onSubmit = (value: PostInput) => {
    dispatch(
      post({
        ...value,
        postUrl: image,
        videoUrl,
      })
    );
  };

  useEffect(() => {
    if (postStatus === "failed") {
      if (Array.isArray(postError)) {
        postError.forEach((item) => {
          enqueueSnackbar(t(item.message), { variant: "error" });
        });
      } else {
        enqueueSnackbar(t("Network Error"), { variant: "error" });
      }
      dispatch(clearPostState());
    }
    if (postStatus === "success") {
      enqueueSnackbar(t("Success release a post"), { variant: "success" });
      handleClose();
    }

    return () => {
      handleClose();
    };
  }, [postStatus, postError]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t("Post")}</DialogTitle>
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
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <label htmlFor="icon-button-file">
                    <Input
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      onChange={uploadPosterHandler}
                    />
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </InputAdornment>
              ),
            }}
            margin="dense"
            id="poster"
            label={t("Poster Url")}
            type="url"
            fullWidth
            value={image}
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
          <TextField
            required
            margin="dense"
            type="url"
            fullWidth
            disabled
            value={videoUrl}
          />
          <video
            controls
            style={{ width: "100%" }}
            src={`http://localhost:5020${videoUrl}`}
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
export default PostDialog;
