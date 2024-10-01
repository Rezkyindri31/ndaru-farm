import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';

function Loader() {
    return (
        <div className="w-full h-full absolute inset-0 flex justify-center items-center bg-white z-50">
            <ThreeCircles
                height="200"
                width="200"
                color="#738e5b"
                wrapperStyle={{}}
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
            />
        </div>
    );
};

export default Loader;
