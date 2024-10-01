"use client";
import React, { useState, useEffect } from 'react';
import { Typography, Avatar, Rating } from "@/app/MTailwind";
import "@/assets/css/Komentar.css";

const slides = [
    {
        quote: "This is an excellent product, the documentation is excellent and helped me get things done more efficiently.",
        image: "https://docs.material-tailwind.com/img/face-2.jpg",
        name: "M. Rezky Indriawan",
        role: "Lead Frontend Developer",
        rating: 5,
    },
    {
        quote: "This is an excellent product, the documentation is excellent and helped me get things done more efficiently.",
        image: "https://docs.material-tailwind.com/img/face-2.jpg",
        name: "Naufal FIFA",
        role: "Fullstack Developer",
        rating: 5,
    },
    {
        quote: "This is an excellent product, the documentation is excellent and helped me get things done more efficiently.",
        image: "https://docs.material-tailwind.com/img/face-2.jpg",
        name: "Adrian Musa A.",
        role: "Cyber Security",
        rating: 5,
    },

];

function CommentsSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative overflow-hidden py-32">
            <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-8 text-center">
                        <Typography variant="h2" color="blue-gray" className="mb-6 font-medium">
                            &quot;{slide.quote}&quot;
                        </Typography>
                        <Avatar
                            src={slide.image}
                            alt="image"
                            size="lg"
                        />
                        <Typography variant="h6" className="mt-4">
                            {slide.name}
                        </Typography>
                        <Typography color="gray" className="mb-4 font-normal">
                            {slide.role}
                        </Typography>
                        <Rating value={slide.rating} readonly />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommentsSection;
