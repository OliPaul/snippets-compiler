import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {createProject, getProject} from "../services/Project";
import useToken from "./useToken";
import {useSetRecoilState} from "recoil";
import {ProjectAtom} from "../atoms/ProjectAtom";

const NewProjectDialog = ({open, handleClose}) => {

    const setProject = useSetRecoilState(ProjectAtom);
    const [projectName, setProjectName] = useState("");
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const {token} = useToken();

    const handleProjectNameChange = ({target: {value}}) => {
        resetState()
        setProjectName(value);
    }

    const handleCreateClick = async () => {

        if (projectName === "") {
            setError(true);
            setErrorMsg("Project name is required")
            return;
        }

        const response = await createProject(token, projectName, "C");

        if (response.error) {
            setErrorMsg("Something went wrong");
            return
        }

        resetState();
        setProjectName("");
        handleClose();

        //Get project and set it in project state
        const project = await getProject(token, null, response.location);
        setProject(JSON.stringify(project));
    }

    const resetState = () => {
        setErrorMsg("");
        setError(false);
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New project</DialogTitle>
            <DialogContent>
                <TextField
                    error={error}
                    value={projectName}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Project name"
                    type="text"
                    fullWidth
                    onChange={handleProjectNameChange}
                />
                {
                    errorMsg != "" &&
                    <p>{errorMsg}</p>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleCreateClick} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default NewProjectDialog;