import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const BlinkingView = ({ children, interval = 1000 }: any) => {
    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: interval / 2,
                    useNativeDriver: false
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: interval / 2,
                    useNativeDriver: false
                })
            ])
        );

        animation.start();

        // Clean up animation on unmount
        return () => {
            animation.stop();
        };
    }, [interval, opacity]);

    return <Animated.View style={{ opacity }}>{children}</Animated.View>;
};

export default BlinkingView;
