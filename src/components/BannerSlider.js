import React, { useState, useEffect } from 'react';


const BannerSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    

    useEffect(() => {
        // Set up an interval to advance the current index every 2 seconds
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000); // 2000 ms = 2 seconds

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, [images.length]);


    return (
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
            {/* Display the current image */}
            <img
                src={images[currentIndex].imgPath}
                alt={images[currentIndex].label}
                style={{ width: '100%', 
                height: '85vh', 
                objectFit: 'cover' // Optional: maintain the aspect ratio
                }}
            />

           
        </div>
    );
};

export default BannerSlider;
