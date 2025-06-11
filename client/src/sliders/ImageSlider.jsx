import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../ImageSlider.css"; // Varsa

const images = [
  { name: "Gdańsk", src: "/src/assets/gdansk.jpg" },
  { name: "Warszawa", src: "/src/assets/warsaw.jpg" },
  { name: "Kraków", src: "/src/assets/krakow.jpg" },
  { name: "Poznań", src: "/src/assets/poznan.jpg" },
];

export default function ImageSlider() {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    swipe: true,
    responsive: [
      {
        breakpoint: 768, // tablet ve altı
        settings: {
          swipe: true,
        },
      },
    ],
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-black">
      <Slider {...settings}>
        {images.map((img, i) => (
          <div
            key={i}
            className="relative w-screen h-screen flex items-center justify-center"
          >
            <img
              src={img.src}
              alt={img.name}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
 {/* 🔳 Saydam gölge */}
          <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />

            {/* Şehir adı */}
             <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-2xl font-semibold bg-black/50 px-4 py-2 rounded">
              {img.name}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
