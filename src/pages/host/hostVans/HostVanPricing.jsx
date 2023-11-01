import React from "react";
import { useOutletContext } from "react-router-dom";

export default function HostVanPricing() {

    const { van } = useOutletContext()

    return(
        <p className="host-van-price">${van.price}<span>/day</span></p>
    )
}
