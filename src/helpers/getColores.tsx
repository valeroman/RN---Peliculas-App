import ImageColors from 'react-native-image-colors';


export const getImageColors = async (uri: string) => {

    const colors = await ImageColors.getColors(uri, {});

    // const colors = await ImageColors.getColors(coolImage, {
    //     fallback: "#228B22",
    //   })

    let primary;
    let secundary;
      
    if (colors.platform === "android") {
        // Access android properties
        primary = colors.dominant;
        secundary = colors.average
    } else {
        // Access iOS properties
        primary = colors.primary;
        secundary = colors.secundary;

    }

    return [ primary, secundary ];
}