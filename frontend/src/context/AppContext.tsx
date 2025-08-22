import React, { createContext, useContext, useState } from 'react';

type Gender = 'male' | 'female';

type State = {
  userId?: number;
  name?: string;
  email?: string;
  phone?: string;
  receiver_name?: string;
  gender?: Gender;
  genre?: string;
  lyrics?: string;
  voice?: 'Male' | 'Female'; // ✅ Added voice property
  setState: React.Dispatch<React.SetStateAction<any>>;
};

const Ctx = createContext<State | null>(null);

export const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<any>({
    voice: 'Female', // ✅ Default voice
  });

  return <Ctx.Provider value={{ ...state, setState }}>{children}</Ctx.Provider>;
};

export const useApp = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error('useApp must be used within AppProvider');
  return v;
};
