import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/types';
import DismissKeyboardView from '@/components/Layout/DismissKeyboardView';

type SignInProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({navigation}: SignInProps): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const handleChangeEmail = useCallback((text: string) => {
    setEmail(text.trim());
  }, []);

  const handleChangePassword = useCallback((text: string) => {
    setPassword(text.trim());
  }, []);

  const handleSubmit = useCallback(() => {
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    Alert.alert('알림', '로그인 되었습니다.');
  }, [email, password]);

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const canGoNext = email && password;

  return (
    <DismissKeyboardView>
      <View style={style.inputWrapper}>
        <Text style={style.label}>이메일</Text>
        <TextInput
          placeholder="이메일을 입력해주세요."
          value={email}
          onChangeText={handleChangeEmail}
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
          value={password}
          onChangeText={handleChangePassword}
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
}

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

export default SignIn;
