import React, { useState } from "react";
import flag from "../assets/img/flags.png";

const ContactPage = () => {
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("text-gray-500");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      form.querySelectorAll(":invalid")[0].focus();
      return;
    }

    setResult("Please wait...");
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const resJson = await response.json();

      if (response.status === 200) {
        setResult("Message sent successfully!");
        setStatus("text-green-600");
        form.reset();
        form.classList.remove("was-validated");
      } else {
        setResult(resJson.message);
        setStatus("text-red-500");
      }
    } catch (error) {
      setResult("Something went wrong!");
      setStatus("text-red-500");
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 overflow-x-hidden">
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={flag}
            alt="Contact Us"
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-white"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white drop-shadow-lg mb-4 tracking-tighter">
            Contact Us
          </h1>
          <p className="text-white/85 font-medium text-base sm:text-lg max-w-2xl mx-auto">
            We would love to hear from you. Reach out for inquiries,
            appointments, or any assistance you may need.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-12 lg:gap-16 items-start">
          <div>
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#f06a6f] mb-3">
                Get in Touch
              </p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#1f2937] mb-4">
                Fill out the form below
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl">
                Please note that our office is open for walk-in clients. To
                maintain a safe working environment, we strongly encourage all
                clients to wear a mask when visiting our office. Thank you for
                your cooperation.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <input
                type="hidden"
                name="access_key"
                value="YOUR_ACCESS_KEY_HERE"
              />

              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name*"
                  required
                  className="w-full border border-gray-200 bg-white px-4 py-3.5 text-sm md:text-base text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-[#6c63c7] focus:ring-4 focus:ring-[#6c63c7]/10"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  className="w-full border border-gray-200 bg-white px-4 py-3.5 text-sm md:text-base text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-[#2ea9c6] focus:ring-4 focus:ring-[#2ea9c6]/10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail*"
                  required
                  className="w-full border border-gray-200 bg-white px-4 py-3.5 text-sm md:text-base text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-[#43d3a3] focus:ring-4 focus:ring-[#43d3a3]/10"
                />
                <input
                  type="email"
                  name="confirm_email"
                  placeholder="Confirm E-mail*"
                  required
                  className="w-full border border-gray-200 bg-white px-4 py-3.5 text-sm md:text-base text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-[#f8b500] focus:ring-4 focus:ring-[#f8b500]/10"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  rows="6"
                  placeholder="Message"
                  className="w-full border border-gray-200 bg-white px-4 py-3.5 text-sm md:text-base text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-[#f06a6f] focus:ring-4 focus:ring-[#f06a6f]/10 resize-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center bg-[#1f2937] hover:bg-[#6c63c7] text-white px-8 md:px-10 py-3.5 font-semibold tracking-[0.2em] uppercase text-xs md:text-sm transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  Send
                </button>
              </div>

              <p className={`pt-2 text-sm font-medium ${status}`}>{result}</p>
            </form>
          </div>

          <div className="lg:pl-6">
            <div className="border-l-0 lg:border-l border-gray-200 lg:pl-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#2ea9c6] mb-3">
                Office Details
              </p>

              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#1f2937] mb-8">
                Kathmandu, Nepal
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-[#f8b500] font-bold text-xs uppercase tracking-[0.25em] mb-2">
                    Tel
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 leading-7">
                    01-6644551
                    <br />
                    01-6622332
                  </p>
                </div>

                <div>
                  <h3 className="text-[#43d3a3] font-bold text-xs uppercase tracking-[0.25em] mb-2">
                    Opening Hours
                  </h3>
                  <p className="text-sm md:text-base font-semibold text-gray-800">
                    09:00 AM - 05:30 PM, Sun - Fri
                  </p>
                  <p className="text-sm text-gray-500 italic mt-1">
                    Closed on National Holidays
                  </p>
                </div>

                <div>
                  <h3 className="text-[#6c63c7] font-bold text-xs uppercase tracking-[0.25em] mb-2">
                    After Office Hour
                  </h3>
                  <p className="text-xs text-gray-500 mb-1">
                    Emergency contact only
                  </p>
                  <p className="text-sm md:text-base font-semibold text-gray-800">
                    977-9988776655
                  </p>
                </div>

                <div>
                  <h3 className="text-[#f06a6f] font-bold text-xs uppercase tracking-[0.25em] mb-2">
                    Address
                  </h3>
                  <p className="text-sm md:text-base leading-7 text-gray-600">
                    Mahalaxmisthan, Kathmandu
                    <br />
                    Gathaghar, Bhaktapur
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;