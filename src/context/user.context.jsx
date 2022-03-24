import { createContext, useState } from 'react';

//As the actual value you want to access
export const UserContext = createContext({
   currentUser: null,
   setCurrentUser: () => null,
});

//As the actual component
export const UserProvider = ({ children }) => {
   const [currentUser, setCurrentUser] = useState(null);
   const value = { currentUser, setCurrentUser };

   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
