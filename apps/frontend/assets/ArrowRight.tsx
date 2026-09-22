import React from "react";

export const ArrowRight = ({ color = "#D4D4D4", style = {} }) => (
    <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ rotate: '180deg', ...style }}>
        <path d="M12.7246 4.5726L6.6124 9.92078L12.7246 15.269" stroke={color} strokeWidth="1.37525" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)