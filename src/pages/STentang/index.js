import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { colors, fonts, windowWidth } from '../../utils'
import { MyButton } from '../../components'

export default function STentang() {
    return (
        <View style={{
            flex: 1,

            justifyContent: 'center',
            paddingTop: 10,
            paddingHorizontal: windowWidth / 10
        }}>

            <Text style={{
                fontFamily: fonts.secondary[400],
                fontSize: windowWidth / 25,
                textAlign: 'center'
            }}>
                Untuk konsultasi gigi dan pendaftaran perawatan gigi online di Puskesmas Binong silahkan klik dibawah ini:
            </Text>
            <Text style={{
                marginVertical: 20,
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 10,
                textAlign: 'center'
            }}>0821-1315-6698
            </Text>
            <View style={{
                flexDirection: 'row',

            }}>

                <View style={{
                    flex: 1,
                    paddingRight: 10,
                }}>
                    <MyButton onPress={() => Linking.openURL(`https://wa.me/6282113156698`)} Icons="logo-whatsapp" warna={colors.success} title="Whatsapp" />
                </View>
                <View style={{
                    flex: 1,
                    paddingLeft: 10,
                }}>
                    <MyButton onPress={() => Linking.openURL(`tel:082113156698`)} Icons="call-outline" warna={colors.primary} title="Telepon" />
                </View>

            </View>


        </View >
    )
}

const styles = StyleSheet.create({})