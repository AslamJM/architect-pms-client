import { createContext, useContext, useReducer } from 'react'
import type { ReactNode } from '@tanstack/react-router'
import type { Me } from '@/types/user'

type AutState = {
  is_authenticated: boolean
  setAuth: (state: boolean) => void
  me: Me | null
  setMe: (me: Me | null) => void
}

type AuthAction =
  | {
      type: 'SET_AUTHENTICATED'
      payload: boolean
    }
  | {
      type: 'SET_ME'
      payload: Me | null
    }

const initialState: AutState = {
  is_authenticated: false,
  setAuth: () => {},
  me: null,
  setMe: () => {},
}

const AuthContext = createContext<AutState>(initialState)

const authReducer = (state: AutState, action: AuthAction): AutState => {
  switch (action.type) {
    case 'SET_AUTHENTICATED':
      return { ...state, is_authenticated: action.payload }
    case 'SET_ME':
      return { ...state, me: action.payload }
    default:
      return state
  }
}

const useAuthReducer = () => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const setAuth = (payload: boolean) => {
    dispatch({ type: 'SET_AUTHENTICATED', payload })
  }

  const setMe = (payload: Me | null) => {
    dispatch({ type: 'SET_ME', payload })
  }

  return {
    ...state,
    setAuth,
    setMe,
  }
}

export const useAuthContext = () => {
  const state = useContext(AuthContext)
  return state
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const state = useAuthReducer()

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}
