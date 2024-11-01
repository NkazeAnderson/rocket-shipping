"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { MdEmail } from "react-icons/md";

function ContactForm() {
  const group = { email: "", phone: "", message: "", name: "" };
  const methods = useForm<typeof group>();
  return (
    <FormProvider {...methods}>
      <form className=" md:py-48 space-y-16" action="">
        <Input name="name" placeholder="john doe" label="Name" type="text" />
        <Input name="email" placeholder="email" label="Email" type="email" />
        <Input name="phone" placeholder="phone" label="Phone" type="text" />
        <div>
          <label htmlFor="message">
            <p className="font-bold pb-8">Message</p>
          </label>
          <textarea
            className="w-full rounded-15 p-8"
            rows={3}
            placeholder="Message"
            {...methods.register("message")}
          ></textarea>
        </div>
        <Button props={{ text: "Send Email", icon: MdEmail }} />
      </form>
    </FormProvider>
  );
}

export default ContactForm;
