// src/components/CustomForm.tsx
import { Formik, FormikProps } from 'formik';
import { toString } from 'lodash';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { moderateVerticalScale } from 'react-native-size-matters';
import CustomImagePicker from './CustomImagePicker';
import { CustomTextInput } from './CustomTextInput';
import Dropdown from './Dropdown';
import GradientButton from './GradientButton';

interface Field {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'image' | 'select' | 'checkbox' | 'numeric';
  options?: { label: string; value: any }[];
  initialValue?: any;
  isEditable?:boolean
}

interface CustomFormProps {
  fields: Field[];
  validationSchema: any;
  onSubmit: (values: { [key: string]: any }) => void;
  key?: number;
  onReset?: () => void;
  onInputValueChange?: (field: string, value: any, resetField: (field: string) => void) => void;
}

const CustomForm: React.FC<CustomFormProps> = ({ fields, validationSchema, onSubmit, key, onReset, onInputValueChange }) => {
  const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = field.initialValue || '';
    return acc;
  }, {} as { [key: string]: any });

  const sumPrices = (allItems:object[],type:string) => {
    return allItems.reduce((total:any, item:any) => {
      if(type=='price'){
        return total + Number(item.price);
      }else{
        return total + Number(item.cashBack);
      }
    }, 0);
  }
  const onInputChange = (fieldName: string, value: any, setFieldValue: any, resetField: (field: string) => void) => {
    if (onInputValueChange) {
      onInputValueChange(fieldName, value, resetField);
    }
    if(fieldName == 'productName'){
      let priceValue = sumPrices(value,'price')
      let cashBackValue = sumPrices(value,'cashback')
      setFieldValue('price',!!priceValue ? toString(priceValue):'')
      setFieldValue('cashback',!!cashBackValue ? toString(cashBackValue):'')
    }else if(fieldName=='brandName'){
      setFieldValue('price','')
      setFieldValue('cashback','')
    }
    setFieldValue(fieldName, value);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      key={key}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }: FormikProps<{ [key: string]: any }>) => (
        <View style={styles.container}>
          {fields.map((field) => {
            switch (field.type) {
              case 'text':
              case 'email':
              case 'password':
              case 'numeric':
                return (
                  <View key={field.name}>
                    <CustomTextInput
                      maxHeight={moderateVerticalScale(40)}
                      label={field.label}
                      placeholder={field.label}
                      value={values[field.name]}
                      editable={field?.isEditable}
                      onChangeText={(value) => {
                        handleChange(field.name)(value);
                        onInputChange(field.name, value, setFieldValue, (resetField) => setFieldValue(resetField, ''));
                      }}
                      keyboardType={field.type === 'numeric' ? field.type : 'default'}
                      onBlur={handleBlur(field.name)}
                      secureTextEntry={field.type === 'password'}
                    />
                    {touched[field.name] && errors[field.name] ? (
                      <Text style={styles.error}>{errors[field.name] as any}</Text>
                    ) : null}
                  </View>
                );
              case 'image':
                return (
                  <View key={field.name}>
                    <CustomImagePicker
                      label={field.label}
                      value={values[field.name]}
                      onChange={(image) => onInputChange(field.name, image, setFieldValue, (resetField) => setFieldValue(resetField, ''))}
                    />
                    {touched[field.name] && errors[field.name] ? (
                      <Text style={styles.error}>{errors[field.name] as any}</Text>
                    ) : null}
                  </View>
                );
              case 'select':
                return (
                  <View key={field.name}>
                    <Dropdown
                      title={field.label}
                      options={field.options!}
                      value={values[field.name]}
                      multiSelect={field?.name =='productName' ? true : false}
                      onSelect={(value) => onInputChange(field.name, value, setFieldValue, (resetField) => setFieldValue(resetField, ''))}
                    />
                    {touched[field.name] && errors[field.name] ? (
                      <Text style={styles.error}>{errors[field.name] as any}</Text>
                    ) : null}
                  </View>
                );
              default:
                return null;
            }
          })}
          <GradientButton onPress={handleSubmit as any} btnText={'Submit'} />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 20,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomForm;
