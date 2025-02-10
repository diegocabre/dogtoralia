import Link from 'next/link'
import React from 'react'
import Image from 'next/image';

export const PageNotFound = () => {
    return (
        <div className="flex flex-col-reverse md:flex-row h-[800px[] w-full justify-center items-center align-middle">
            <div className='text-center px-5 mx-5'>
                <h2 className="text-9xl font-bold text-primary font-montserrat text-center">404</h2>
                <p className='text-2xl font-bold'>Página no encontrada</p>
                <p className='text-lg font-light mb-5'>Puedes regresar a la pagina principal</p>
                <Link href='/store' className='bg-primary text-white py-2 px-4 rounded-lg mt-3 w-full hover:bg-secondary hover:underline hover:text-accent transition'>Tienda</Link>
            </div>
            <div className='px-5 mx-5'>
                <Image
                    src={'/img/404.jpg'}
                    alt="404"
                    width={500}
                    height={500}
                    className="rounded-lg object-cover sm:p-0 sm:w-full sm:h-full"
                />
            </div>


        </div>
    )
}
