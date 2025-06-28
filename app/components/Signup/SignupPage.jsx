import axios from 'axios';
import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import * as Yup from 'yup';

// Enhanced validation schema
const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters'),
    email: Yup.string()
        .required('Email is required')
        .email('Invalid email format'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[0-9]/, 'Password requires at least one number')
        .matches(/[a-z]/, 'Password requires at least one lowercase letter')
        .matches(/[A-Z]/, 'Password requires at least one uppercase letter')
        .matches(/[^a-zA-Z0-9]/, 'Password requires at least one special character'),
});

export default function SignupPage({ navigation }) {
    return (
        <View style={styles.container}>
            <Text variant="headlineMedium" style={styles.title}>Create Account</Text>

            <Formik
                initialValues={{ name: '', email: '', password: '' }}
                validationSchema={SignupSchema}
                validateOnBlur={true}
                validateOnChange={true}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        await axios.post(
                            'https://67aeede79e85da2f020ed455.mockapi.io/usedsignup/data',
                            values
                        );
                        alert('Signup Successful');
                        navigation.navigate('Login');
                    } catch (error) {
                        console.error(error);
                        alert('Signup Failed. Please try again.');
                    } finally {
                        setSubmitting(false);
                    }
                }}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting, isValid, validateForm }) => (
                    <View style={styles.form}>
                        <TextInput
                            label="Name"
                            value={values.name}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            mode="outlined"
                            style={styles.input}
                            error={touched.name && !!errors.name}
                        />
                        {touched.name && errors.name && (
                            <Text style={styles.errorText}>{errors.name}</Text>
                        )}

                        <TextInput
                            label="Email"
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            mode="outlined"
                            style={styles.input}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            error={touched.email && !!errors.email}
                        />
                        {touched.email && errors.email && (
                            <Text style={styles.errorText}>{errors.email}</Text>
                        )}

                        <TextInput
                            label="Password"
                            value={values.password}
                            secureTextEntry
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            mode="outlined"
                            style={styles.input}
                            error={touched.password && !!errors.password}
                        />
                        {touched.password && errors.password && (
                            <Text style={styles.errorText}>{errors.password}</Text>
                        )}

                        <Button
                            mode="contained"
                            onPress={() => {
                                // Validate form before submission
                                validateForm().then(() => {
                                    if (isValid) {
                                        handleSubmit();
                                    }
                                });
                            }}
                            loading={isSubmitting}
                            disabled={isSubmitting}
                            style={styles.button}
                        >
                            Sign Up
                        </Button>

                        <Button
                            mode="text"
                            onPress={() => navigation.navigate('Login')}
                            style={styles.linkButton}
                            labelStyle={styles.linkText}
                        >
                            Already have an account? Login
                        </Button>
                    </View>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    form: {
        marginTop: 20,
    },
    title: {
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    input: {
        marginBottom: 5,
        backgroundColor: '#fff',
    },
    button: {
        marginTop: 10,
        paddingVertical: 5,
    },
    linkButton: {
        marginTop: 20,
    },
    linkText: {
        textDecorationLine: 'underline',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
        marginLeft: 5,
    }
});