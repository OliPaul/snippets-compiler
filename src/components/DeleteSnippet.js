import React, {Fragment} from "react";
import Delete from "@material-ui/icons/Delete";

const DeleteSnippet = ({onClick, className}) => {
    return (
        <Fragment>
            <Delete onClick={onClick} className={className}/>
        </Fragment>
    );
}

export default DeleteSnippet;