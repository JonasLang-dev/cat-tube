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
import {
  clearEmailForPassState,
  emailForPass,
  selectEmailForPassErrors,
  selectEmailForPassStatus,
} from "../features/email/restSlice";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const sendEmailForPassSchema = object({
  email: string()
    .nonempty({ message: "Email is required" })
    .email("Not a valid email"),
});

type SendEmailForPassInput = TypeOf<typeof sendEmailForPassSchema>;

const FormDialog = forwardRef((props, ref) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const emailForPassErrors = useAppSelector(selectEmailForPassErrors);
  const emailForPassStatus = useAppSelector(selectEmailForPassStatus);
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<SendEmailForPassInput>({
    resolver: zodResolver(sendEmailForPassSchema),
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

  const onSubmit = (value: SendEmailForPassInput) => {
    dispatch(emailForPass(value));
  };

  useEffect(() => {
    if (emailForPassStatus === "failed") {
      if (Array.isArray(emailForPassErrors)) {
        emailForPassErrors.map((item) => {
          enqueueSnackbar(item.message, { variant: "error" });
        });
      }
      dispatch(clearEmailForPassState());
    }
    if (emailForPassStatus === "success") {
      enqueueSnackbar(
        "If a user with that is registerd yout will receive a password reset email",
        { variant: "info" }
      );
      dispatch(clearEmailForPassState());
      resetField("email");
      handleClose();
    }
  }, [emailForPassStatus]);
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t("forgotPassword")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("forgetPasswordHelperText")}</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label={t("email")}
            type="email"
            fullWidth
            {...register("email")}
            error={errors.hasOwnProperty("email")}
            helperText={errors.email?.message}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("cancel")}</Button>
          <Button onClick={handleSubmit(onSubmit)}>{t("send")}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
export default FormDialog;
