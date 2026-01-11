import { useState, type FormEvent } from 'react';
import { Button, Input, Textarea } from './ui';
import Dropdown from './ui/Dropdown';
import { CheckCircle, AlertCircle } from 'lucide-react';

const serviceOptions = [
  { value: 'ecommerce', label: 'E-commerce Development' },
  { value: 'custom-development', label: 'Custom WordPress Development' },
  { value: 'ai-integration', label: 'AI Integration' },
  { value: 'seo-geo', label: 'SEO and GEO Optimization' },
  { value: 'plugin-integration', label: 'Plugin Integration' },
  { value: 'maintenance', label: 'Maintenance & Support' },
  { value: 'other', label: 'Other / Not Sure' },
];

interface FormData {
  name: string;
  email: string;
  service: string;
  message: string;
  honeypot: string; // Spam protection
}

interface FormErrors {
  name?: string;
  email?: string;
  service?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    service: '',
    message: '',
    honeypot: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Please provide more details (at least 20 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Honeypot check - if filled, it's likely a bot
    if (formData.honeypot) {
      setSubmitStatus('success'); // Fake success for bots
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate form submission (replace with actual API call)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        service: '',
        message: '',
        honeypot: '',
      });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-soft-green border-2 md:border-3 border-neo-black p-6 md:p-8 text-center shadow-neo-vibrant-pink">
        <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-bold-pink mx-auto mb-3 md:mb-4" />
        <h3 className="font-display font-black text-xl md:text-2xl mb-2 md:mb-3">Message Sent!</h3>
        <p className="font-body text-sm md:text-base text-neo-black font-bold">
          Thank you for reaching out. We'll get back to you within one business day.
        </p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="mt-4 md:mt-6 font-display font-black text-sm md:text-base text-neo-black hover:text-bold-pink transition-colors underline decoration-2 underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
      {submitStatus === 'error' && (
        <div className="p-3 bg-soft-pink border-2 border-neo-black flex items-start gap-2 shadow-neo-sm" role="alert">
          <AlertCircle className="w-5 h-5 text-bold-pink flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-display font-black text-bold-pink uppercase text-sm">Something went wrong</p>
            <p className="font-body text-sm text-neo-black font-bold">
              Please try again or email us directly at hello@neopress.dev
            </p>
          </div>
        </div>
      )}

      {/* Honeypot field - hidden from users */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="website"
          value={formData.honeypot}
          onChange={handleChange('honeypot')}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Input
        label="Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange('name')}
        error={errors.name}
        required
        placeholder="Your name"
        className="focus:ring-bold-pink/40"
      />

      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange('email')}
        error={errors.email}
        required
        placeholder="your@email.com"
        className="focus:ring-bold-blue/40"
      />

      <Dropdown
        label="Service Interested In"
        name="service"
        value={formData.service}
        onChange={handleChange('service')}
        options={serviceOptions}
        placeholder="Select a service..."
        error={errors.service}
        required
      />

      <Textarea
        label="Message"
        name="message"
        value={formData.message}
        onChange={handleChange('message')}
        error={errors.message}
        required
        placeholder="Tell us about your project, goals, and timeline..."
        rows={4}
      />

      {/* Email info - subtle and informational */}
      <div className="text-sm text-neo-gray-light font-bold font-body !mt-1">
        Or email us directly at{' '}
        <a 
          href="mailto:hello@neopress.dev" 
          className="font-bold text-bold-pink hover:underline"
        >
          hello@neopress.dev
        </a>
      </div>

      <Button type="submit" fullWidth disabled={isSubmitting} variant="vibrant-pink" className="py-3 text-base">
        {isSubmitting ? 'Sending...' : 'Submit'}
      </Button>
    </form>
  );
}

