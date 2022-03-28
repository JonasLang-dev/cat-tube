import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../hooks/redux.hooks";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const postSchema = object({
  title: string().nonempty({ message: "Title is required" }),
  description: string().nonempty({ message: "Title is required" }),
});

type PostInput = TypeOf<typeof postSchema>;

const PostDialog = forwardRef((props: { videoPath: string }, ref) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostInput>({
    resolver: zodResolver(postSchema),
  });
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  useImperativeHandle(ref, () => ({
    handleClickOpen() {
      setOpen(true);
    },
  }));

  const onSubmit = (value: PostInput) => {
    // dispatch(emailForPass(value));
    console.log(value);
  };

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
            type="string"
            fullWidth
            disabled
            value={props.videoPath}
          />
          <video controls style={{ width: "100%" }} src={props.videoPath} />
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
