import React from 'react';

// 1. Data is separated from the component logic
const galleryImages = [
  {
    id: 1,
    src: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/58ccf357202045.59cc693dce5d5.jpg',
    alt: 'Abstract colorful geometric design',
  },
  {
    id: 2,
    src: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/3453d431976891.5669123d942c6.png',
    alt: 'Vintage style poster for a movie',
  },
  {
    id: 3,
    src: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/5a341799916041.5efd291fefcbc.png',
    alt: 'Digital art of a futuristic city',
  },
  {
    id: 4,
    src: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/62d4bb53620947.62ddbe9861b4b.png',
    alt: 'Minimalist product packaging design',
  },
  {
    id: 5,
    src: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/ab07bf183959457.65d097a1d5805.png',
    alt: 'Logo design for a coffee brand',
  },
  {
    id: 6,
    src: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/1639bf152381841.631d389576537.png',
    alt: 'Illustration of a character in a vibrant setting',
  },
  {
    id: 7,
    src: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/b2310e149011011.62dfeabd92336.png',
    alt: 'Website UI design mockup on a laptop',
  },
  {
    id: 8,
    src: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/bf2a24118167221.6083afe1dcc13.png',
    alt: 'Vintage style poster for a movie',
  },
];

function Gallery() {
  return (
    <div className='p-4 sm:p-6 md:p-8 bg-black'>
      <h1 className='text-3xl sm:text-4xl tracking-[0.3em] font-bold text-center mb-8 text-white uppercase'>
        Our EVENTS
      </h1>
        <div className='flex flex-wrap gap-4 justify-center'>
        
        {galleryImages.map((image) => (
          
          <div key={image.id} className='w-full sm:w-[48%] md:w-[30%] flex-grow'>
            <img
              src={image.src}
              alt={image.alt}
              className='w-full h-72 object-cover rounded-lg shadow-lg 
                         hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer'
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;