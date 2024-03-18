import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {MutableRefObject, useCallback, useMemo, useRef} from 'react';
import DismissKeyboardView from '@/components/layout/dismiss-keyboard-view';
import {SignInScreenProps} from '@/navigation/types';
import {RouteNames} from '@/navigation/route-names';
import {useSignInUser} from '@/api/auth/post-sign-in';
import {signInValidation} from '@/utils/validate';
import useForm from '@/hooks/useForm';
import {ObjType} from '@/types';
import {useGetMyInfo} from '@/api/auth';
import {saveRefreshToken} from '@/utils/auth';
import {useUserStore} from '@/stores/useUserStore';

const SignInScreen: React.FC<SignInScreenProps> = ({navigation}) => {
  const setUser = useUserStore(state => state.setUser);
  const initialState = useMemo(
    () => ({
      email: '',
      password: '',
    }),
    [],
  );
  const emailRef: MutableRefObject<TextInput | null> = useRef(null);
  const passwordRef: MutableRefObject<TextInput | null> = useRef(null);

  const {
    mutate: signInUser,
    isPending,
    error,
  } = useSignInUser({
    onSuccess: async data => {
      const {refreshToken, ...rest} = data;
      saveRefreshToken(refreshToken);
      setUser(rest);
    },
    onError: signInError => {
      console.error('SignIn Error: ', signInError);
      console.log(signInError);
    },
  });

  const handleSubmit = useCallback(
    (values: ObjType) => {
      signInUser(values);
    },
    [signInUser],
  );

  const {values, errors, onChange, onSubmit} = useForm({
    initialValues: initialState,
    handleSubmit,
    validation: signInValidation,
  });

  const toSignUp: () => void = useCallback((): void => {
    navigation.navigate(RouteNames.signUp);
  }, [navigation]);

  const canGoNext: boolean = Object.values(values).every(value => value !== '');

  return (
    <DismissKeyboardView>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          placeholder="이메일을 입력해주세요."
          value={values.email}
          onChangeText={value => onChange('email', value)}
          style={styles.textInput}
          importantForAutofill="yes"
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
          blurOnSubmit={false}
          ref={emailRef}
          clearButtonMode="while-editing"
          keyboardType="email-address"
        />
        <Text style={styles.errorText}>{errors.email || ''}</Text>
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.textInput}
          placeholder="비밀번호를 입력해주세요."
          value={values.password}
          onChangeText={value => onChange('password', value)}
          autoComplete="password"
          secureTextEntry
          ref={passwordRef}
          onSubmitEditing={onSubmit}
          clearButtonMode="while-editing"
        />
        <Text>{errors.password || ''}</Text>
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          style={
            !canGoNext
              ? styles.loginButton
              : StyleSheet.compose(styles.loginButton, styles.loginButtonActive)
          }
          onPress={onSubmit}
          disabled={!canGoNext}>
          {isPending ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.loginButtonText}>로그인</Text>
          )}
        </Pressable>
        <Pressable onPress={toSignUp}>
          <Text>회원가입하기</Text>
        </Pressable>
      </View>
    </DismissKeyboardView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  inputWrapper: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttonZone: {
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 5,
    width: 90,
    height: 40,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
  },
});
