"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Loader2, CheckCircle2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const formSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters." })
    .trim()
    .refine((val) => val.length > 0, { message: "Name is required" }),
  email: z.string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address." }),
    side: z.enum(["bride", "groom"], {
      required_error: "Please indicate whose side you are from.",
    }),
  attending: z.enum(["yes", "no"], {
    required_error: "Please select whether you're attending.",
  }),
  guestCount: z.string()
    .trim()
    .min(1, { message: "Number of guests is required" })
    .refine((val) => !isNaN(Number(val)), { message: "Please enter a valid number" })
    .refine((val) => Number(val) >= 0, { message: "Guest count cannot be negative" }),
  dietaryRestrictions: z.string().optional(),
  message: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function RsvpForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      side: undefined,
      attending: "yes",
      guestCount: "0",
      dietaryRestrictions: "",
      message: "",
    },
    mode: "onChange",
  })

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)

    try {
      const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL

      if (!GOOGLE_SCRIPT_URL) {
        throw new Error("Google Script URL is not configured")
      }

      // Add artificial delay to make loading state more visible
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Convert data to URL parameters
      const params = new URLSearchParams({
        timestamp: new Date().toISOString(),
        name: data.name,
        email: data.email,
        side: data.side,
        attending: data.attending,
        guestCount: String(Number(data.guestCount)),
        dietaryRestrictions: data.dietaryRestrictions || '',
        message: data.message || '',
      }).toString()

      const fullUrl = `${GOOGLE_SCRIPT_URL}?${params}`

      await fetch(fullUrl, {
        method: 'GET',
        mode: 'no-cors'
      })

      form.reset()
      setShowSuccessDialog(true)
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your RSVP could not be submitted. Please try again later.",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-babyblue-dark" />
              <h2 className="text-xl font-semibold">Submitting RSVP</h2>
              <p className="text-center text-gray-600">
                Wait, don't go yet! We're still processing your RSVP.
              </p>
            </div>
          </div>
        </div>
      )}

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
              RSVP Submitted Successfully
            </DialogTitle>
            <DialogDescription className="text-justify space-y-4 py-4">
              <p>Thank you for your response! We look forward to celebrating with you.</p>
              <p>Feel free to submit another response if you have any changes to your RSVP.</p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <Button
              onClick={() => {
                setShowSuccessDialog(false)
                router.push('/')
              }}
            >
              Return to Home
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Enter your name"
                {...form.register("name", {
                  required: "Name is required",
                })}
                aria-required="true"
                disabled={isSubmitting}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                placeholder="Enter your email"
                {...form.register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
                aria-required="true"
                disabled={isSubmitting}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="side">
                Whose side are you from? <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="bride"
                    {...form.register("side", { required: "Please indicate whose side you are from." })}
                    disabled={isSubmitting}
                  />
                  <span>👰 Bride</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="groom"
                    {...form.register("side", { required: "Please indicate whose side you are from." })}
                    disabled={isSubmitting}
                  />
                  <span>🤵 Groom</span>
                </label>
              </div>
              {form.formState.errors.side && (
                <p className="text-sm text-red-500">{form.formState.errors.side.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="attending">
                Will you be attending? <span className="text-red-500">*</span>
              </Label>
              <select
                id="attending"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                {...form.register("attending", {
                  required: "Please indicate whether you will be attending",
                })}
                aria-required="true"
                disabled={isSubmitting}
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
                  <Label htmlFor="guestCount">
                    Number of Additional Guests <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="guestCount"
                    type="number"
                    min="0"
                    placeholder="0"
                    {...form.register("guestCount", {
                      required: "Please specify the number of additional guests",
                      min: {
                        value: 0,
                        message: "Guest count cannot be negative"
                      }
                    })}
                    aria-required="true"
                    disabled={isSubmitting}
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
                    placeholder="Enter any dietary requirements (optional)"
                    {...form.register("dietaryRestrictions")}
                    disabled={isSubmitting}
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="message">Message for the couple</Label>
              <Textarea
                id="message"
                placeholder="Enter your message (optional)"
                {...form.register("message")}
                disabled={isSubmitting}
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
    </>
  )
}
