import { Alert, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

export default function Home({ navigation }) {
  const isFocused = useIsFocused();
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  // const [play, setPlay] = useState(false);


  useEffect(() => {


    getData('user').then(res => {
      setUser(res);
    })
  }
    , []);



  const MyMenu = ({ img, judul, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={{
        flex: 1,
        width: windowWidth / 3,
        marginVertical: 10,
        height: windowHeight / 8
      }}>
        <View style={{
          backgroundColor: colors.primary,
          height: windowHeight / 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}>
          <Image source={img} style={{ height: windowHeight / 13, resizeMode: 'contain' }} />
        </View>

        <Text style={{
          fontFamily: fonts.secondary[600],
          color: colors.primary,
          textAlign: 'center',
          marginTop: 5,
          fontSize: windowWidth / 32,
          maxWidth: windowWidth / 3,
        }}>{judul}</Text>

      </TouchableOpacity>
    )
  }


  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.secondary,
    }}>
      {/* header */}
      <View style={{
        height: windowHeight / 5,
        backgroundColor: colors.primary,
        paddingHorizontal: 10,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        paddingVertical: 20,
      }}>
        <View style={{
          flexDirection: 'row',
          marginBottom: 5,
        }}>
          <Text style={{
            flex: 1,
            fontFamily: fonts.secondary[400],
            fontSize: windowWidth / 28,
            color: colors.white
          }}>Selamat datang, {user.nama_lengkap}</Text>

          <TouchableOpacity onPress={() => {
            storeData('user', null);

            navigation.replace('Login');
          }} style={{
            paddingHorizontal: 10,
            flex: 1,
            flexDirection: 'row',
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Icon type="ionicon" size={windowWidth / 30} name="log-out-outline" color={colors.white} />
            <Text style={{
              left: 5,
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 30,
              color: colors.white
            }}>Keluar</Text>
          </TouchableOpacity>
        </View>

        <View style={{
          flexDirection: 'row'
        }}>

          <View style={{
            flex: 2
          }}>
            <View style={{
              flexDirection: 'row'
            }}>
              <View style={{
                // flex: 1
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Image source={require('../../assets/logo.png')} style={{ width: 35, height: 30 }} />
              </View>
              <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 10
              }}>
                <Text style={{
                  fontFamily: fonts.secondary[600],
                  fontSize: windowWidth / 15,
                  color: colors.white
                }}>Pak Ebing</Text>
              </View>

            </View>
            <Text style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 38,
              color: colors.white
            }}>Pendaftaran Konsultasi dan Edukasi Gigi Online Binong</Text>

          </View>
          <View style={{
            // flex: 1

          }}>

            <Image source={require('../../assets/tangerang.png')} style={{ width: 30, height: 35 }} />
          </View>
          <View style={{
            // flex: 1
            marginLeft: 5,
          }}>
            <Image source={require('../../assets/puskesmas.png')} style={{ width: 30, height: 35 }} />
          </View>


        </View>

      </View>

      {/* slider */}

      <View style={{
        marginTop: -40,
        height: windowHeight / 4,

      }}>
        <Image source={require('../../assets/slide.png')} style={{ width: windowWidth, height: 200, resizeMode: 'contain', borderRadius: 10, }} />
      </View>


      {/* menu */}
      <View style={{
        flex: 1,
        backgroundColor: colors.secondary,
        flexDirection: 'row',
        justifyContent: 'space-around'
      }}>
        <MyMenu onPress={() => navigation.navigate('SHasil', {
          img: require('../../assets/mm1.png'),
          judul: 'Struktur Gigi'
        })} img={require('../../assets/m1.png')} judul="Struktur Gigi" />
        <MyMenu onPress={() => navigation.navigate('SHasil', {
          img: require('../../assets/mm2.png'),
          judul: 'Tanda Gigi Bermasalah'
        })} img={require('../../assets/m2.png')} judul="Tanda Gigi Bermasalah" />

      </View >

      {/* menu */}
      <View style={{
        flex: 1,
        backgroundColor: colors.secondary,
        flexDirection: 'row',
        justifyContent: 'space-around'
      }}>
        <MyMenu onPress={() => navigation.navigate('SHasil', {
          img: require('../../assets/mm3.png'),
          judul: 'Jenis Penyakit Gigi'
        })} img={require('../../assets/m3.png')} judul="Jenis Penyakit Gigi" />
        <MyMenu onPress={() => navigation.navigate('SHasil', {
          img: require('../../assets/mm4.png'),
          judul: 'Tips Merawat Gigi'
        })} img={require('../../assets/m4.png')} judul="Tips Merawat Gigi" />

      </View >

      {/* menu */}
      <View style={{
        flex: 1,
        backgroundColor: colors.secondary,
        flexDirection: 'row',
        justifyContent: 'space-around'
      }}>
        <MyMenu onPress={() => navigation.navigate('SHasil', {
          img: require('../../assets/mm5.png'),
          judul: 'Berita Terbaru Gigi'
        })} img={require('../../assets/m5.png')} judul="Berita Terbaru Gigi" />
        <MyMenu onPress={() => navigation.navigate('STentang')} img={require('../../assets/m6.png')} judul="Konsultasi dan Pendaftaran Gigi Online" />

      </View >





    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  judul: {
    fontFamily: fonts.secondary[600],
    fontSize: windowWidth / 35
  },
  item: {
    fontFamily: fonts.secondary[400],
    fontSize: windowWidth / 35
  }
})