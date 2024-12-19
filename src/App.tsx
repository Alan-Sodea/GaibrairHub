import React, { useEffect } from 'react';
import { AppRouter } from './routes';
import { globalState } from './store';
import { useHookstate } from '@hookstate/core';
import axios from 'axios';
import API_URL from './api';

function App() {
  const state = useHookstate(globalState);
  const currentUser = state.currentUser.get();
  const email = currentUser?.email;
  const password = currentUser?.password;
  useEffect(() => {
    (async () => {
      try {
        const elt = await axios.get(`${API_URL}/users/suggestions`,
          {
            params: {
              email,
              password,
            }
          }
        );
        state.users.set(elt.data)
        // console.log({ elt: elt.data })
      } catch (error) {
        console.error("Error : suggestions's loading aborted...\n", error.message)
      }
    })();
  }, currentUser)

  return <AppRouter />;
}

export default App;