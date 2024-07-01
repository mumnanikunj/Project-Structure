import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import _ from 'lodash'

import { AppLoader } from '../../components'
import AppGradient from '../../components/AppGradient'
import AppNoInternetSheet from '../../components/AppNoInternetSheet'
import Header from '../../components/Header'
import Strings from '../../constants/Strings'
import { StartIronSelectView } from './StartIronSelectView'
import { styles } from './styles'

const StartIron = ({ navigation, route }: any) => {

    const [loading, setLoading] = useState<boolean>(false)
    const [visibleRetry, setVisibleRetry] = useState<boolean>(false)
    
    return (
        <SafeAreaView style={styles.container}>
            <AppGradient />

            <Header isLogo={false}
                heading={Strings.select_start_iron}
                isBack onClick={() => navigation.goBack()} />

           <StartIronSelectView />

            {loading && <AppLoader />}
            <AppNoInternetSheet visible={visibleRetry} onClick={async () => {

            }}
                setVisible={setVisibleRetry} />
        </SafeAreaView>
    )
}

export default StartIron
