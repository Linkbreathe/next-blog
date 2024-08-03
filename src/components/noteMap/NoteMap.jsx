"use client"
import React from 'react'
import { Map } from '@vis.gl/react-google-maps';
import MarkerWithInfoWindow from '@/components/markerWithInfoWindow/MarkerWithInfoWindow';

const NoteMap = ({ posts }) => {
    return (
        <div> <Map
            mapId={"6f31eff839681822"}
            style={{ width: '100%', height: '100vh' }}
            defaultCenter={{ lat: 39.109372, lng: 66.886724 }}
            defaultZoom={3}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            options={{
                minZoom: 2,
                // scrollwheel: false,
                noWrap: true // 阻止地图重复显示
            }}
        >
            {
                posts.length !== 0 &&

                posts.map((item) => {
                    // Ensure item.location is defined and has lat and lng properties
                    if (item.location) {
                        const [lat, lng] = item.location.coordinates;
                        // Convert lat and lng to numbers
                        const latitude = parseFloat(lat);
                        const longitude = parseFloat(lng);
                        // Check if conversion was successful
                        if (!isNaN(latitude) && !isNaN(longitude)) {
                            return (
                                <MarkerWithInfoWindow
                                    key={item.id} // Ensure you have a unique key for each marker
                                    position={{ lat: latitude, lng: longitude }}
                                    title={item.title}
                                    desc={item.desc}
                                />
                            );
                        }
                    }
                    return null; // Return null if location is not defined or invalid
                })

            }
        </Map></div>
    )
}

export default NoteMap