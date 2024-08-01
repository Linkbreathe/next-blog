

import { useEffect } from 'react';
import { useGeolocate } from "@/app/api/useGeoLocate/route";
import { Button } from "@nextui-org/react";
import { BsGeo } from "react-icons/bs";
import { notifySuccess, notifyError } from "@/components/noftify/Notify";

const GeoLocateButton = ({ setPosition }) => {
    const { position, isLoading, error, getPosition } = useGeolocate();

    useEffect(() => {
        if (position.lat !== undefined || position.lng !== undefined) {
            console.log(position)
            notifySuccess("Successfully obtained the current location")
            setPosition(position);
        }
    }, [position, setPosition]);

    const handleGetLocation = () => {
        getPosition();
    };

    return (
        <Button onClick={handleGetLocation} className="bg-gradient-to-r from-blue-200 to-transparent">
            <BsGeo />
        </Button>
    );
}

export default GeoLocateButton;
