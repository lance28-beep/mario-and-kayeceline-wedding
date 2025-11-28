"use client"

import { useRef, useState } from "react"
import { CheckCircle2, UserCheck, Users, Phone, MessageSquare, Sparkles } from "lucide-react"
import { Section } from "@/components/section"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface RSVPFormProps {
  onSuccess?: () => void
}

function RSVPForm({ onSuccess }: RSVPFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [attendance, setAttendance] = useState("")
  const [names, setNames] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [comments, setComments] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const googleFormData = new FormData()
    googleFormData.append("entry.2031409661", attendance)
    googleFormData.append("entry.1697476721", names) // You'll need to provide the correct entry ID for names field
    googleFormData.append("entry.534061937", contactNumber)
    googleFormData.append("entry.984926065", comments)

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSdgmsoQrLa1MeIg7oDLTNlhbGbZzQr_RyhT18CyA_RmYFRoqw/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: googleFormData,
        }
      )

      toast({
        title: "RSVP Confirmed! 🎉",
        description: "Thank you for your response",
        duration: 3000,
      })

      setIsSubmitted(true)
      setAttendance("")
      setNames("")
      setContactNumber("")
      setComments("")
      formRef.current?.reset()
      
      // Reset submitted state after animation
      setTimeout(() => setIsSubmitted(false), 1000)
      
      if (onSuccess) onSuccess()
    } catch (error) {
      toast({
        title: "Unable to submit RSVP",
        description: "Please try again in a moment",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative w-full max-w-sm sm:max-w-md mx-auto px-2 sm:px-0">
      {/* Style to override placeholder color */}
      <style>{`
        .rsvp-form-input::placeholder {
          color: #9CA3AF !important;
          opacity: 1 !important;
        }
        .rsvp-form-textarea::placeholder {
          color: #9CA3AF !important;
          opacity: 1 !important;
        }
      `}</style>
      
      {/* Decorative background elements */}
      <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#BCCFC0]/30 rounded-full blur-sm animate-pulse"></div>
      <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#E6CFC9]/25 rounded-full blur-md animate-pulse"></div>
      
      <Card className={`relative w-full border border-[#8EA58B]/30 shadow-[0_10px_24px_rgba(167,130,86,0.15)] bg-white/70 backdrop-blur-md transition-all duration-500 group overflow-hidden rounded-xl ${
        isFocused ? 'scale-[1.01] border-[#8EA58B]/50 bg-white/75' : 'hover:bg-white/75'
      } ${isSubmitted ? 'animate-bounce' : ''}`}>
        {/* Glass effect gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E6CFC9]/20 via-white/10 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent"></div>
        
        {/* Frosted glass effect */}
        <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5"></div>
        
        {/* Animated shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#BCCFC0]/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        {/* Success animation overlay */}
        {isSubmitted && (
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-300/10 flex items-center justify-center z-20 pointer-events-none">
            <div className="flex flex-col items-center gap-2 animate-pulse">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <p className="text-green-600 font-semibold text-lg">Confirmed!</p>
            </div>
          </div>
        )}
        
        <CardContent className="relative p-3 sm:p-5 md:p-6 lg:p-7 xl:p-8">
        {/* Header with icon */}
          <div className="text-center mb-2.5 sm:mb-4 md:mb-5 lg:mb-6">
            <div className="relative inline-block mb-1.5 sm:mb-3 md:mb-4">
              <div className="absolute inset-0 bg-[#BCCFC0]/50 rounded-full blur-lg scale-150"></div>
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg border border-[#324D3E]/20">
                <UserCheck className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[#324D3E]" />
              </div>
            </div>
            <h3 className="text-sm sm:text-lg md:text-xl font-playfair font-bold text-foreground mb-1 sm:mb-2">
              RSVP
            </h3>
            <p className="text-[10px] sm:text-xs md:text-sm text-foreground/70 font-lora">
              Please respond on or before January 6, 2025
            </p>
          </div>

          <form 
            ref={formRef} 
            onSubmit={handleSubmit} 
            className="space-y-2.5 sm:space-y-4 md:space-y-5 lg:space-y-6"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            {/* Can You Attend Field */}
            <div className="space-y-1 sm:space-y-1.5 md:space-y-3">
              <label className="block text-[11px] sm:text-sm md:text-base font-medium text-foreground font-lora flex items-center gap-1.5 sm:gap-2">
                <div className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-white/85 border border-[#324D3E]/10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  focusedField === 'attendance' ? 'scale-110 bg-white border-[#324D3E]/30 shadow-md' : ''
                }`}>
                  <CheckCircle2 className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 text-[#324D3E]" />
                </div>
                Can you attend? *
              </label>
              <RadioGroup
                value={attendance}
                onValueChange={setAttendance}
                className="space-y-1.5"
                required
              >
                <div className="flex items-center space-x-2 bg-white/85 rounded-lg p-2.5 border border-[#BCCFC0]/40 hover:border-[#8EA58B]/40 transition-all">
                  <RadioGroupItem value="Yes, I'll be there" id="yes" className="border-[#324D3E]" />
                  <Label htmlFor="yes" className="text-xs sm:text-sm font-lora cursor-pointer flex-1">
                    Yes, I'll be there
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-white/85 rounded-lg p-2.5 border border-[#BCCFC0]/40 hover:border-[#8EA58B]/40 transition-all">
                  <RadioGroupItem value="Sorry, can't make it" id="no" className="border-[#324D3E]" />
                  <Label htmlFor="no" className="text-xs sm:text-sm font-lora cursor-pointer flex-1">
                    Sorry, can't make it
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Names Field */}
            <div className="space-y-1 sm:space-y-1.5 md:space-y-3">
              <label className="block text-[11px] sm:text-sm md:text-base font-medium text-foreground font-lora flex items-center gap-1.5 sm:gap-2">
                <div className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-white/85 border border-[#324D3E]/10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  focusedField === 'names' ? 'scale-110 bg-white border-[#324D3E]/30 shadow-md' : ''
                }`}>
                  <Users className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 text-[#324D3E]" />
                </div>
                What are the names of people attending? *
              </label>
              <div className="relative">
                <Input
                  name="names"
                  required
                  value={names}
                  onChange={(e) => setNames(e.target.value)}
                  onFocus={() => setFocusedField('names')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Kindly list full names (First Name + Last Name)"
                  className={`rsvp-form-input w-full border-2 rounded-xl py-1.5 sm:py-2.5 md:py-3 lg:py-3.5 px-3 sm:px-4 md:px-5 text-[11px] sm:text-sm md:text-base font-lora placeholder:italic transition-all duration-300 bg-white/85 backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-lg ${
                    focusedField === 'names' 
                      ? 'border-[#8EA58B] focus:border-[#8EA58B] focus:ring-4 focus:ring-[#8EA58B]/20 shadow-lg' 
                      : 'border-[#BCCFC0]/40 hover:border-[#8EA58B]/40'
                  }`}
                />
                {names && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Number Field */}
            <div className="space-y-1 sm:space-y-1.5 md:space-y-3">
              <label className="block text-[11px] sm:text-sm md:text-base font-medium text-foreground font-lora flex items-center gap-1.5 sm:gap-2">
                <div className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-white/85 border border-[#324D3E]/10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  focusedField === 'contact' ? 'scale-110 bg-white border-[#324D3E]/30 shadow-md' : ''
                }`}>
                  <Phone className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 text-[#324D3E]" />
                </div>
                Contact Number *
              </label>
              <div className="relative">
                <Input
                  name="contact"
                  type="tel"
                  required
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  onFocus={() => setFocusedField('contact')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your contact number"
                  className={`rsvp-form-input w-full border-2 rounded-xl py-1.5 sm:py-2.5 md:py-3 lg:py-3.5 px-3 sm:px-4 md:px-5 text-[11px] sm:text-sm md:text-base font-lora placeholder:italic transition-all duration-300 bg-white/85 backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-lg ${
                    focusedField === 'contact' 
                      ? 'border-[#8EA58B] focus:border-[#8EA58B] focus:ring-4 focus:ring-[#8EA58B]/20 shadow-lg' 
                      : 'border-[#BCCFC0]/40 hover:border-[#8EA58B]/40'
                  }`}
                />
                {contactNumber && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Comments Field */}
            <div className="space-y-1 sm:space-y-1.5 md:space-y-3">
              <label className="block text-[11px] sm:text-sm md:text-base font-medium text-foreground font-lora flex items-center gap-1.5 sm:gap-2">
                <div className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-white/85 border border-[#324D3E]/10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  focusedField === 'comments' ? 'scale-110 bg-white border-[#324D3E]/30 shadow-md' : ''
                }`}>
                  <MessageSquare className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 text-[#324D3E]" />
                </div>
                Comments and/or questions
              </label>
              <div className="relative">
                <Textarea
                  name="comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  onFocus={() => setFocusedField('comments')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Any special requirements or questions?"
                  className={`rsvp-form-textarea w-full border-2 rounded-xl min-h-[72px] sm:min-h-[100px] text-[11px] sm:text-sm md:text-base font-lora placeholder:italic transition-all duration-300 resize-none bg-white/85 backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-lg py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-5 ${
                    focusedField === 'comments' 
                      ? 'border-[#8EA58B] focus:border-[#8EA58B] focus:ring-4 focus:ring-[#8EA58B]/20 shadow-lg' 
                      : 'border-[#BCCFC0]/40 hover:border-[#8EA58B]/40'
                  }`}
                />
                {comments && (
                  <div className="absolute right-3 top-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !attendance || !names.trim() || !contactNumber.trim()}
              className="w-full text-white py-1.5 sm:py-2.5 md:py-3 lg:py-3.5 px-4 sm:px-5 md:px-6 lg:px-7 rounded-xl text-[11px] sm:text-sm md:text-base font-lora font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group border border-[#E6CFC9]/60"
              style={{ 
                backgroundColor: "#324D3E",
                boxShadow: "0 4px 18px rgba(50, 77, 62, 0.45)"
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = "rgba(50, 77, 62, 0.92)";
                  e.currentTarget.style.boxShadow = "0 8px 28px rgba(50, 77, 62, 0.6)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#324D3E";
                e.currentTarget.style.boxShadow = "0 4px 18px rgba(50, 77, 62, 0.45)";
              }}
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2 relative z-10">
                  <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2 relative z-10">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  Submit RSVP
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export function RSVP() {
  return (
    <Section
      id="rsvp"
      className="relative overflow-hidden py-12 sm:py-16"
    >
      <div className="relative max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-5 sm:mb-6 md:mb-8 lg:mb-10">
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-2 sm:mb-3 md:mb-4 text-balance drop-shadow-md">
            RSVP
          </h2>

          <p className="text-[11px] sm:text-sm md:text-base text-white font-light max-w-2xl mx-auto leading-relaxed px-1 sm:px-4">
            Unless we've said otherwise, this invite is good for one (1) seat only.
          </p>
          <p className="text-[11px] sm:text-sm md:text-base text-white font-light max-w-2xl mx-auto leading-relaxed px-1 sm:px-4 mt-1.5">
            Please respond on or before <strong>January 1, 2025</strong> to include you on the final guest list and assure you of seat/s at the reception.
          </p>
        </div>

        {/* Form Section */}
        <div className="flex justify-center mb-5 sm:mb-6 md:mb-8 lg:mb-10">
          <div className="relative max-w-md w-full">
            {/* Card halo */}
            <div className="absolute -inset-3 bg-gradient-to-br from-[#B28383]/25 via-[#E6CFC9]/20 to-transparent rounded-3xl blur-2xl opacity-70" />
            <div className="absolute -inset-1 bg-gradient-to-br from-[#8EA58B]/15 via-transparent to-transparent rounded-3xl blur-md opacity-80" />
            <RSVPForm />
          </div>
        </div>
      </div>
    </Section>
  )
}
