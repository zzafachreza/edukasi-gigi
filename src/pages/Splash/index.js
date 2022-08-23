import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
} from 'react-native';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { getData } from '../../utils/localStorage';

export default function Splash({ navigation }) {
  const top = new Animated.Value(0.3);

  const animasi = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(top, {
          toValue: 1,
          duration: 1000,
        }),
        Animated.timing(top, {
          toValue: 0.3,
          duration: 1000,
        }),
      ]),
      {
        iterations: 1,
      },
    ).start();
  };



  useEffect(() => {
    animasi();


    const unsubscribe = getData('user').then(res => {
      // console.log(res);
      if (!res) {
        // console.log('beum login');

        setTimeout(() => {
          navigation.replace('Login');
        }, 1500);
      } else {
        console.log('sudah login logon');

        setTimeout(() => {
          navigation.replace('Home');
        }, 1500);
      }
    });
  }, []);


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        <View style={{
          flexDirection: 'row',
          marginBottom: 20,

        }}>

          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Image
              source={require('../../assets/puskesmas.png')}
              style={
                {
                  width: 35,
                  height: 40
                }
              }
            />
          </View>

          <View style={{
            paddingLeft: 5,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{
              color: colors.white,
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 25
            }}>PUSKESMAS BINONG</Text>
          </View>

        </View>
        <Image
          source={require('../../assets/logo.png')}
          style={
            {
              width: 170,
              height: 100
            }
          }
        />

        <Text style={{
          marginTop: 10,
          color: colors.white,
          fontFamily: fonts.secondary[900],
          fontSize: windowWidth / 10
        }}>Pak Ebing</Text>
        <Text style={{
          marginTop: '2%',
          color: colors.white,
          fontFamily: fonts.secondary[600],
          fontSize: windowWidth / 25,
          marginBottom: 10,
        }}>Pendaftaran Konsultasi Edukasi Gigi Binong</Text>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>

      <Image
        source={require('../../assets/tangerang.png')}
        style={
          {
            width: 40,
            height: 50,
            alignSelf: 'center'
          }
        }
      />
      <Text style={{
        marginTop: 10,
        color: colors.secondary,
        fontFamily: fonts.secondary[600],
        fontSize: windowWidth / 25,
        textAlign: 'center',
      }}>
        UPT Puskesmas Binong
      </Text>
      <Text style={{
        color: colors.secondary,
        fontFamily: fonts.secondary[600],
        fontSize: windowWidth / 25,
        marginBottom: 20,
        textAlign: 'center',
      }}>Dinas Kesehatan Kabupaten Tangerang</Text>

    </View>
  );
}

const styles = StyleSheet.create({});
