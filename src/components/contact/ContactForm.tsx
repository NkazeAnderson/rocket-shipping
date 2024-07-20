"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { MdEmail } from "react-icons/md";

function ContactForm() {
  const { register } = useForm();
  return (
    <form className=" md:py-48 space-y-16" action="">
      <Input
        name="name"
        register={register}
        placeholder="john doe"
        label="Name"
        type="text"
      />
      <Input
        name="email"
        register={register}
        placeholder="email"
        label="Email"
        type="email"
      />
      <Input
        name="phone"
        register={register}
        placeholder="phone"
        label="Phone"
        type="text"
      />
      <div>
        <label htmlFor="message">
          <p className="font-bold pb-8">Message</p>
        </label>
        <textarea
          className="w-full rounded-15 p-8"
          name="message"
          rows={3}
          placeholder="Message"
        ></textarea>
      </div>
      <Button props={{ text: "Send Email", icon: MdEmail }} />
    </form>
  );
}

export default ContactForm;
