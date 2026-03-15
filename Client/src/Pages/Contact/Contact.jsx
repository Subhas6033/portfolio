import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Send, Loader2 } from 'lucide-react'
import axios from 'axios'
import { KEYFRAMES } from '../../Components/ui/animations'

const CONTACT_INFO = [
  { icon: '📧', label: 'Email',    val: 'goalkeepersubhas07@gmail.com', href: 'mailto:goalkeepersubhas07@gmail.com' },
  { icon: '📞', label: 'Phone',    val: '+91 9832395096',               href: 'tel:+919832395096' },
  { icon: '🌐', label: 'Website',  val: 'subhas.vercel.app',            href: 'https://subhas.vercel.app' },
  { icon: '📍', label: 'Location', val: 'Balitha, West Bengal, India',  href: null },
]

const inputCls = `w-full bg-zinc-900 border border-zinc-800 text-white text-sm rounded-xl px-4 py-3
  placeholder-zinc-600 focus:outline-none focus:border-lime-400/50 focus:ring-1 focus:ring-lime-400/20
  transition-all duration-200`

export default function Contact() {
  const { register, handleSubmit, reset } = useForm()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/contact`,
        data,
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      )
      reset()
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!status) return
    const t = setTimeout(() => setStatus(null), 3000)
    return () => clearTimeout(t)
  }, [status])

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div className="min-h-screen bg-zinc-950 pt-28 pb-24 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="anim-fadeUp mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-5 bg-lime-400/10 border border-lime-400/30 rounded flex items-center justify-center"
                style={{ animation: 'pulseGlow 2.5s ease-in-out infinite' }}>
                <div className="w-2 h-2 bg-lime-400 rounded-sm" />
              </div>
              <span className="text-lime-400 text-xs font-bold uppercase tracking-widest">Contact</span>
            </div>
            <h1 className="font-black text-white tracking-tighter leading-none mb-4"
              style={{ fontSize: 'clamp(40px, 7vw, 80px)' }}>
              Let's <span className="shimmer-text">Talk</span>
            </h1>
            <p className="text-zinc-500 text-base max-w-lg leading-relaxed">
              Open to freelance work, internships, and full-time opportunities. Drop me a message and I'll get back within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">

            {/* LEFT — form */}
            <div className="anim-fadeUp">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-zinc-500 text-xs uppercase tracking-widest mb-2 block">Your Name</label>
                    <input
                      type="text"
                      placeholder="Subhas Mondal"
                      required
                      className={inputCls}
                      {...register('userName', { required: true })}
                    />
                  </div>
                  <div>
                    <label className="text-zinc-500 text-xs uppercase tracking-widest mb-2 block">Email Address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      required
                      className={inputCls}
                      {...register('email', {
                        required: true,
                        validate: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Invalid email',
                      })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-zinc-500 text-xs uppercase tracking-widest mb-2 block">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      required
                      className={inputCls}
                      {...register('mobileNumber', { required: true })}
                    />
                  </div>
                  <div>
                    <label className="text-zinc-500 text-xs uppercase tracking-widest mb-2 block">Subject</label>
                    <input
                      type="text"
                      placeholder="Project inquiry, collaboration..."
                      required
                      className={inputCls}
                      {...register('subject', { required: true })}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-zinc-500 text-xs uppercase tracking-widest mb-2 block">Message</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell me about your project, idea, or opportunity..."
                    className={`${inputCls} resize-none`}
                    {...register('message', { required: true })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 bg-lime-400 text-zinc-950 font-bold text-sm px-6 py-3 rounded-full hover:bg-lime-300 hover:shadow-[0_0_30px_rgba(163,230,53,0.35)] transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <><Loader2 size={16} className="animate-spin" /> Sending...</>
                  ) : (
                    <><Send size={16} /> Send Message</>
                  )}
                </button>
              </form>
            </div>

            {/* RIGHT — info + map */}
            <div className="anim-fadeRight space-y-4">

              {/* Contact info card */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
                <div className="text-zinc-500 text-xs uppercase tracking-widest">Get in Touch</div>
                {CONTACT_INFO.map(c => (
                  <div key={c.label} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-base shrink-0 group-hover:border-lime-400/40 group-hover:bg-lime-400/10 transition-all duration-200">
                      {c.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-zinc-600 text-xs">{c.label}</div>
                      {c.href ? (
                        <a href={c.href} className="text-white text-sm font-medium truncate block hover:text-lime-400 transition-colors duration-200">
                          {c.val}
                        </a>
                      ) : (
                        <div className="text-white text-sm font-medium">{c.val}</div>
                      )}
                    </div>
                  </div>
                ))}
                <div className="pt-3 border-t border-zinc-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                  <span className="text-zinc-500 text-xs">Available for new projects</span>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl border border-zinc-800 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27087.54237793838!2d87.55139030326843!3d22.991178668497923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8202efc0def93%3A0x65256395609fca4!2sBalitha%2C%20West%20Bengal!5e1!3m2!1sen!2sin!4v1753995002863!5m2!1sen!2sin"
                  width="100%"
                  height="220"
                  loading="lazy"
                  className="w-full border-none grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Toast */}
        {status && (
          <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-3 rounded-2xl border backdrop-blur-md shadow-2xl transition-all duration-300 anim-fadeUp ${
            status === 'success'
              ? 'bg-zinc-900/90 border-lime-400/30 text-lime-400'
              : 'bg-zinc-900/90 border-red-500/30 text-red-400'
          }`}>
            <span>{status === 'success' ? '✅' : '❌'}</span>
            <span className="text-sm font-semibold">
              {status === 'success' ? 'Message sent successfully!' : 'Failed to send. Try again.'}
            </span>
          </div>
        )}
      </div>
    </>
  )
}
