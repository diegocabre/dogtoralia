"use client";

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';

interface InstagramPost {
    id: string;
    media_url: string;
    permalink: string;
    caption?: string;
    media_type?: string;
}

interface InstagramResponse {
    data: InstagramPost[];
    error?: {
        message: string;
        type: string;
        code: number;
    };
}

export function InstagramCarousel() {
    const [posts, setPosts] = useState<InstagramPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInstagramPosts = async () => {
            const token = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;

            if (!token) {
                setError('Error: Token de Instagram no configurado');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    `https://graph.instagram.com/me/media?fields=id,media_url,permalink,caption,media_type&access_token=${token}`
                );

                const data: InstagramResponse = await response.json();

                if (!response.ok) {
                    throw new Error(data.error?.message || 'Error al obtener datos de Instagram');
                }

                if (data.data && data.data.length > 0) {
                    const imagesPosts = data.data.filter(post =>
                        post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM'
                    );
                    setPosts(imagesPosts);
                }
            } catch (error) {
                console.error('Error al cargar posts:', error);
                setError(error instanceof Error ? error.message : 'Error al cargar posts de Instagram');
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

    if (error) {
        return (
            <div className="py-8 sm:py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <p className="text-center text-red-600 text-sm sm:text-base">{error}</p>
                </div>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="py-8 sm:py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <p className="text-center text-sm sm:text-base">No hay posts disponibles</p>
                </div>
            </div>
        );
    }

    return (
        <div className="py-8 sm:py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 sm:mb-8 text-tertiary">
                    Síguenos en Instagram
                </h2>
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
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
                    navigation={{
                        prevEl: '.swiper-button-prev',
                        nextEl: '.swiper-button-next',
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
                <div className="swiper-button-prev !text-primary !w-8 !h-8 sm:!w-12 sm:!h-12"></div>
                <div className="swiper-button-next !text-primary !w-8 !h-8 sm:!w-12 sm:!h-12"></div>
            </div>
        </div>
    );
} 