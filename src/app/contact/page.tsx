import ContactForm from "@/components/contact/ContactForm";
import React from "react";
import { BiPhone } from "react-icons/bi";
import { FaLocationPin } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

function ContactPage() {
  return (
    <div
      className="w-full h-full bg-success overflow-y-auto lg:overflow-y-hidden overflow-x-hidden"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="pt-[10svh]">
        <div className="w-full lg:flex items-start text-white p-32">
          <div className="lg:w-[50%] space-x-24 md:pl-24">
            <h1 className="font-bold">Contact Us</h1>
            <p>
              Call, email or message us using any of the following details. An
              agent will be assigned so handle your inquires in details
            </p>
            <div className="pl-16 border-l-4 border-white mt-32">
              <div className="space-y-8 mb-16">
                <div className="flex items-center">
                  <div className="w-16 border-2 -translate-x-16"></div>
                  <h3>Phone</h3>
                </div>
                <div className="flex items-center space-x-8 pl-16 text-[yellow]">
                  <BiPhone size={35} />
                  <p className="underline">
                    <a href="tel:+16121771777">
                      <strong>+1 612-177-1777</strong>
                    </a>
                  </p>
                </div>
              </div>
              <div className="space-y-8 mb-16">
                <div className="flex items-center">
                  <div className="w-16 border-2 -translate-x-16"></div>
                  <h3>Email</h3>
                </div>
                <div className="flex items-center space-x-8 pl-16 text-[yellow]">
                  <MdEmail size={35} />
                  <p className="underline">
                    <a href="mailto:info@rocketshippping.com">
                      <strong>info@rocketshippping.com</strong>
                    </a>
                  </p>
                </div>
              </div>
              <div className="space-y-8 mb-16">
                <div className="flex items-center">
                  <div className="w-16 border-2 -translate-x-16"></div>
                  <h3>Address</h3>
                </div>
                <div className="flex items-center space-x-8 pl-16 text-[yellow]">
                  <FaLocationPin size={35} />

                  <strong>W123 w, New York Street, New york, NY, 19882</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-[50%] h-full lg:flex items-center justify-center  relative mt-40 pt-16 lg:pt-0 lg:mt-0 border-t-2 border-dark-gray lg:border-t-0">
            <div className="lg:w-3/4">
              <h3>Email Us</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
