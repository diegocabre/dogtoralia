import localFont from "next/font/local";

export const moskFont = localFont({ 
    src: "../fonts/mosk.woff", 
    variable: "--font-mosk",
    display: "swap" 
});

export const montserratFont = localFont({ 
    src: "../fonts/montserrat.woff", 
    variable: "--font-montserrat",
    display: "swap"
});

export default { moskFont, montserratFont };




