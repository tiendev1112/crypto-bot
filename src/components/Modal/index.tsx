import React, { CSSProperties, ReactNode } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    width: "80vh",
    height: "auto",
    maxHeight: "80vh",
    overflow: "auto",
		position: "relative"
  },
	iconClose: {
		display: 'block',
		width: 25,
		height: 25,
		cursor: 'pointer',
		position: 'absolute',
		right: 10,
		top: 10,
		'&:hover': {
			backgroundColor: '#e1e1e1',
			'& svg': {
				color: '#333',
			},
		},
		'& svg': {
			fontSize: 25,
			color: '#8C8C8C',
		},
	},
}));

interface IProps {
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
  style?: CSSProperties;
}

export function FormModal({ open, handleClose, children, style }: IProps) {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.form} style={style}>
          <span className={classes.iconClose} onClick={handleClose}>
            <CloseIcon />
          </span>
          {children}
        </div>
      </Fade>
    </Modal>
  );
}
export * from "./ConfirmModal";
