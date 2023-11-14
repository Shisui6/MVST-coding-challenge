// Import necessary dependencies
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './configureStore'

// Create a custom hook named useAppDispatch that uses useDispatch hook from 'react-redux'
// This hook will be used to dispatch actions in the application
export const useAppDispatch: () => AppDispatch = useDispatch

// Create a custom hook named useAppSelector that uses useSelector hook from 'react-redux'
// This hook will be used to select data from the Redux store
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector