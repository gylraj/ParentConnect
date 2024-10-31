import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { login } from '../../redux/slices/authSlice';
import tw from 'twrnc';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import PinInput from '../components/PinInput';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { loading, error, isAuthenticated, parentId } = useAppSelector(
    state => state.auth
  );

  const handlePinChange = (newPin: string) => {
    setPin(newPin);
  };

  const handleLogin = () => {
    Alert.alert('Login Failed', process.env.EXPO_PUBLIC_API_URL);
    return;
  };

  const isDisabled = pin.length !== 4 || !phoneNumber || loading;

  return (
    <View style={tw`flex-1 justify-center items-center px-6`}>
      {/* Mobile Number Input */}
      <View style={tw`w-full mb-6`}>
        <TextInput
          style={tw`w-full h-12 bg-gray-200 rounded-lg pl-4 text-lg`}
          placeholder="MOBILE NUMBER"
          placeholderTextColor="#A0AEC0"
          keyboardType="phone-pad"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
        />
      </View>

      {/* PIN Code Input */}
      <Text style={tw`text-gray-600 mb-2 self-start`}>PIN CODE</Text>
      <PinInput length={4} onPinChange={handlePinChange} />

      {/* Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        style={[
          tw`w-full h-12 rounded-lg justify-center items-center mt-4`,
          isDisabled ? tw`bg-gray-300` : tw`bg-blue-500`,
        ]}
        disabled={isDisabled}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={tw`text-white text-lg font-bold`}>LOGIN</Text>
        )}
      </TouchableOpacity>
      {error && <Text style={tw`text-red-500 mt-4`}>{error}</Text>}
    </View>
  );
};

export default LoginScreen;
