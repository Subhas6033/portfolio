import React from "react";
import { Button, Input } from "../../Components/index.js";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IoIosSend } from "react-icons/io";
import axios from 'axios'
import {
  SlideUpAnimation,
  SlideLeftAnimation,
  SlideRightAnimation,
  SlideInViewAnimation,
} from "../../utils/Animation.jsx";

const Contact = () => {
  const { register, handleSubmit,reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(`https://portfolio-mizk.onrender.com/`, data, {
        headers: { "Content-Type": "application/json" },
      });
      reset();
      console.log("Successfully sent the data to the owner", data);
    } catch (error) {
      console.error("Error while sending data from frontend to backend", error);
    }
  };


  return (
    <section className="min-h-screen pt-8 pb-16 px-6 md:px-20 text-white">
      <SlideUpAnimation className="flex flex-col items-start gap-4 max-w-3xl mb-10">
        <h1
          className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-400 via-60% to-[#e0f2ff]
"
        >
          Get in Touch
        </h1>
        <p className="text-md md:text-lg text-gray-300 leading-relaxed">
          I'm open to freelance work, internships, and full-time opportunities.
          Let's connect and bring ideas to life together.
        </p>
      </SlideUpAnimation>

      {/* Main Content */}
      <SlideInViewAnimation className="flex flex-col md:flex-row justify-between items-start gap-8 overflow-x-hidden">
        {/* Map */}
        <SlideLeftAnimation className="w-full md:w-1/2 h-fit rounded-xl">
          <div className="flex flex-col justify-center items-center w-full max-w-xl mx-auto rounded-xl overflow-hidden shadow-2xl backdrop-blur-lg bg-white/5 border border-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27087.54237793838!2d87.55139030326843!3d22.991178668497923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8202efc0def93%3A0x65256395609fca4!2sBalitha%2C%20West%20Bengal!5e1!3m2!1sen!2sin!4v1753995002863!5m2!1sen!2sin"
              width="100%"
              height="300"
              loading="lazy"
              className="w-full border-none"
            ></iframe>

            <div className="w-full py-6 px-6 bg-slate-900/40 text-white text-sm md:text-base">
              <ul className="flex flex-col gap-2">
                <li className="hover:text-blue-300 transition duration-200">
                  <Link to={"https://subhas.vercel.app"}>🌐 Website</Link>
                </li>
                <li className="hover:text-blue-300 transition duration-200">
                  <a href="mailto:sm2733@it.jgec.ac.in">
                    ✉️ sm2733@it.jgec.ac.in
                  </a>
                </li>
                <li className="hover:text-blue-300 transition duration-200">
                  📍 Balitha, West Bengal
                </li>
              </ul>
            </div>
          </div>
        </SlideLeftAnimation>

        {/* Contact Form */}
        <SlideRightAnimation className="w-full md:w-1/2">
          <form
            className="bg-slate-900/40 backdrop-blur-lg rounded-xl p-6 shadow-xl text-white space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Name */}
            <Input
              type="text"
              label=""
              placeholder="Enter your name"
              className="w-full p-3 rounded bg-white/25 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("userName", { required: true })}
            />

            {/* Email */}
            <Input
              type="email"
              label=""
              placeholder="Enter your email"
              className="w-full p-3 rounded bg-white/25 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Enter a valid email address",
                },
              })}
            />

            {/* Mobile */}
            <Input
              type="tel"
              label=""
              placeholder="Enter your mobile number"
              className="w-full p-3 rounded bg-white/25 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("mobileNumber", { required: true })}
            />

            {/* Subjct */}
            <Input
              type="text"
              label=""
              placeholder="What's the subject?"
              className="w-full p-3 rounded bg-white/25 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("subject", { required: true })}
            />

            {/* Message Textarea */}
            <div className="flex flex-col gap-1">
              <textarea
                id="message"
                rows="2"
                placeholder="Type your message..."
                className="w-full p-3 rounded bg-white/25 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("message", { required: true })}
              />
            </div>

            <Button className="flex justify-center gap-2 text-xl bg-slate-500 p-2 rounded-md hover:cursor-pointer hover:text-black hover:bg-white transition-all duration-500">
              Send <IoIosSend />
            </Button>
          </form>
        </SlideRightAnimation>
      </SlideInViewAnimation>
    </section>
  );
};

export default Contact;
