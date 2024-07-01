import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

const useAppState = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      setAppState(nextAppState);
    };

    // Subscribe to app state changes
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Cleanup subscription on component unmount
    return () => {
      subscription.remove();
    };
  }, []);

  const isInBackground = appState === 'background';
  const isInBackgroundTransitioning = appState === 'inactive';

  return { appState, isInBackground, isInBackgroundTransitioning };
};

export default useAppState;
