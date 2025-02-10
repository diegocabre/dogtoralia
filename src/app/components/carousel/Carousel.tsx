"use client";
import { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

interface MediaItem {
  id: string;
  type: "IMAGE" | "CAROUSEL_ALBUM";
  url: string;
  thumbnail?: string;
  link: string;
}

export const Carousel = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstagramMedia = async () => {
      try {
        const response = await fetch("/api/instagram");
        const data = await response.json();

        if (Array.isArray(data)) {
          setMedia(data);
        }
      } catch (error) {
        console.error("Error obteniendo medios de Instagram:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramMedia();
    // 🔄 Actualizar cada 5 minutos automáticamente
    const interval = setInterval(fetchInstagramMedia, 300000); // 300000ms = 5 minutos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Carrusel */}
      {loading ? (
        <p className="text-center text-gray-700">Cargando publicaciones...</p>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView={2}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          className="w-full max-w-5xl"
        >
          {media.length > 0 ? (
            media.map((item) => (
              <SwiperSlide key={item.id} className="flex items-center justify-center">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={item.thumbnail}
                    alt="Instagram Post"
                    className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg"
                  />
                </a>
              </SwiperSlide>
            ))
          ) : (
            <p className="text-center text-red-500">No se encontraron publicaciones.</p>
          )}
        </Swiper>
      )}
    </div>
  );
};
