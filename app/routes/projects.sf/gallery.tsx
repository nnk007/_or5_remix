"use client"
import { useState } from "react";
export default function Gallery() {
    const images = ["/sf/static/images/i-2.jpeg", "/sf/static/images/i4.jpeg ", "/sf/static/images/i1.jpeg", "/sf/static/images/i3.jpeg ", "/sf/static/images/i5.png", "/sf/static/images/pic1.png"];
    const [currentImageIndex, setCII] = useState(0);
    return (
        <div className="gallery w-full h-[400px] sm:h-[600px] flex flex-col select-none sm:p-0 p-4 items-center justify-end sm:justify-normal">
            <div className="arrows w-full h-full sm:h-5/6 grid grid-cols-[min-content_auto_min_content] lg:grid-cols-[min-content_auto_min-content] grid-rows-1 grid-flow-col-dense gap-2 sm:gap-0 place-items-center">
                <div className="arrow flex items-center h-full w-5 cursor-pointer" onClick={() => setCII(currentImageIndex == 0 ? images.length - 1 : currentImageIndex - 1)}>
                    <svg role="presentation" focusable="false" className=""
                        style={{ display: "block" }} viewBox="0 0 10.6 18" xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink">
                        {/* @ts-ignore */}
                        <polyline fill="none" stroke="#988cc4" strokeLinejoin="butt" strokeLinecap="butt"
                            strokeWidth="2" points="9,1 1,9 9,17"></polyline>
                    </svg></div>
                <img className="w-full object-contain h-full sm:max-w-[600px] object-center" width={1000} height={1000} src={images[currentImageIndex]} alt="" />

                <div className="z-10 fill-black items-center flex h-full w-5 cursor-pointer" onClick={() => setCII(currentImageIndex + 1 == images.length ? 0 : currentImageIndex + 1)}>
                    <svg role="presentation" focusable="false"
                        style={{ display: "block" }} viewBox="0 0 10.6 18" xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink">
                        {/* @ts-ignore */}
                        <polyline fill="none" stroke="#988cc4" strokeLinejoin="butt" strokeLinecap="butt"
                            strokeWidth="2" points="1,1 9,9 1,17"></polyline>
                    </svg>
                </div>

            </div>
            <div className="flex items-center justify-center gap-2 lg:py-2">
                {
                    images.map((image, k) => {
                        return <div key={k} className={`rounded-full h-2 aspect-square hover:bg-[#988cc4] ${k == currentImageIndex ? 'bg-[#988cc4]' : 'bg-neutral-200'} cursor-pointer`} onClick={() => setCII(k)}></div>
                    })
                }
            </div>
        </div>
    )
}