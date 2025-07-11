"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import { Loader2, CheckCircle2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .trim()
    .refine((val) => val.length > 0, { message: "Name is required" }),
  phone: z
    .string()
    .trim()
    .min(1, { message: "Phone number is required" })
    .regex(/^[\+]?[0-9\s\-\(\)]{8,15}$/, { message: "Please enter a valid phone number" }),
  side: z.enum(["groom", "bride"], {
    required_error: "Please indicate whose side you are from.",
  }),
  attending: z.enum(["yes", "no"], {
    required_error: "Please select whether you're attending.",
  }),
  attendingSolemnization: z.boolean().optional(),
  guestCount: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || !isNaN(Number(val)), { message: "Please enter a valid number" })
    .refine((val) => !val || Number(val) >= 0, { message: "Guest count cannot be negative" }),
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
      phone: "",
      side: undefined,
      attending: "yes",
      attendingSolemnization: false,
      guestCount: "",
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

      await new Promise((resolve) => setTimeout(resolve, 1000))

      const params = new URLSearchParams({
        timestamp: new Date().toISOString(),
        name: data.name,
        phone: data.phone,
        side: data.side,
        attending: data.attending,
        attendingSolemnization: data.attendingSolemnization ? "Yes" : "No", 
        guestCount: String(Number(data.guestCount || 0)),
        totalGuests: String(Number(data.guestCount || 0) + (data.attending === "yes" ? 1 : 0)),
        dietaryRestrictions: data.dietaryRestrictions || "",
        message: data.message || "",
      }).toString()

      const fullUrl = `${GOOGLE_SCRIPT_URL}?${params}`

      await fetch(fullUrl, {
        method: "GET",
        mode: "no-cors",
      })

      form.reset()
      setShowSuccessDialog(true)
    } catch (error) {
      console.error("RSVP Submission Error:", error)
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
              <p className="text-center text-gray-600">Wait, don't go yet! We're still processing your RSVP.</p>
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
                router.push("/")
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
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} disabled={isSubmitting} aria-required="true" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Phone Number <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      {...field}
                      disabled={isSubmitting}
                      aria-required="true"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Side Field */}
            <FormField
              control={form.control}
              name="side"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Whose side are you from? <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    {/* Using shadcn/ui RadioGroup for consistency if preferred, or keep native radios */}
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="groom"
                          checked={field.value === "groom"}
                          onChange={() => field.onChange("groom")}
                          disabled={isSubmitting}
                          className="form-radio"
                        />
                        <span>🤵 Groom</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="bride"
                          checked={field.value === "bride"}
                          onChange={() => field.onChange("bride")}
                          disabled={isSubmitting}
                          className="form-radio"
                        />
                        <span>👰 Bride</span>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Attending Field */}
            <FormField
              control={form.control}
              name="attending"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Will you be attending? <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      {...field}
                      disabled={isSubmitting}
                      aria-required="true"
                    >
                      <option value="yes">Yes, I will attend</option>
                      <option value="no">No, I cannot attend</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("attending") === "yes" && (
              <>
                {/* Guest Count Field */}
                <FormField
                  control={form.control}
                  name="guestCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Number of Additional Guests (Optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                          disabled={isSubmitting}
                          onFocus={(e) => {
                            // Clear the field on focus if it's empty or "0"
                            if (e.target.value === "" || e.target.value === "0") {
                              field.onChange("")
                            }
                          }}
                          onBlur={(e) => {
                            // If the field is empty on blur, set it to "0"
                            if (e.target.value === "") {
                              field.onChange("0")
                            }
                          }}
                        />
                      </FormControl>
                      <FormDescription>Guest count excludes yourself.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Dietary Restrictions Field */}
                <FormField
                  control={form.control}
                  name="dietaryRestrictions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dietary Restrictions (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Vegetarian, Halal, Allergies etc." {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormDescription>Please let us know of any dietary restrictions or allergies.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="attendingSolemnization"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow bg-gray-50">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isSubmitting}
                          id="attendingSolemnization"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel htmlFor="attendingSolemnization" className="cursor-pointer">
                          Would you like to attend the Solemnization ceremony?
                        </FormLabel>
                        <FormDescription>
                          This is an optional, intimate ceremony for the signing of marriage documents (11:30 AM -
                          12:00 PM). Limited seating.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </>
            )}

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Leave a message for the couple" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-babyblue-dark hover:bg-babyblue"
            disabled={isSubmitting || !form.formState.isValid}
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
