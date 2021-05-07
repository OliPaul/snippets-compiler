import React, {Fragment} from "react";
import Play from '@material-ui/icons/PlayArrow';

const RunSnippet = ({className, onClick}) => {

    return (
        <Fragment>
            <Play onClick={onClick} className={className}/>
        </Fragment>
    );
}

export default RunSnippet;