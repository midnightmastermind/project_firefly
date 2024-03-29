import React, { useState } from 'react';
import {
    Button,
    FormGroup,
    InputGroup,
    Intent,
    HTMLSelect,
    Switch,
    Card,
    NonIdealState,
    Divider,
} from '@blueprintjs/core';
import DynamicForm from 'components/form/Form';

import { default_product_data } from './default_sample_form_data';
import Carousel from 'components/elements/Carousel';
import ToolBar from 'components/tools/ToolBar';

const ProductForm = ({ product, onUpdateProduct }) => {
    const [productName, setProductName] = useState(product.name || '');
    const [fields, setFields] = useState(product.fields || []);
    const [variations, setVariations] = useState(product.data || []);
    const typeOptions = ['Text', 'Number', 'Currency'];

    // Function to get field value by name
    const getFieldByName = (fieldName, valueType) => {
        const field = product.fields.find((field) => field.name === fieldName);
        return field ? field[valueType] : null;
    };

    const handleAddField = () => {
        const newField = {
            name: `Field ${fields.length + 1}`,
            type: 'text',
            label: 'New Field',
            editable: true,
            variation: false,
        };
        setFields([...fields, newField]);

        // Check if the 'variation' switch is turned on for the new field
        if (newField.variation) {
            // Add a corresponding field to each variation
            setVariations(
                variations.map((variation) => ({
                    ...variation,
                    [newField.name]: { label: newField.name, value: '' },
                }))
            );
        }
    };

    const handleAddVariation = () => {
        const newVariation = {};
        setVariations([...variations, newVariation]);
    };

    const handleDeleteField = (index) => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);

        // Remove the corresponding field from each variation
        const updatedVariations = variations.map((variation) => {
            const variationData = { ...variation };
            delete variationData[fields[index].name];
            return variationData;
        });
        setVariations(updatedVariations);
    };

    const handleDeleteVariation = (index) => {
        const updatedVariations = [...variations];
        updatedVariations.splice(index, 1);
        setVariations(updatedVariations);
    };

    const handleFieldChange = (index, key, value) => {
        const updatedFields = [...fields];
        updatedFields[index] = { ...updatedFields[index] };

        updatedFields[index][key] = value;
        setFields(updatedFields);

        // Update the corresponding field in each variation only if 'variation' switch is turned on
        if (updatedFields[index].variation) {
            const updatedVariations = variations.map((variation) => ({
                ...variation,
                [updatedFields[index].name]: { label: updatedFields[index].name, value },
            }));
            setVariations(updatedVariations);
        }
    };

    const handleVariationFormSubmit = (formData, variationIndex) => {
        const updatedVariations = [...variations];
        updatedVariations[variationIndex] = formData;
        setVariations(updatedVariations);
    };

    const canAddVariation = fields.some((field) => field.variation);
    const images = getFieldByName('images', 'value');
    const imagesArray = images.map(image => {
        return {
            type: 'image',
            src: image
        }
    });


    const image = (
        <div className="product-image"><Carousel items={imagesArray} /></div>//style={{ backgroundImage: `url(${getFieldByName('images')[0]})` }} />
    );
    return (
        <div className="product-form-container" style={{ width: '100%' }}>
            <div className="product-form-header">
                {image}
                <ToolBar />
                <div className="product-info-container">
                    <FormGroup label="Product Name">
                        <InputGroup value={productName} onChange={(e) => setProductName(e.target.value)} />
                    </FormGroup>

                    {/* <div className="fields-container">
                <h3>Fields</h3>
                <div className="fields-list">
                    {fields.map((field, index) => (
                        <div className="field" key={`field-${index}`} style={{ display: 'flex' }}>
                            <FormGroup label="Name">
                                <InputGroup
                                    value={field.name}
                                    onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label="Type">
                                <HTMLSelect
                                    value={field.type}
                                    onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
                                    options={typeOptions}
                                />
                            </FormGroup>
                            <FormGroup label="Variation">
                                <Switch
                                    checked={field.variation}
                                    onChange={(e) => handleFieldChange(index, 'variation', e.target.checked)}
                                />
                            </FormGroup>
                            <FormGroup label="Value">
                                <InputGroup
                                    type={field.type === 'Currency' ? 'text' : field.type.toLowerCase()}
                                    value={field.value}
                                    onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
                                    disabled={field.variation}
                                />
                            </FormGroup>
                            <Button icon="trash" intent={Intent.DANGER} onClick={() => handleDeleteField(index)} />
                        </div>
                    ))}
                </div>
                <Button intent={Intent.PRIMARY} onClick={handleAddField}>
                    Add Field
                </Button>
            </div> */}
                    <div className="fields-container">
                        <div className="container-header">
                            <h3>Fields</h3>
                            <ToolBar />
                            {/* <Button
                                intent={Intent.PRIMARY}
                                onClick={handleAddVariation}
                                disabled={!canAddVariation}
                            >
                                Add Field
                            </Button> */}
                        </div>
                        <div className="fields-list-headers" style={{ display: 'flex' }}>
                            <FormGroup className="name-column" label="Name" />
                            <FormGroup className="type-column" label="Type" />
                            <FormGroup className="variant-column" label="Variation?" />
                            <FormGroup className="value-column" label="Value" />
                            <Button className="trash-column" icon="trash" intent={Intent.DANGER} />
                        </div>
                        <div className="fields-list">
                            {fields.length > 0 ? (
                                fields.map((field, index) => (
                                    <div className="field" key={`field-${index}`} style={{ display: 'flex' }}>
                                        <FormGroup className="name-column">
                                            <InputGroup
                                                value={field.name}
                                                onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                                            />
                                        </FormGroup>
                                        <FormGroup className="name-column">
                                            <HTMLSelect
                                                value={field.type}
                                                onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
                                                options={typeOptions}
                                            />
                                        </FormGroup>
                                        <FormGroup className="variant-column">
                                            <Switch
                                                checked={field.variation}
                                                onChange={(e) => handleFieldChange(index, 'variation', e.target.checked)}
                                            />
                                        </FormGroup>
                                        <FormGroup className="value-column">
                                            <InputGroup
                                                type={field.type === 'Currency' ? 'text' : field.type.toLowerCase()}
                                                value={field.value}
                                                onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
                                                disabled={field.variation}
                                            />
                                        </FormGroup>
                                        <Button className="trash-column" icon="trash" intent={Intent.DANGER} onClick={() => handleDeleteField(index)} />
                                    </div>
                                ))
                            ) : (
                                <div>Add Fields</div>
                            )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="variations-container">
                <Divider />
                <div className="variations-list-container">

                    <div className="container-header">
                        <h3>Product Variations</h3>
                        <Button
                            intent={Intent.PRIMARY}
                            onClick={handleAddVariation}
                            disabled={!canAddVariation}
                        >
                            Add Variation
                        </Button>
                    </div>
                    <div className="variations-list">
                        {variations.length > 0 ? (
                            variations.map((variation, index) => (
                                <Card className="variation" key={index} style={{ display: 'flex' }}>
                                    <div className="variation-image">
                                        <Carousel settings={{showThumbs: false}} items={variation.images?.map(image => {
                                            return {
                                                type: 'image',
                                                src: image
                                            }
                                        })} />
                                    </div>
                                    {fields.filter((field) => field.variation).length > 0 && <DynamicForm
                                        schema={fields
                                            .filter((field) => field.variation)
                                            .map((field) => ({ ...field, editable: false, label: field.name }))}
                                        data={variation}
                                        title={``}
                                        soloSave={true}
                                        noSave={true}
                                        callbackFunction={(formData) => handleVariationFormSubmit(formData, index)}
                                    />}
                                    {fields.filter((field) => field.variation).length === 0 &&
                                        <h4>No Variation Fields</h4>
                                    }
                                    <Button
                                        className='delete-button'
                                        icon="trash"
                                        intent={Intent.DANGER}
                                        onClick={() => handleDeleteVariation(index)}
                                        style={{ marginLeft: '10px' }}
                                    />
                                </Card>
                            ))
                        ) : (
                            fields.filter((field) => field.variation).length === 0 ? (<NonIdealState
                                icon="info-sign"
                                title="Please Add Variation Fields"
                                description="You need to add fields with the 'Variation' switch turned on before creating variations."
                            />
                            ) : (
                                <Button
                                    intent={Intent.PRIMARY}
                                    onClick={handleAddVariation}
                                    disabled={!canAddVariation}
                                >
                                    Add Variation
                                </Button>
                            )
                        )}
                    </div>
                </div>
            </div>
            <div className="action-buttons">
                <Button
                    intent={Intent.SUCCESS}
                    onClick={() => onUpdateProduct({ name: productName, fields, data: variations })}
                >
                    Save Product
                </Button>
            </div>
        </div>
    );
};

export default ProductForm;
