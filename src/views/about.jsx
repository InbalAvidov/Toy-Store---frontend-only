import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div style={{ fontSize: '20px' }}>{text}</div>;

export function AboutUs() {
    const [coordinates, setCoordinates] = useState({ lat: 32.0797294729, lng: 34.77579423148486 })
    const [zoom, setZoom] = useState(12)
    const shopBranches = [
        { lat: 32.0797294729, lng: 34.77579423148486 },
        { lat: 31.670553501773025, lng: 34.75713221822297 },
        { lat: 31.971273052085596, lng: 34.79084702415015 }
    ]

    function onMapClicked({ lat, lng }) {
        // const isShop = shopBranches.find(shop => shop.lat === lat && shop.lng === lng)
        setCoordinates({ lat, lng })
    }
    console.log('zoom:', zoom)
    return (
        <main className="main-about">
            <h1>Visit Our Shops</h1>
            <div style={{ height: '60vh', width: '80%', margin: '40px auto' }}>
                <GoogleMapReact
                    onClick={onMapClicked}
                    bootstrapURLKeys={{ key: "AIzaSyBuKzWx2EH37l2NunKB-y54KIRASVgwJKk" }}
                    center={coordinates}
                    zoom={zoom}
                >
                    <AnyReactComponent
                        {...shopBranches[0]}
                        text="🪀"
                    />
                    <AnyReactComponent
                        {...shopBranches[1]}
                        text="🪀"
                    />
                    <AnyReactComponent
                        {...shopBranches[2]}
                        text="🪀"
                    />
                </GoogleMapReact>
            </div>
        </main>
    )
}
