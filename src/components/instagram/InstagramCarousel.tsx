"use client";

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';

interface InstagramPost {
    id: string;
    media_url: string;
    permalink: string;
    caption?: string;
    media_type?: string;
}

export function InstagramCarousel() {
    const [posts, setPosts] = useState<InstagramPost[]>([]);
    const [loading, setLoading] = useState(true);
    // Ya no mostramos el error crudo de la API a los visitantes: si el
    // feed de Instagram falla (token vencido, red, etc.), simplemente no
    // se muestra la sección en vez de romper la página con un mensaje
    // técnico. El detalle del error queda en la consola del servidor.
    const [hasFeed, setHasFeed] = useState(false);

    useEffect(() => {
        const fetchInstagramPosts = async () => {
            try {
                const response = await fetch('/api/instagram');
                const data = await response.json();

                if (data.data && data.data.length > 0) {
                    setPosts(data.data);
                    setHasFeed(true);
                }
            } catch (error) {
                console.error('Error al cargar posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInstagramPosts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40 sm:h-64">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    // Sin feed disponible (token vencido, sin posts, error de red): no
    // mostramos nada en vez de un mensaje de error o "no hay posts".
    if (!hasFeed || posts.length === 0) {
        return null;
    }

    return (
        <div className="py-8 sm:py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 sm:mb-8 text-tertiary">
                    Síguenos en Instagram
                </h2>
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={16}
                    slidesPerView={1}
                    breakpoints={{
                        480: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 30,
                        },
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    className="mySwiper"
                >
                    {posts.map((post) => (
                        <SwiperSlide key={post.id}>
                            <a
                                href={post.permalink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block group"
                            >
                                <div className="relative overflow-hidden rounded-lg shadow-lg aspect-square">
                                    <Image
                                        src={post.media_url}
                                        alt={post.caption || 'Instagram post'}
                                        width={500}
                                        height={500}
                                        className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                                    />
                                    {post.caption && (
                                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="text-white text-center p-4">
                                                <p className="text-xs sm:text-sm">{post.caption.substring(0, 100)}...</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
