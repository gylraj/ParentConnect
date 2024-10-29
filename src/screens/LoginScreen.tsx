import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import axios from 'axios';
import tw from 'twrnc';
import { RootStackParamList } from '../navigation/RootNavigator';
import PinInput from '../components/PinInput';
import { fetchParent, fetchParents } from '../api/parentApi';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');
  const [processing, setProcessing] = useState(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePinChange = (newPin: string) => {
    setPin(newPin);
  };

  const handleLogin = async () => {
    setProcessing(true);
    try {
      console.log('phoneNumber, pin', { phoneNumber, pin });
      const parent = await fetchParent({ phoneNumber, pin });
      setProcessing(false);

      if (parent) {
        navigation.navigate('StudentList', { parentId: parent.id });
      } else {
        Alert.alert(
          'Invalid Credentials',
          'Please check your mobile number or PIN.'
        );
      }
    } catch (error) {
      setProcessing(false);
      Alert.alert('Error', 'Failed to authenticate. Please try again later.');
    }
  };

  const isDisabled = pin.length !== 4 || !phoneNumber || processing;

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
        {processing ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={tw`text-white text-lg font-bold`}>LOGIN</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
