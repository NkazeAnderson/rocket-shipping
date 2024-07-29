"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { MdEmail } from "react-icons/md";

function ContactForm() {
  const group = { email: "", phone: "", message: "", name: "" };
  const { register } = useForm<typeof group>();
  return (
    <form className=" md:py-48 space-y-16" action="">
      <Input
        name="name"
        register={register}
        placeholder="john doe"
        label="Name"
        type="text"
        group={group}
      />
      <Input
        name="email"
        register={register}
        placeholder="email"
        label="Email"
        type="email"
        group={group}
      />
      <Input
        name="phone"
        register={register}
        placeholder="phone"
        label="Phone"
        type="text"
        group={group}
      />
      <div>
        <label htmlFor="message">
          <p className="font-bold pb-8">Message</p>
        </label>
        <textarea
          className="w-full rounded-15 p-8"
          rows={3}
          placeholder="Message"
          {...register("message")}
        ></textarea>
      </div>
      <Button props={{ text: "Send Email", icon: MdEmail }} />
    </form>
  );
}

export default ContactForm;
