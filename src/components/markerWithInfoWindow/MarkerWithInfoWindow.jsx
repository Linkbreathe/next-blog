// "use client"

// import {
//     AdvancedMarker,
//     InfoWindow,
//     useAdvancedMarkerRef
// } from '@vis.gl/react-google-maps';
// import { useState, useCallback, useContext } from "react"
// import { ThemeContext } from "@/context/ThemeContext";
// const MarkerWithInfoWindow = ({ position, title, desc }) => {
//     // `markerRef` and `marker` are needed to establish the connection between
//     // the marker and infowindow (if you're using the Marker component, you
//     // can use the `useMarkerRef` hook instead).
//     const { theme } = useContext(ThemeContext);
//     const [markerRef, marker] = useAdvancedMarkerRef();

//     const [infoWindowShown, setInfoWindowShown] = useState(false);

//     // clicking the marker will toggle the infowindow
//     const handleMarkerClick = useCallback(
//         () => setInfoWindowShown(isShown => !isShown),
//         []
//     );

//     // if the maps api closes the infowindow, we have to synchronize our state
//     const handleClose = useCallback(() => setInfoWindowShown(false), []);

//     return (
//         <>
//             <AdvancedMarker
//                 ref={markerRef}
//                 position={position}
//                 onClick={handleMarkerClick}
//             />

//             {infoWindowShown && (
//                 <InfoWindow anchor={marker} onClose={handleClose} headerContent={
//                     <span className='text-lg font-bold '>{title}</span>}
//                 >
//                     <h2>InfoWindow content!</h2>
//                     <p>Some arbitrary html to be rendered into the InfoWindow.</p>
//                 </InfoWindow >
//             )}
//         </>
//     );
// };
// export default MarkerWithInfoWindow;
"use client"

import {
    AdvancedMarker,
    InfoWindow,
    useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';
import { useState, useCallback, useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const MarkerWithInfoWindow = ({ position, title, desc }) => {
    const { theme } = useContext(ThemeContext);
    const [markerRef, marker] = useAdvancedMarkerRef();

    const [infoWindowShown, setInfoWindowShown] = useState(false);

    const handleMarkerClick = useCallback(
        () => setInfoWindowShown(isShown => !isShown),
        []
    );

    const handleClose = useCallback(() => setInfoWindowShown(false), []);

    // Determine the class based on the theme
    const titleClass = theme === 'dark' ? 'text-[#3B096C] text-lg font-bold' : 'text-lg font-bold';
    const contentClass = theme === 'dark' ? 'text-[#3B096C] ' : '';

    return (
        <>
            <AdvancedMarker
                ref={markerRef}
                position={position}
                onClick={handleMarkerClick}
            />

            {infoWindowShown && (
                <InfoWindow anchor={marker} onClose={handleClose} headerContent={
                    <span className={`${titleClass}`}>{title}</span>}
                >
                    <div className={`${contentClass}`}>

                        <h2>InfoWindow content!</h2>
                        <p>Some arbitrary html to be rendered into the InfoWindow.</p>
                    </div>
                </InfoWindow>
            )}
        </>
    );
};

export default MarkerWithInfoWindow;
