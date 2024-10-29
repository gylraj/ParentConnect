// redux/slices/studentSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStudentList } from '../../src/api/parentApi';

interface Student {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  grade_level: string;
}

interface StudentState {
  students: Student[];
  loading: boolean;
  error: string | null;
}

const initialState: StudentState = {
  students: [],
  loading: false,
  error: null,
};

// Async thunk for fetching students
export const fetchStudents = createAsyncThunk(
  'student/fetchStudents',
  async (parentId: string, { rejectWithValue }) => {
    try {
      const students = await fetchStudentList(parentId);
      return students;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchStudents.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default studentSlice.reducer;
