"use client";
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import './styles.css';

interface Props {
    images: string[];
    name: string;
    className?: string;
}

export const ProductMobileSlideshow = ({ images, name, className }: Props) => {

    return (
        <div className={className}>
            <Swiper
                style={{
                    width: '100vw',
                    height: '500px',
                }}
                pagination
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[FreeMode, Autoplay, Pagination]}
                className="mySwiper2"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}> {/* ✅ Agregado aquí */}
                        <Image
                            src={`/products/${image}`}
                            alt={name}
                            width={600}
                            height={500}
                            className=" object-fill"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    );
};
