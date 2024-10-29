// src/components/PinInput.tsx

import React, { useState, useRef } from 'react';
import { View, TextInput } from 'react-native';
import tw from 'twrnc';

interface PinInputProps {
  length: number; // Number of digits in the PIN
  onPinChange: (pin: string) => void; // Callback to return the complete PIN
}

const PinInput: React.FC<PinInputProps> = ({ length, onPinChange }) => {
  const [pin, setPin] = useState<string[]>(Array(length).fill(''));
  const pinRefs = Array.from({ length }, () => useRef<TextInput>(null));

  const handlePinChange = (value: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    onPinChange(newPin.join('')); // Pass the PIN as a single string to the parent

    // Move to the next input if a value is entered and it's not the last input
    if (value && index < length - 1) {
      pinRefs[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === 'Backspace' && pin[index] === '') {
      if (index > 0) {
        pinRefs[index - 1].current?.focus(); // Move to the previous input
        const newPin = [...pin];
        newPin[index - 1] = ''; // Clear the previous input
        setPin(newPin);
        onPinChange(newPin.join(''));
      }
    }
  };

  return (
    <View style={tw`flex-row justify-between w-full`}>
      {pin.map((value, index) => (
        <TextInput
          key={index}
          ref={pinRefs[index]}
          style={tw`w-14 h-14 bg-gray-200 rounded-lg text-center text-lg`}
          keyboardType="number-pad"
          maxLength={1}
          onChangeText={(value) => handlePinChange(value, index)}
          onKeyPress={(event) => handleKeyPress(event, index)}
          value={value}
        />
      ))}
    </View>
  );
};

export default PinInput;
