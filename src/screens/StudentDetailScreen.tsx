import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import tw from 'twrnc';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useAppSelector } from '../../redux/hooks';

type StudentDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'StudentDetail'
>;

const StudentDetailScreen = () => {
  const route = useRoute<StudentDetailScreenRouteProp>();
  const { studentId } = route.params;

  const { students, loading, error } = useAppSelector(state => state.student);

  const student = useMemo(
    () => students.find(item => item.id == studentId),
    [studentId]
  );

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={tw`mt-4 text-lg text-gray-700`}>
          Loading student details...
        </Text>
      </View>
    );
  }

  if (!student) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-lg text-red-500`}>
          Failed to load student data. {error}
        </Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 p-6 bg-gray-100`}>
      <View style={tw`bg-white rounded-lg shadow-md p-6`}>
        <Text style={tw`text-2xl font-bold text-gray-800 mb-4`}>
          {student.first_name} {student.last_name}
        </Text>
        <Text style={tw`text-lg text-gray-600 mb-2`}>
          Date of Birth:{' '}
          <Text style={tw`text-gray-800`}>
            {new Date(student.date_of_birth).toLocaleDateString()}
          </Text>
        </Text>
        <Text style={tw`text-lg text-gray-600`}>
          Grade Level:{' '}
          <Text style={tw`text-gray-800`}>{student.grade_level}</Text>
        </Text>
      </View>
    </View>
  );
};

export default StudentDetailScreen;
