import React, { useEffect } from 'react';
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
import { RootStackParamList } from '../navigation/RootNavigator';
import { RootState } from '../../redux/store';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchStudents } from '../../redux/slices/studentSlice';

type RouteParams = {
  StudentList: { parentId: string };
};

const StudentListScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'StudentList'>>();
  const { parentId } = route.params;
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { students, loading, error } = useAppSelector(
    (state: RootState) => state.student
  );

  useEffect(() => {
    dispatch(fetchStudents(parentId));
  }, [dispatch, parentId]);

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
      {error && <Text style={tw`text-red-500 mt-4`}>{error}</Text>}
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
        contentContainerStyle={tw`px-4 pb-4 py-4`}
      />
    </View>
  );
};

export default StudentListScreen;
