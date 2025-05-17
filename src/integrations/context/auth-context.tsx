import { createContext, useContext, useEffect, useReducer } from 'react'
import type { ReactNode } from '@tanstack/react-router'
import type { Me } from '@/types/user'
import { getMe } from '@/api/auth'

type AutState = {
  is_authenticated: boolean
  setAuth: (state: boolean) => void
  me: Me | null
  setMe: (me: Me | null) => void
  is_loading: boolean
  setLoading: (state: boolean) => void
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
  | {
      type: 'SET_LOADING'
      payload: boolean
    }

const initialState: AutState = {
  is_authenticated: false,
  setAuth: () => {},
  me: null,
  setMe: () => {},
  is_loading: true,
  setLoading: () => {},
}

const AuthContext = createContext<AutState>(initialState)

const authReducer = (state: AutState, action: AuthAction): AutState => {
  switch (action.type) {
    case 'SET_AUTHENTICATED':
      return { ...state, is_authenticated: action.payload }
    case 'SET_ME':
      return { ...state, me: action.payload }
    case 'SET_LOADING':
      return { ...state, is_loading: action.payload }
    default:
      return state
  }
}

const useAuthReducer = (): AutState => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const setAuth = (payload: boolean) => {
    dispatch({ type: 'SET_AUTHENTICATED', payload })
  }

  const setMe = (payload: Me | null) => {
    dispatch({ type: 'SET_ME', payload })
  }

  const setLoading = (payload: boolean) => {
    dispatch({ type: 'SET_LOADING', payload })
  }

  return {
    ...state,
    setAuth,
    setMe,
    setLoading,
  }
}

export const useAuthContext = () => {
  const state = useContext(AuthContext)
  return state
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const state = useAuthReducer()

  useEffect(() => {
    getMe()
      .then((me) => {
        state.setAuth(true)
        state.setMe(me)
        state.setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        state.setAuth(false)
        state.setMe(null)
        state.setLoading(false)
      })
  }, [])

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}
