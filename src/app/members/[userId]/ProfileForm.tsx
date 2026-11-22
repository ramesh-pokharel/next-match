
"use client";

import { Member } from "@/generated/prisma/client";
import { TextField, Input, FieldError, Label, Button, TextArea } from "@heroui/react";
import { SubmitHandler, useForm } from "react-hook-form";

export type ProfileFormValues = {
  name: string;
  description: string;
  city: string;
  country: string;
}

type Props = {
  member: Member
}



const ProfileForm = ({ member }: Props) => {



  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty } } = useForm<ProfileFormValues>({
    defaultValues: {
      name: member.name,
      description: member.description,
      city: member.city,
      country: member.country,
    },
    
   
  });

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-3">
      <TextField defaultValue={member.name} aria-label="name" isInvalid={!!errors.name}>
        <Label>Display name</Label>
        <Input
          placeholder="Enter your name"
          {...register("name", {
            required: "Name is required",
            minLength: { value: 1, message: "Name must be at least 1 character" }
          })

          }
        />
        <FieldError>{errors.name?.message}</FieldError>
      </TextField>

      <TextField defaultValue={member.description} aria-label="description" isInvalid={!!errors.description}>
        <Label>Description</Label>
        <TextArea
          rows={4}
          placeholder="Enter your description"
          {...register("description", {
            required: "Description is required",
            minLength: { value: 10, message: "Description must be at least 10 characters" }
          })

          }
        />
        <FieldError>{errors.description?.message}</FieldError>

      </TextField>
      <div className="flex items-center justify-between gap-3 w-full">
        <TextField className="w-full" defaultValue={member.city} aria-label="city" isInvalid={!!errors.city}>
          <Label>City</Label>
          <Input
            placeholder="Enter your city"
            {...register("city", {
              required: "City is required",
              minLength: { value: 1, message: "City must be at least 1 character" }
            })

            }
          />
          <FieldError>{errors.city?.message}</FieldError>
        </TextField>

        <TextField className="w-full" defaultValue={member.country} aria-label="country" isInvalid={!!errors.country}>
          <Label>Country</Label>
          <Input
            placeholder="Enter your country"
            {...register("country", {
              required: "Country is required",
              minLength: { value: 1, message: "Country must be at least 1 character" }
            })

            }
          />
          <FieldError>{errors.country?.message}</FieldError>
        </TextField>
      </div>
      <Button
        type="submit"
        variant="primary"
        isPending={isSubmitting}
        className="flex self-end mt-3"
        isDisabled={!isDirty}
      >
        Update profile
      </Button>
    </form >


  )
}
export default ProfileForm