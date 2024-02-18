import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {MutableRefObject, useCallback, useRef, useState} from 'react';
import DismissKeyboardView from '@/components/layout/dismiss-keyboard-view';
import {SignInScreenProps} from '@/navigation/types';
import {RouteNames} from '@/navigation/route-names';
import {useSignInUser} from '@/api/auth/post-sign-in';
import {validateEmail} from '@/utils/validate';

type Props = SignInScreenProps;

interface SignInData {
  email: string;
  password: string;
}

const SignInScreen: React.FC<Props> = ({navigation}) => {
  const [signInData, setSignInData] = useState<SignInData>({
    email: '',
    password: '',
  });
  const emailRef: MutableRefObject<TextInput | null> = useRef(null);
  const passwordRef: MutableRefObject<TextInput | null> = useRef(null);

  const {
    mutate: signInUser,
    isPending,
    error,
  } = useSignInUser({
    onSuccess: data => {
      console.log('SignIn Successful', data);
    },
    onError: error => {
      console.error('SignIn Error: ', error);
    },
  });

  const handleChangeText = useCallback((name: string, text: string) => {
    setSignInData(prev => ({
      ...prev,
      [name]: text.trim(),
    }));
  }, []);

  const handleSubmit: () => void = useCallback((): void => {
    const {email, password} = signInData;
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    if (!validateEmail(email)) {
      return Alert.alert('알림', '올바른 이메일 주소가 아닙니다.');
    }
    signInUser(signInData);
    // Alert.alert('알림', '로그인 되었습니다.');
  }, [signInData, signInUser]);

  const toSignUp: () => void = useCallback((): void => {
    navigation.navigate(RouteNames.signUp);
  }, [navigation]);

  const canGoNext: boolean = Object.values(signInData).every(
    value => value !== '',
  );

  return (
    <DismissKeyboardView>
      <View style={style.inputWrapper}>
        <Text style={style.label}>이메일</Text>
        <TextInput
          placeholder="이메일을 입력해주세요."
          value={signInData.email}
          onChangeText={text => handleChangeText('email', text)}
          style={style.textInput}
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
      </View>
      <View style={style.inputWrapper}>
        <Text style={style.label}>비밀번호</Text>
        <TextInput
          style={style.textInput}
          placeholder="비밀번호를 입력해주세요."
          value={signInData.password}
          onChangeText={text => handleChangeText('password', text)}
          autoComplete="password"
          secureTextEntry
          ref={passwordRef}
          onSubmitEditing={handleSubmit}
          clearButtonMode="while-editing"
        />
      </View>
      <View style={style.buttonZone}>
        <Pressable
          style={
            !canGoNext
              ? style.loginButton
              : StyleSheet.compose(style.loginButton, style.loginButtonActive)
          }
          onPress={handleSubmit}
          disabled={!canGoNext}>
          <Text style={style.loginButtonText}>로그인</Text>
        </Pressable>
        <Pressable onPress={toSignUp}>
          <Text>회원가입하기</Text>
        </Pressable>
      </View>
    </DismissKeyboardView>
  );
};

export default SignInScreen;

const style = StyleSheet.create({
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
