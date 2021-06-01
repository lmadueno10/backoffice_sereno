import { Dialog, IconButton, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { modalVideoAction } from 'redux/actions';

const DialogTitle = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}))((props: any) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const VideoDialog: React.FC = () => {
  const isOpen = useSelector((other:any) => other.modalVideoReducer.modalVideoIsOpen)
  const dispatch = useDispatch()
  return (
    <>
      <Dialog maxWidth="xl" onClose={()=>dispatch(modalVideoAction(!isOpen))} aria-labelledby="customized-dialog-title" open={isOpen}>
        <DialogTitle id="customized-dialog-title" onClose={()=>dispatch(modalVideoAction(!isOpen))}>
          Titulo de video
        </DialogTitle>
        <DialogContent dividers>
          <video controls width="640">
            <source src='http://techslides.com/demos/sample-videos/small.webm' type='video/webm' />
            <source src='http://techslides.com/demos/sample-videos/small.ogv' type='video/ogg' />
            <source src='http://techslides.com/demos/sample-videos/small.mp4' type='video/mp4' />
            <source src='http://techslides.com/demos/sample-videos/small.3gp' type='video/3gp' />
            <img src="imagen.png" alt="Video no soportado" />
            Su navegador no soporta contenido multimedia.
          </video>
          <Typography gutterBottom>
            Video enviado por Juan Ramirez &nbsp; &nbsp;
                   <span>15/04/2021 11:30 am</span>
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}

const mapStateToProps =(state:any)=>{
  return {
    modalVideoReducer:state.modalVideoReducer
  }
}

export default connect(mapStateToProps)( VideoDialog);
