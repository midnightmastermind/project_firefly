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
} from '@blueprintjs/core';
import DynamicForm from 'components/form/Form';

const ProductForm = ({ productData, onUpdateProduct }) => {
    const [productName, setProductName] = useState(productData.name || '');
    const [fields, setFields] = useState(productData.fields || []);
    const [variations, setVariations] = useState(productData.variations || []);
    const typeOptions = ['Text', 'Number', 'Currency'];

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
                    data: {
                        ...variation.data,
                        [newField.name]: { label: newField.name, value: '' },
                    },
                }))
            );
        }
    };

    const handleAddVariation = () => {
        const newVariation = { data: {} };
        setVariations([...variations, newVariation]);
    };

    const handleDeleteField = (index) => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);

        // Remove the corresponding field from each variation
        const updatedVariations = variations.map((variation) => {
            const variationData = { ...variation.data };
            delete variationData[fields[index].name];
            return {
                ...variation,
                data: variationData,
            };
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
        updatedFields[index][key] = value;
        setFields(updatedFields);

        // Update the corresponding field in each variation only if 'variation' switch is turned on
        if (updatedFields[index].variation) {
            const updatedVariations = variations.map((variation) => ({
                ...variation,
                data: {
                    ...variation.data,
                    [updatedFields[index].name]: { label: updatedFields[index].name, value },
                },
            }));
            setVariations(updatedVariations);
        }
    };

    const handleVariationFormSubmit = (formData, variationIndex) => {
        const updatedVariations = [...variations];
        updatedVariations[variationIndex].data = formData;
        setVariations(updatedVariations);
    };

    const canAddVariation = fields.some((field) => field.variation);

    return (
        <div style={{ width: '100%' }}>
            <h2>Product Form</h2>
            <div>
                <FormGroup label="Product Name">
                    <InputGroup value={productName} onChange={(e) => setProductName(e.target.value)} />
                </FormGroup>
            </div>
            <div>
                <h3>Fields</h3>
                {fields.map((field, index) => (
                    <div key={`field-${index}`} style={{ display: 'flex', marginBottom: '10px' }}>
                        <FormGroup label="Name" style={{ flex: 1, marginRight: '10px' }}>
                            <InputGroup
                                value={field.name}
                                onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup label="Type" style={{ flex: 1, marginRight: '10px' }}>
                            <HTMLSelect
                                value={field.type}
                                onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
                                options={typeOptions}
                            />
                        </FormGroup>
                        <FormGroup label="Variation" style={{ flex: 1, marginRight: '10px' }}>
                            <Switch
                                checked={field.variation}
                                onChange={(e) => handleFieldChange(index, 'variation', e.target.checked)}
                            />
                        </FormGroup>
                        <FormGroup label="Value" style={{ flex: 1 }}>
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
                <Button intent={Intent.PRIMARY} onClick={handleAddField}>
                    Add Field
                </Button>
            </div>
            <div className="variations">
                <h3>Variations</h3>
                {variations.length > 0 ? (
                    variations.map((variation, index) => (
                        <Card key={index} style={{ display: 'flex', marginBottom: '10px' }}>
                            { fields.filter((field) => field.variation).length > 0 && <DynamicForm
                                schema={fields
                                    .filter((field) => field.variation)
                                    .map((field) => ({ ...field, editable: false, label: field.name }))}
                                data={variation.data}
                                title={``}
                                soloSave={true}
                                noSave={true}
                                callbackFunction={(formData) => handleVariationFormSubmit(formData, index)}
                            />}
                            { fields.filter((field) => field.variation).length == 0 && 
                                <h4>No Variation Fields</h4>
                            }
                            <Button
                                icon="trash"
                                intent={Intent.DANGER}
                                onClick={() => handleDeleteVariation(index)}
                                style={{ marginLeft: '10px' }}
                            />
                        </Card>
                    ))
                ) : (
                    fields.filter((field) => field.variation).length == 0 ? ( <NonIdealState
                        icon="info-sign"
                        title="Please Add Variation Fields"
                        description="You need to add fields with the 'Variation' switch turned on before creating variations."
                    />
                    ) : (
                        <h4>Add Variations</h4>
                    )
                )}
                <Button
                    intent={Intent.PRIMARY}
                    onClick={handleAddVariation}
                    disabled={!canAddVariation}
                >
                    Add Variation
                </Button>
            </div>
            <Button
                intent={Intent.SUCCESS}
                onClick={() => onUpdateProduct({ name: productName, fields, variations })}
            >
                Save Product
            </Button>
        </div>
    );
};

export default ProductForm;
