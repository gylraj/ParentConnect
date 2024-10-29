import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  useRoute,
  RouteProp,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';
import tw from 'twrnc';
import { fetchStudents } from '../api/parentApi';
import { RootStackParamList } from '../navigation/RootNavigator';
import { Student } from '../types/Student';

type RouteParams = {
  StudentList: { parentId: string };
};

const StudentListScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'StudentList'>>();
  const { parentId } = route.params;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await fetchStudents(parentId);
        setStudents(data);
      } catch (error) {
        console.error('Error loading students:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, [parentId]);

  const handleStudentPress = (studentId: string) => {
    navigation.navigate('StudentDetail', { studentId });
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <Text style={tw`text-2xl font-bold text-center text-gray-800 py-4`}>
        Students
      </Text>
      <FlatList
        data={students}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleStudentPress(item.id)}>
            <View style={tw`bg-white py-4 px-6 border-b border-gray-200`}>
              <Text style={tw`text-lg text-gray-900 font-medium`}>
                {item.first_name} {item.last_name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={tw`px-4 pb-4`}
      />
    </View>
  );
};

export default StudentListScreen;
