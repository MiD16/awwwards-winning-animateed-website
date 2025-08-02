import React, { useRef, useState } from 'react'

const BentoTilt = ({ children, className = '' }) => {
    const [transformStyle, setTransformStyle] = useState('');
    const itemsRef = useRef();

    const handleMouseMove = (e) => {
        if(!itemsRef.current) return;

        const { left, top, width, height } = itemsRef.current.getBoundingClientRect();

        const relativeX = (e.clientX - left) / width;
        const relativeY = (e.clientY - top) / height;
        const tiltX = (relativeY - 0.5) * 10;
        const tiltY = (relativeX - 0.5) * -10;

        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`
        
        setTransformStyle(newTransform);
    }

    const handleMouseLeave = (e) => {
        setTransformStyle('');
    }

    return <div className={className} ref={itemsRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ transform: transformStyle }}>
        {children}
    </div>
}

export default BentoTilt