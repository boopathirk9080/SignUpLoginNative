import axios from 'axios';
import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  password: Yup.string()
    .required('Password is required')
});

export default function LoginPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Login</Text>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const res = await axios.get(
              `https://67aeede79e85da2f020ed455.mockapi.io/usedsignup/data?email=${values.email}`
            );

            // if (res.data.length > 0 && res.data[0].password === values.password) {
            //   alert('Login Successful');
            //   navigation.navigate('Landing'); // Redirect to home page
            // } else {
            //   alert('Invalid Credentials');
            // }
            if (res.data.length > 0 && res.data[0].password === values.password) {
              alert('Login Successful');
              navigation.navigate('Landing', { userName: res.data[0].name }); // Pass userName as prop
            } else {
              alert('Invalid Credentials');
            }
          } catch (error) {
            console.error(error);
            alert('Login Failed. Please try again.');
          } finally {
            setSubmitting(false);
          }
        }}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting, isValid, validateForm }) => (
          <View style={styles.form}>
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
              Login
            </Button>

            <Button
              mode="text"
              onPress={() => navigation.navigate('Signup')} // Fixed signup navigation
              style={styles.linkButton}
              labelStyle={styles.linkText}
            > Don&apos;t have an account? Sign Up
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