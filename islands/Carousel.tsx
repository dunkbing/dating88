import { tw } from 'twind';
import { RefObject, createRef } from 'preact';
import { useState } from 'preact/hooks';

const fakeImages = [
  'https://images.unsplash.com/photo-1506501139174-099022df5260?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80',
  'https://images.unsplash.com/photo-1523438097201-512ae7d59c44?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80',
  'https://tailwindcss.com/img/card-left.jpg',
];

interface Props {
  images?: string[];
}

const Carousel = ({ images = fakeImages }: Props) => {
  const [currentImage, setCurrentImage] = useState(0);

  const refs = images.reduce<Record<number, RefObject<HTMLDivElement>>>(
    (acc, val, i) => {
      acc[i] = createRef<HTMLDivElement>();
      return acc;
    },
    {}
  );

  const scrollToImage = (i: number) => {
    setCurrentImage(i);
    refs[i].current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  };

  const totalImages = images.length;

  const nextImage = () => {
    if (currentImage >= totalImages - 1) {
      scrollToImage(0);
    } else {
      scrollToImage(currentImage + 1);
    }
  };

  const previousImage = () => {
    if (currentImage === 0) {
      scrollToImage(totalImages - 1);
    } else {
      scrollToImage(currentImage - 1);
    }
  };

  const arrowStyle = tw`absolute text-white text-2xl z-10 bg-black h-10 w-10 rounded-full opacity-75 flex items-center justify-center`;

  const sliderControl = (isLeft?: boolean) => (
    <button
      type="button"
      onClick={isLeft ? previousImage : nextImage}
      className={`${arrowStyle} ${isLeft ? 'left-2' : 'right-2'}`}
    >
      <span role="img" aria-label={`Arrow ${isLeft ? 'left' : 'right'}`}>
        {isLeft ? '◀' : '▶'}
      </span>
    </button>
  );

  return (
    <div class="flex w-1/2">
      <div class="relative w-full">
        <div
          class="items-center"
          style={{
            display: 'inline-flex',
            overflowX: 'hidden',
            scrollSnapType: 'x mandatory',
            scrollBarWidth: 'none',
          }}
        >
          {totalImages > 1 && sliderControl(true)}
          {images.map((img, i) => (
            <div class="w-full flex-shrink-0" key={img} ref={refs[i]}>
              <img src={img} class="object-contain rounded-2xl" />
            </div>
          ))}
          {totalImages > 1 && sliderControl()}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
