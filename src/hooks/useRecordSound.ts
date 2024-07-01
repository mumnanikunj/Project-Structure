import { useEffect,useState } from 'react';
import Sound from 'react-native-sound';

const useRecordSound = () => {
  const [sound, setSound] = useState(null);
  const [currentSound, setCurrentSound] = useState(null);

  useEffect(() => {
    return () => {
      // Cleanup: Stop and release the sound when the component is unmounted
      if (currentSound) {
        currentSound.stop();
        setCurrentSound(null);
      }
    };
  }, [currentSound]);

  const playSound = (newSound) => {
    // Stop and release the previous sound if it exists
    if (currentSound) {
      currentSound.stop();
      setCurrentSound(null);
    }

    // Create a new sound
    const soundObject = new Sound(newSound, (error) => {
      if (error) {
        console.error('Failed to load sound', error);
        return;
      }

      // Store the current sound for future reference
      setCurrentSound(soundObject);
      setSound(newSound);

      // Play the sound
      soundObject.play((success) => {
        if (success) {
          // Stop the sound after it finishes playing
          soundObject.stop();
          setCurrentSound(null);
          setSound(null);
        } else {
          console.error('Failed to play sound');
        }
      });
    });
  };

  return { playSound, currentSound };
};

export default useRecordSound;
