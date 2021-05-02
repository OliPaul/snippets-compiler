import React, {Fragment} from "react";
import Add from "@material-ui/icons/Add";
import Run from '@material-ui/icons/AccessTime';
import {useRecoilState} from "recoil";
import {CodeAtom} from "../atoms/CodeAtom";

const Toolbar = () => {

    const [code, setCode] = useRecoilState(CodeAtom);
    const counterBlock = code.length;

    const handleAddBlock = () => {
        setCode((oldCode) => [
            ...oldCode,
            {
                id: counterBlock + 1,
                codeValue: ""
            }
        ]);
    }

    return (
        <Fragment>
            <div className={'toolbar'}>
                <div className={'add'} onClick={handleAddBlock}>
                    <Add className={'add-button'}/>
                    <span>new snippet</span>
                </div>
                <div className={'run'} onClick={handleAddBlock}>
                    <Run className={'run-button'}/>
                    <span>run</span>
                </div>

            </div>
            <style jsx>{`
            
                .toolbar {
                    display: flex;
                    justify-content: space-between;
                    width: 95%;
                }
                
                .add, .run {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                }
                
                .run {
                    font-style: italic;
                }
                
                .add-button, .run-button {
                    color: grey;
                    font-size: 25px;
                }
            `}</style>
        </Fragment>
    )
}

export default Toolbar;

