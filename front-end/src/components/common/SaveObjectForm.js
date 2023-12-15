import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { InputGroup, Button } from '@blueprintjs/core';  // Import BlueprintJS components
import PageAuth from "../../common/PageAuth";
import "../../css/CreateObjectForm.css";

const SaveObjectForm = (props) => {
    const { schema, header, callBackFunction } = props;

    const [dataObject, setDataObject] = useState(schema);
    const { user: currentUser } = useSelector((state) => state.auth);

    if (!PageAuth.superUserAuth(currentUser)) {
        return <Navigate to="/login" />;
    }

    const handleInputChange = (key, value) => {
        setDataObject({ ...dataObject, [key]: value });
    };

    const saveDataObject = () => {
        callBackFunction(dataObject);
    };

    return (
        <div className="create-object-container">
            <div className="submit-form">
                {props.header && (<div className="submit-form-header">Create {header}</div>)}
                <div>
                    {
                        Object.keys(dataObject).map((key) => (
                            <div key={key} className="form-group">
                                <label htmlFor={`${key}`}>{key}</label>
                                <InputGroup
                                    type="text"
                                    id={`${key}`}
                                    value={dataObject[key]}
                                    onChange={(e) => handleInputChange(key, e.target.value)}
                                    name={`${key}`}
                                />
                            </div>
                        ))
                    }
                    <Button onClick={saveDataObject} intent="success">
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SaveObjectForm;
