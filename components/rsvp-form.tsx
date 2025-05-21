"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
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
  guestCount: z.string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Please enter a valid number of guests.",
    }),
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
      guestCount: "0",
      dietaryRestrictions: "",
      message: "",
    },
  })

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)

    try {
      const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL

      if (!GOOGLE_SCRIPT_URL) {
        throw new Error("Google Script URL is not configured")
      }

      // Prepare the data
      const submitData = {
        timestamp: new Date().toISOString(),
        ...data,
        guestCount: Number(data.guestCount)
      }

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(submitData)
      })

      // For Google Apps Script, we need to check the response differently
      const result = await response.text()
      let jsonResult
      try {
        jsonResult = JSON.parse(result)
      } catch (e) {
        // If response is not JSON, check if it contains success message
        if (result.includes('success')) {
          jsonResult = { status: 'success' }
        } else {
          throw new Error('Invalid response format')
        }
      }
      
      if (jsonResult.status === 'error') {
        throw new Error(jsonResult.message || 'Failed to submit RSVP')
      }

      toast({
        title: "RSVP Submitted",
        description: "Thank you for your response!",
      })
      form.reset()
    } catch (error) {
      console.error('RSVP submission error:', error)
      toast({
        title: "Something went wrong",
        description: "Your RSVP could not be submitted. Please try again.",
        variant: "destructive",
      })
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
              <option value="yes">Yes, I will attend</option>
              <option value="no">No, I cannot attend</option>
            </select>
            {form.formState.errors.attending && (
              <p className="text-sm text-red-500">{form.formState.errors.attending.message}</p>
            )}
          </div>

          {form.watch("attending") === "yes" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="guestCount">Number of Additional Guests</Label>
                <Input
                  id="guestCount"
                  type="number"
                  min="0"
                  placeholder="0"
                  {...form.register("guestCount")}
                />
                <FormDescription>
                  Please enter the number of additional guests you'll be bringing (excluding yourself)
                </FormDescription>
                {form.formState.errors.guestCount && (
                  <p className="text-sm text-red-500">{form.formState.errors.guestCount.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dietary">
                  Do you or your guests have any dietary requirements?
                </Label>
                <Textarea
                  id="dietary"
                  placeholder="Enter any dietary requirements"
                  {...form.register("dietaryRestrictions")}
                />
              </div>
            </>
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
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit RSVP"
          )}
        </Button>
      </form>
    </Form>
  )
}
