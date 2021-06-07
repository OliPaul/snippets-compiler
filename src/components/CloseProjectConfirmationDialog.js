import React from "react";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

const CloseProjectConfirmationDialog = ({open, handleClose}) => {
    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
        >
            <DialogTitle id="alert-dialog-title">Warning !</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    You have a project already open in the workspace.
                    Your progress will be lost!
                    Please compile it to save your progress before exiting.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Continue anyway
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CloseProjectConfirmationDialog;