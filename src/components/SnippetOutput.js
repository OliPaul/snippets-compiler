import React, { Fragment } from "react";

const SnippetOutput = ({ output, className }) => {
    return (
        <Fragment>
            <div className={className}>
                { output }
            </div>

            <style jsx>{`
                .${className} {
                    background-color: #f5f5f5;
                    height: 55px;
                    font-size: 16px;
                    width: 480px;
                    padding: 10px;
                    border-radius: 0 0 5px 5px;
                }
            
            `}</style>
        </Fragment>
    );
}

export default SnippetOutput;