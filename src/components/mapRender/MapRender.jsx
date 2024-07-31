"use client"
import React from 'react'
import { Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';
import MarkerWithInfoWindow from '../markerWithInfoWindow/MarkerWithInfoWindow';
const MapRender = () => {
    return (
        <div>
            <Map
                mapId={"db2c4bf96eda4647"}
                style={{ width: '100%', height: '50vh' }}
                defaultCenter={{ lat: 39.109372, lng: 66.886724 }}
                defaultZoom={3}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
            // options={{
            //     scrollwheel: false
            // }}
            >
                <MarkerWithInfoWindow position={{ lat: 56.156635, lng: 10.210365 }} />
                {/* Nanchang city position */}
                <Marker position={{ lat: 28.683332, lng: 115.883331 }} />
            </Map>
        </div >

    )
}

export default MapRender