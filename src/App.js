import React, {useState, useEffect} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {changeIcon, getIcon, resetIcon} from 'react-native-change-icon';
import RNRestart from 'react-native-restart';

import logo1 from './assets/images/logo1.png';
import logo2 from './assets/images/logo2.png';

const appIconList = [
  {
    id: 1,
    label: 'logo1',
    img: logo1,
    bg: '#F4F498',
  },
  {
    id: 2,
    label: 'logo2',
    img: logo2,
    bg: '#84CF6D',
  },
];

const App = () => {
  const [activeLogo, setActiveLogo] = useState('logo1');
  const [currentAppIcon, setCurrentAppIcon] = useState('logo1');
  const onSelectLogo = async () => {
    try {
      if (
        activeLogo === 'logo1' &&
        currentAppIcon !== activeLogo &&
        Platform.OS === 'ios'
      ) {
        await resetIcon();
      } else if (currentAppIcon !== activeLogo) {
        await changeIcon(activeLogo).then(() => {
          if (Platform.OS === 'ios') {
            return;
          }
          RNRestart.Restart();
        });
      } else {
        Alert.alert('', 'Seçilen app icon zaten kullanımda');
      }
      setCurrentAppIcon(activeLogo);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    const getCurrentIcon = async () => {
      const currentIcon = await getIcon();
      setActiveLogo(currentIcon === 'Default' ? 'logo1' : currentIcon);
      setCurrentAppIcon(currentIcon === 'Default' ? 'logo1' : currentIcon);
    };
    getCurrentIcon();
  }, []);

  const renderButton = (item, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.iconButton, {backgroundColor: item?.bg}]}
        onPress={() => setActiveLogo(item?.label)}>
        <Image source={item?.img} style={styles.logoContainer} />
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{item?.label}</Text>
        </View>
        <View style={styles.radioButtonSection}>
          <View style={styles.radioButtonOuterContainer}>
            <View
              style={[
                styles.radioButtonInnerContainer,
                {
                  backgroundColor:
                    item?.label === activeLogo ? '#A78FD7' : 'transparent',
                },
              ]}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>App Icon seç</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={appIconList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => renderButton(item, index)}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={() => onSelectLogo()}>
          <Text style={styles.buttonLabel}>Kaydet</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 12,
    marginHorizontal: 12,
  },
  listContainer: {
    flex: 1,
    width: '100%',
    padding: 8,
  },
  iconButton: {
    flexDirection: 'row',
    marginVertical: 6,
    padding: 6,
    marginHorizontal: 6,
    borderRadius: 6,
  },
  logoContainer: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  radioButtonSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  radioButtonOuterContainer: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#656565',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInnerContainer: {
    height: 12,
    width: 12,
    borderRadius: 6,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A78FD7',
    paddingVertical: 12,
    width: '100%',
    borderRadius: 6,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
