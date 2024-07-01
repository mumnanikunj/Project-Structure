import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import ComponentStyle from './ComponentStyle';

const AppGradient = () => {
  return (
    <LinearGradient 
    // colors={[ Colors.lightblack,  Colors.fonApp, Colors.fonApp]} 
    colors={["#0E0E10","#0E0E10","#0E0E10"]}    
    style={ComponentStyle.safeArea}/>
  );
};

export default AppGradient;
