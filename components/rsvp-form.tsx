"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { submitRsvp } from "@/app/actions/rsvp-actions"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { Label } from "@/components/ui/label"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  attending: z.enum(["yes", "no"], {
    required_error: "Please select whether you're attending.",
  }),
  guestCount: z.string().optional(),
  dietaryRestrictions: z.string().optional(),
  message: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function RsvpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      attending: "yes",
      guestCount: "1",
      dietaryRestrictions: "",
      message: "",
    },
  })

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)

    try {
      await submitRsvp(data)
      toast({
        title: "RSVP Submitted",
        description: "Thank you for your response!",
      })
      form.reset()
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your RSVP could not be submitted. Please try again.",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              {...form.register("name", {
                required: "Name is required",
              })}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter your email"
              {...form.register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="attending">Will you be attending?</Label>
            <select
              id="attending"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              {...form.register("attending", {
                required: "Please select an option",
              })}
            >
              <option value="">Select an option</option>
              <option value="yes">Yes, I will attend</option>
              <option value="no">No, I cannot attend</option>
            </select>
            {form.formState.errors.attending && (
              <p className="text-sm text-red-500">{form.formState.errors.attending.message}</p>
            )}
          </div>

          {form.watch("attending") === "yes" && (
            <div className="space-y-2">
              <Label htmlFor="dietary">
                Do you have any dietary requirements?
              </Label>
              <Textarea
                id="dietary"
                placeholder="Enter any dietary requirements"
                {...form.register("dietary")}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="message">Message for the couple (optional)</Label>
            <Textarea
              id="message"
              placeholder="Enter your message"
              {...form.register("message")}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit RSVP"}
        </Button>
      </form>
    </Form>
  )
}
