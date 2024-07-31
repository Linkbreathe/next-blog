"use client"

import {
    AdvancedMarker,
    InfoWindow,
    useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';
import { useState, useCallback } from "react"

const MarkerWithInfoWindow = ({ position }) => {
    // `markerRef` and `marker` are needed to establish the connection between
    // the marker and infowindow (if you're using the Marker component, you
    // can use the `useMarkerRef` hook instead).
    const [markerRef, marker] = useAdvancedMarkerRef();

    const [infoWindowShown, setInfoWindowShown] = useState(false);

    // clicking the marker will toggle the infowindow
    const handleMarkerClick = useCallback(
        () => setInfoWindowShown(isShown => !isShown),
        []
    );

    // if the maps api closes the infowindow, we have to synchronize our state
    const handleClose = useCallback(() => setInfoWindowShown(false), []);

    return (
        <>
            <AdvancedMarker
                ref={markerRef}
                position={position}
                onClick={handleMarkerClick}
            />

            {infoWindowShown && (
                <InfoWindow anchor={marker} onClose={handleClose} headerContent={<span className='text-lg font-bold	'>hello world</span>}>
                    <h2>InfoWindow content!</h2>
                    <p>Some arbitrary html to be rendered into the InfoWindow.</p>
                </InfoWindow >
            )}
        </>
    );
};
export default MarkerWithInfoWindow;