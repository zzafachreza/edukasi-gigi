import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    ScrollView,
    ImageBackground,
    Dimensions,
    Switch,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { MyInput, MyGap, MyButton, MyPicker } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { apiURL } from '../../utils/localStorage';
import DatePicker from 'react-native-date-picker'

export default function SDaftar({ navigation }) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(new Date())
    const [valid, setValid] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const validate = text => {
        // console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            // console.log('nama_lengkap is Not Correct');
            setData({ ...data, nama_lengkap: text });
            setValid(false);
            return false;
        } else {
            setData({ ...data, nama_lengkap: text });
            setValid(true);
            // console.log('nama_lengkap is Correct');
        }
    };

    const [data, setData] = useState({
        nama_lengkap: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        ktp: '',
        kk: '',
        alamat: '',
        telepon: '',
        perawatan: 'Tambal Gigi Dewasa',
        pernah_berobat: 'Sudah Pernah',
        kartu_berobat: '',
        bpjs: '',
        faskes_pertama: 'Puskesmas Binong',
        status_pernikahan: 'Menikah',
        golongan_darah: 'A',
        pekerjaan: 'Ibu Rumah Tangga',
    });

    const simpan = () => {
        if (
            data.nama_lengkap.length === 0 &&
            data.tempat_lahir.length === 0 &&
            data.tanggal_lahir.length === 0 &&
            data.ktp.length === 0 &&
            data.kk.length === 0 &&
            data.alamat.length === 0 &&
            data.perawatan.length === 0 &&
            data.pernah_berobat.length === 0 &&
            data.faskes_pertama.length === 0 &&
            data.telepon.length === 0

        ) {
            showMessage({
                message: 'Maaf Semua Field Harus Di isi !',
            });
        } else if (data.ktp.length === 0) {
            showMessage({
                message: 'Maaf ktp masih kosong !',
            });
        } else if (data.nama_lengkap.length === 0) {
            showMessage({
                message: 'Maaf nama lengkap masih kosong !',
            });
        }
        else if (data.tempat_lahir.length === 0) {
            showMessage({
                message: 'Maaf tempat lahir masih kosong !',
            });
        } else if (data.kk.length === 0) {
            showMessage({
                message: 'Maaf Nomor Kartu Keluarga masih kosong !',
            });
        } else if (data.pernah_berobat.length === 0) {
            showMessage({
                message: 'Maaf Sudah pernah berobat masih kosong !',
            });
        } else if (data.faskes_pertama.length === 0) {
            showMessage({
                message: 'Maaf faskes pertama masih kosong !',
            });
        } else {
            setLoading(true);
            console.log(data);
            axios
                .post(apiURL + 'daftar.php', data)
                .then(res => {
                    console.warn(res.data);
                    let err = res.data.split('#');

                    // console.log(err[0]);
                    if (err[0] == 50) {
                        setTimeout(() => {
                            setLoading(false);
                            showMessage({
                                message: err[1],
                                type: 'danger',
                            });
                        }, 1200);
                    } else {
                        setTimeout(() => {
                            navigation.replace('Home');
                            showMessage({
                                message: 'Pendaftaran user berhasil',
                                type: 'success',
                            });
                        }, 1200);
                    }
                });
        }
    };
    return (
        <ImageBackground
            style={{
                flex: 1,
                backgroundColor: colors.primary,
                padding: 10,
            }}>

            {/* <Switch onValueChange={toggleSwitch} value={isEnabled} /> */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>

                <Text style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.white
                }}>Catatan:</Text>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    color: colors.white
                }}>
                    1.Mohon datang sesuai hari yang telah dijadwalkan
                </Text>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    color: colors.white
                }}>2.Pendaftaran gigi online otomatis terhapus jika Anda datang lebih dari pukul 11.00 WIB pada hari senin- kamis dan lebih dari jam 10.00 WIB pada hari jumat-sabtu</Text>

                <Text style={{
                    fontFamily: fonts.secondary[400],
                    color: colors.white
                }}>
                    3.Syarat untuk perawatan gigi (cabut, tambal dan scaling) pada usia dewasa wajib sudah vaksin covid 2 kali dan akan dilakukan swab antigen (gratis) sebelum tindakan.
                </Text>

                <MyInput value={data.nama_lengkap} onChangeText={x => setData({ ...data, nama_lengkap: x, })} label='NAMA LENGKAP *' iconname='create-outline' /><MyGap jarak={10} />
                <MyInput value={data.tempat_lahir} onChangeText={x => setData({ ...data, tempat_lahir: x, })} label='TEMPAT LAHIR *' iconname='create-outline' /><MyGap jarak={10} />

                <Text
                    style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                        marginVertical: 5,
                        fontSize: 12,
                        maxWidth: '90%',

                    }}>
                    TANGGAL LAHIR
                </Text>
                <DatePicker locale='id' mode='date' date={date} onDateChange={x => {
                    setData({
                        ...data,
                        tanggal_lahir: new Date(x).toISOString().slice(0, 10).replace('T', ' ')
                    })
                }} />
                <MyGap jarak={10} />
                <MyInput value={data.ktp} keyboardType='number-pad' onChangeText={x => setData({ ...data, ktp: x, })} label='NIK (Nomor Induk KTP)*' iconname='create-outline' /><MyGap jarak={10} />
                <MyInput value={data.kk} onChangeText={x => setData({ ...data, kk: x, })} label='NAMA KEPALA KELUARGA (KK)*' iconname='create-outline' /><MyGap jarak={10} />
                <MyInput value={data.alamat} onChangeText={x => setData({ ...data, alamat: x, })} label='ALAMAT LENGKAP*' iconname='create-outline' /><MyGap jarak={10} />
                <MyInput value={data.telepon} keyboardType='phone-pad' onChangeText={x => setData({ ...data, telepon: x, })} label='NOMOR HANDPHONE*' iconname='create-outline' /><MyGap jarak={10} />
                <MyPicker onValueChange={x => setData({ ...data, perawatan: x, })} label="JENIS PERAWATAN GIGI YANG AKAN DILAKUKAN ?"
                    data={[
                        {
                            label: 'Tambal Gigi Dewasa',
                            value: 'Tambal Gigi Dewasa'
                        },
                        {
                            label: 'Tambal Gigi Anak',
                            value: 'Tambal Gigi Anak'
                        },
                        {
                            label: 'Cabut Gigi Dewasa',
                            value: 'Cabut Gigi Dewasa'
                        },
                        {
                            label: 'Cabut Gigi Anak',
                            value: 'Cabut Gigi Anak'
                        },
                        {
                            label: 'Pembersihan Karang Gigi',
                            value: 'Pembersihan Karang Gigi'
                        }
                    ]}
                /><MyGap jarak={10} />

                <MyPicker onValueChange={x => setData({ ...data, pernah_berobat: x, })} label="APAKAH SUDAH PERNAH BEROBAT DI PUSKESMAS BINONG ?"
                    data={[
                        {
                            label: 'Sudah Pernah',
                            value: 'Sudah Pernah'
                        },

                        {
                            label: 'Belum Pernah',
                            value: 'Belum Pernah'
                        },

                    ]}
                /><MyGap jarak={10} />


                <MyInput value={data.kartu_berobat} onChangeText={x => setData({ ...data, kartu_berobat: x, })} label='JIKA SUDAH PERNAH, SILAHKAN MASUKAN NOMOR KARTU BEROBAT (jika belum pernah silahkan kosongkan)' iconname='create-outline' /><MyGap jarak={10} />
                <MyInput value={data.bpjs} keyboardType='number-pad' onChangeText={x => setData({ ...data, bpjs: x, })} label='NOMOR BPJS' iconname='create-outline' /><MyGap jarak={10} />
                <MyPicker onValueChange={x => setData({ ...data, faskes_pertama: x, })} label="DIMANA FASKES PERTAMA BPJS ANDA ?"
                    data={[
                        {
                            label: 'Puskesmas Binong',
                            value: 'Puskesmas Binong'
                        },

                        {
                            label: 'Bukan Puskesmas Binong',
                            value: 'Bukan Puskesmas Binong'
                        },

                    ]}
                /><MyGap jarak={10} />
                <MyPicker onValueChange={x => setData({ ...data, status_pernikahan: x, })} label="STATUS PERNIKAHAN"
                    data={[
                        {
                            label: 'Menikah',
                            value: 'Menikah'
                        },

                        {
                            label: 'Belum Menikah',
                            value: 'Belum Menikah'
                        },

                    ]}
                /><MyGap jarak={10} />
                <MyPicker onValueChange={x => setData({ ...data, golongan_darah: x, })} label="GOLONGAN DARAH"
                    data={[
                        {
                            label: 'A',
                            value: 'A'
                        },
                        {
                            label: 'B',
                            value: 'B'
                        },
                        {
                            label: 'AB',
                            value: 'AB'
                        },
                        {
                            label: 'O',
                            value: 'O'
                        },



                    ]}
                /><MyGap jarak={10} />
                <MyPicker onValueChange={x => setData({ ...data, pekerjaan: x, })} label="PEKERJAAN"
                    data={[
                        {
                            label: 'Ibu Rumah Tangga',
                            value: 'Ibu Rumah Tangga'
                        },
                        {
                            label: 'Pegawai Negeri Sipil',
                            value: 'Pegawai Negeri Sipil'
                        },
                        {
                            label: 'Karyawan Swasta',
                            value: 'Karyawan Swasta'
                        },
                        {
                            label: 'Wiraswasta',
                            value: 'Wiraswasta'
                        },
                        {
                            label: 'Pelajar/Mahasiswa',
                            value: 'Pelajar/Mahasiswa'
                        },
                        {
                            label: 'Pilihan Lainnya',
                            value: 'Pilihan Lainnya'
                        },



                    ]}
                /><MyGap jarak={10} />

                <MyGap jarak={20} />
                {!loading &&
                    <MyButton
                        iconColor={colors.primary}
                        colorText={colors.primary}
                        warna={colors.secondary}
                        title="DAFTAR"
                        Icons="log-in"
                        onPress={simpan}
                    />
                }
                <MyGap jarak={20} />

                {loading && <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator color={colors.secondary} size="large" />
                </View>}
            </ScrollView>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 10,
    },
    image: {
        width: 620 / 4,
        height: 160 / 4,
    },
});
