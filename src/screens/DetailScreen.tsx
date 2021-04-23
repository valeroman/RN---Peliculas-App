import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParams } from '../navigation/Navigation';

import { useMoviDetails } from '../hooks/useMoviDetails';
import { MovieDetails } from '../components/MovieDetails';
import Icon  from 'react-native-vector-icons/Ionicons';

const { height: screenHeight } = Dimensions.get('screen');

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'>{};

export const DetailScreen = ({ route, navigation }: Props) => {

    const movie = route.params;

    const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;

    const { isLoading, cast, movieFull } = useMoviDetails(movie.id);


    return (
        <ScrollView>
            <View style={ styles.imagenContainer }>
                <View style={ styles.imageBorder }>
                    <Image 
                        source={{uri}}
                        style={ styles.posterImage }
                    />
                </View>
            </View>
            <View style={ styles.marginContainer }>
                <Text style={ styles.subTitle }>{ movie.original_title }</Text>
                <Text style={ styles.title }>{ movie.title }</Text>
            </View>

            <View style={ styles.marginContainer }>
                {
                    isLoading
                        ? <ActivityIndicator size={ 35 } color="grey" style={{marginTop: 20}} />
                        : <MovieDetails movieFull={ movieFull! } cast={ cast } />
                }
                
            </View>

            {/* Boton para regresar */}
            <TouchableOpacity
                style={ styles.backButton }
                onPress={() => navigation.pop()}
            >
                <Icon 
                    color="white"
                    name="arrow-back-outline"
                    size={ 60 }
                />
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    imagenContainer: {
        // backgroundColor: 'red',
        width: '100%',
        height: screenHeight * 0.7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25,
        elevation: 10,
    },
    imageBorder: {
        flex: 1,
        overflow: 'hidden',
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25,
    },
    posterImage: {
        flex: 1,
    },
    marginContainer: {
        marginHorizontal: 20,
        marginTop: 20
    },
    subTitle: {
        fontSize: 16,
        opacity: 0.6
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    backButton: {
        position: 'absolute',
        zIndex: 999,
        elevation: 9,
        top: 30,
        left: 5,
    }
});