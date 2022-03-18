import {
  useState,
  FC,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

const FormDialog = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  useImperativeHandle(ref, () => ({
    handleClickOpen() {
      setOpen(true);
    },
  }));

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Find Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To find your password, please enter your email address here. We will
            send your a rest password code.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
export default FormDialog;
