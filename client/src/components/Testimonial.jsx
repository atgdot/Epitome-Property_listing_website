import React, { useState, useRef, useEffect, useCallback, useContext } from "react";
import { FaStar } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { TestimonialContext } from "../Context/TestimonialContext";

const Testimonial = () => {
  const { testimonials, loading } = useContext(TestimonialContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const timeoutRef = useRef(null);

  // Calculate visible items based on container width
  const calculateVisibleItems = useCallback(() => {
    if (!containerRef.current) return 1;

    const width = containerRef.current.offsetWidth;
    setContainerWidth(width);

    if (width >= 1024) return 3; // lg screens
    if (width >= 768) return 2;  // md screens
    return 1; // sm and smaller screens
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setVisibleItems(calculateVisibleItems());
    };

    setVisibleItems(calculateVisibleItems());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateVisibleItems]);

  // Calculate max index to prevent scrolling beyond available items
  const maxIndex = Math.max(0, testimonials.length - visibleItems);

  // Reset autoplay timer
  const resetAutoplayTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (isAutoPlaying) {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
      }, 5000);
    }
  }, [isAutoPlaying, maxIndex]);

  // Effect for auto-playing carousel
  useEffect(() => {
    resetAutoplayTimer();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isAutoPlaying, currentIndex, maxIndex, resetAutoplayTimer]);

  // Navigation functions
  const nextSlide = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const previousSlide = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goToSlide = useCallback((index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  }, []);

  // Touch handlers for swipe gestures
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    const threshold = 50;
    if (touchStart - touchEnd > threshold) {
      nextSlide();
    } else if (touchEnd - touchStart > threshold) {
      previousSlide();
    }
  };

  // Pause/resume autoplay on mouse enter/leave
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Handle image errors
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNjY2MiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTkiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==";
    e.target.style.objectFit = "contain";
  };

  if (loading) return <div className="w-full py-10 text-center">Loading testimonials...</div>;

  if (!testimonials || testimonials.length === 0) {
    return <section className="my-4 py-8 text-center text-gray-500">No testimonials available.</section>;
  }

  return (
    <div className="w-full py-10 px-5 lg:px-16 bg-white">
      <h2 className="text-center text-2xl uppercase font-semibold text-black mb-8">
        What People Say
      </h2>

      {/* Carousel Container */}
      <div 
        className="relative"
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Previous Button */}
        <button
          onClick={previousSlide}
          className="absolute left-0 sm:left-[-10px] md:left-[-15px] top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 p-2 rounded-full shadow-md transition-colors duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-label="Previous testimonials"
          disabled={currentIndex === 0 && testimonials.length <= visibleItems}
        >
          <FaChevronLeft className="w-6 h-6" />
        </button>

        {/* Viewport for carousel */}
        <div
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Sliding container */}
          <div
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              width: `${(testimonials.length / visibleItems) * 100}%`,
              transform: `translateX(-${currentIndex * (100 / testimonials.length)}%)`,
            }}
          >
            {/* Map through testimonials */}
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-2 sm:px-3 md:px-4"
                style={{ width: `${100 / testimonials.length}%` }}
              >
                <div className="border-2 border-gray-200 p-4 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] bg-white flex flex-col min-h-[400px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 max-w-sm mx-auto">
                  {/* User Info */}
                  <div className="flex flex-col items-center pt-2">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-24 h-24 rounded-full object-cover mb-3"
                      onError={handleImageError}
                      loading="lazy"
                    />
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-gray-800 mb-1">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500">{testimonial.designation}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center my-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-lg mx-1 ${
                          i < testimonial.rating ? "text-yellow-400" : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <div className="flex-1 mb-4">
                    <p className="text-gray-600 text-center text-sm leading-relaxed line-clamp-5 italic">
                      "{testimonial.text}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-0 sm:right-[-10px] md:right-[-15px] top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 p-2 rounded-full shadow-md transition-colors duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-label="Next testimonials"
          disabled={currentIndex >= maxIndex}
        >
          <FaChevronRight className="w-6 h-6" />
        </button>

        {/* Pagination Dots */}
        {testimonials.length > visibleItems && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial set ${index + 1}`}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-colors duration-300 focus:outline-none ${
                  index === currentIndex
                    ? "bg-gray-800"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonial;