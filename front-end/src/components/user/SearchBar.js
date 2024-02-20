/**
 * This is a SearchBar component.
 * It takes in props and uses the useState and useEffect hooks.
 * It has a searchText state that is updated when the input is changed.
 * It also has searchData and searchFields states that are set when the component is first rendered.
 * When the searchText state is updated,
 */
import React, { useState, useEffect } from 'react';
import { InputGroup } from '@blueprintjs/core';

const SearchBar = (props) => {
    const [searchText, setSearchText] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [searchFields, setSearchFields] = useState([]);

    useEffect(() => {

        if (props && props.data && props.fields && props.callBackFunction) {
            setSearchData(props.data);
            setSearchFields(props.fields);
        }
    }, [props]);

    useEffect(() => {
        const timeOutId = setTimeout(() => searchAllData(searchText), 100);
        return () => clearTimeout(timeOutId);
      }, [searchText]);

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
        searchAllData(e.target.value);
    };

    const searchAllData = async (searchTerm) => {
        if (searchTerm && searchData && searchFields) {
            let results = [];
            results = searchData.filter((data_item) => {
                let searchCheck = false;
                searchFields.forEach((field_name) => {
                    if (data_item[field_name]) {
                        let field_data = data_item[field_name].toLowerCase();
                        if (!searchCheck && field_data.includes(searchTerm.toLowerCase())) {
                            searchCheck = true;
                        }
                    }
                });
                if (searchCheck) {
                    return data_item;
                }
                
            });

            if (props.callBackFunction) {
                if (results) {
                    props.callBackFunction(results);
                } else if (searchData) {
                    props.callBackFunction(searchData);
                }
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="search-bar">
            <InputGroup
                    placeholder="Search..."
                    type="search"
                    onChange={handleInputChange}
                />
        </div >
    );
}

export default SearchBar;
