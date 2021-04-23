import React, { useContext, useEffect } from 'react'
import { ActivityIndicator, Dimensions, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImageColors from 'react-native-image-colors';

import Carousel from 'react-native-snap-carousel';
import { GradientBackground } from '../components/GradientBackground';
import { HorizontalSlider } from '../components/HorizontalSlider';

import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies';
import { getImageColors } from '../helpers/getColores';
import { GradienContext } from '../context/GradientContext';

const { width: windowWidth } = Dimensions.get('window')

export const HomeScreen = () => {

    const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();
    const { top } = useSafeAreaInsets();
    const { setMainColors } = useContext(GradienContext);

    const getPosterColors = async (index: number) => {
        const movie = nowPlaying[index];
        const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;
        
        const [ primary = 'green', secundary = 'orange' ] = await getImageColors(uri);

        setMainColors({ primary, secundary });

    }

    useEffect(() => {
        if (nowPlaying.length > 0) {
            getPosterColors(0);
        }
    }, [nowPlaying])
    

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                <ActivityIndicator color="red" size={100} />
            </View>
        )
    }

    return (
        <GradientBackground>
            <ScrollView>
                <View style={{ marginTop: top + 20 }}>
                    {/* Carousel Principal */}
                    <View style={{ height: 440 }}>
                        <Carousel 
                            data={ nowPlaying! }
                            renderItem={ ({ item }: any) => <MoviePoster movie={ item }/> }
                            sliderWidth={ windowWidth }
                            itemWidth={ 300 }
                            inactiveSlideOpacity={ 0.9 }
                            onSnapToItem={ index => getPosterColors(index) }
                        />
                    </View>

                    {/* Carousel Peliculas Populares, Top Rated, Upcoming */}
                    <HorizontalSlider title="Popular" movies={ popular } />
                    <HorizontalSlider title="Top Rated" movies={ topRated } />
                    <HorizontalSlider title="Upcoming" movies={ upcoming } />
                </View>
            </ScrollView>
        </GradientBackground>
    )
}
