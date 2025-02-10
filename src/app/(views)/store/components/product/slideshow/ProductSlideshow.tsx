"use client";
import React, { useState } from 'react';
import { Swiper as SwiperObject } from 'swiper';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './styles.css';

interface Props {
    images: string[];
    name: string;
    className?: string;
}

export const ProductSlideshow = ({ images, name, className }: Props) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

    return (
        <div className={className}>
            <Swiper
                style={{
                    '--swiper-navigation-color': '--color-primary',
                    '--swiper-pagination-color': '--color-primary',
                } as React.CSSProperties}
                spaceBetween={10}
                navigation={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                className="mySwiper2"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}> {/* ✅ Agregado aquí */}
                        <Image
                            src={`/products/${image}`}
                            alt={name}
                            width={1024}
                            height={800}
                            className="rounded-lg object-fill"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}> {/* ✅ Agregado aquí */}
                        <Image
                            src={`/products/${image}`}
                            alt={name}
                            width={300}
                            height={300}
                            className="rounded-lg object-fill"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
