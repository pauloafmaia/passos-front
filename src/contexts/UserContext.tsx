import { createContext, useContext } from "react";

export type UserContextType = { user: { nome: string, email: string, autorizado: boolean }, setUser: (user: { nome: string, email: string, autorizado: boolean }) => void }

export const UserContext = createContext<UserContextType>({ user: { nome: '', email: '', autorizado: false }, setUser: (user) => console.warn('Sem provedor de usuario') },)