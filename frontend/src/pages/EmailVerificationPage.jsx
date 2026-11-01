import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { MotionConfig, motion } from 'motion/react'
import { useAuth } from '../context/AuthContext.jsx'
import SettingsMenu from '../components/SettingsMenu.jsx'
import Logo from '../components/Logo.jsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

export default function EmailVerificationPage() {
  useDocumentTitle('Verify Account | BuildBoard')
  const location = useLocation()
  const navigate = useNavigate()
  const { user, signIn } = useAuth()

  const email = location.state?.email || user?.email || 'member@example.com'
  const [isVerified, setIsVerified] = useState(false)

  const from = location.state?.from
  const destination = typeof from === 'string'
    ? from
    : from?.pathname
      ? `${from.pathname}${from.search || ''}${from.hash || ''}`
      : '/explore'

  let destinationLabel = 'Explore'
  const destPath = typeof from === 'string' ? from : (from?.pathname || destination)
  if (destPath === '/products/new') {
    destinationLabel = 'Submit product'
  } else if (destPath.startsWith('/products/')) {
    destinationLabel = 'Product details'
  } else if (destPath === '/builder/dashboard') {
    destinationLabel = 'Builder Dashboard'
  } else if (destPath.startsWith('/profile')) {
    destinationLabel = 'Profile setup'
  } else if (destination !== '/explore') {
    destinationLabel = destination
  }

  function handleVerify() {
    signIn(email)
    setIsVerified(true)
  }

  function handleContinue() {
    navigate(destination)
  }

  return (
    <MotionConfig reducedMotion="user">
      <main
        id="main-content"
        tabIndex={-1}
        className="grid min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] transition-colors lg:grid-cols-2 focus:outline-none"
      >
        {/* Left Column: Adaptive Brand Column */}
        <section className="relative overflow-hidden flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[var(--border-main)] bg-[var(--bg-surface-subtle)] dark:bg-[#151413] p-7 text-[var(--text-main)] sm:p-10 lg:p-14 transition-colors">
          <div className="absolute inset-0 bg-hero-washes opacity-40 pointer-events-none" aria-hidden="true" />

          <div className="relative z-10 flex items-center justify-between">
            <Link className="no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f3a6b] dark:focus-visible:ring-[#dbbf95] rounded-lg" to="/">
              <Logo theme="auto" />
            </Link>
            <div className="lg:hidden">
              <SettingsMenu />
            </div>
          </div>

          <div className="relative z-10 my-14 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-main)] bg-[var(--bg-surface)] px-3.5 py-1 text-xs sm:text-sm font-mono uppercase tracking-[0.14em] font-semibold text-[#1f3a6b] dark:text-[#dbbf95] shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1f3a6b] dark:bg-[#dbbf95]" aria-hidden="true" />
              <span>Account verification</span>
            </div>

            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold leading-[1.08] tracking-tight text-[var(--text-main)]">
              Confirm <br className="hidden sm:inline" />
              <span className="italic font-normal text-[var(--text-main)] dark:text-[#dbbf95]">
                your email.
              </span>
            </h1>

            <p className="mt-4 max-w-md text-base sm:text-lg leading-relaxed text-[var(--text-muted)]">
              Confirm your email address to unlock prototype testing, provide structured feedback, and earn builder recognition points.
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between font-mono text-xs text-[var(--text-subtle)]">
            <span>Early products · Real people</span>
            <span className="font-semibold tracking-wider text-[var(--text-muted)]">SECURITY</span>
          </div>
        </section>

        {/* Right Column: Verification Action */}
        <section className="flex flex-col items-center justify-center px-5 py-14 sm:px-10">
          <div className="mb-6 hidden w-full max-w-md justify-end lg:flex">
            <SettingsMenu />
          </div>

          <motion.div
            className="w-full max-w-md rounded-3xl border border-[var(--border-main)] bg-[var(--bg-surface)] p-7 shadow-warm-xl sm:p-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-[#1f3a6b] dark:text-[#dbbf95]">
              Account Security
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-display font-semibold tracking-tight text-[var(--text-main)]">
              Verify your account
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
              Account email:
            </p>
            <p className="mt-0.5 break-all font-mono font-semibold text-sm text-[var(--text-main)]">{email}</p>

            <div className="mt-5 border-l-2 border-[#1f3a6b] dark:border-[#dbbf95] bg-[var(--bg-surface-subtle)] p-3.5 text-sm leading-relaxed text-[var(--text-muted)] rounded-r-xl">
              <strong className="text-[var(--text-main)]">One-click activation:</strong> Click below to verify your email and immediately activate your session.
            </div>

            {isVerified ? (
              <div className="mt-6 space-y-3">
                <div
                  role="status"
                  className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-[var(--text-main)]"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white dark:bg-emerald-500">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-emerald-800 dark:text-emerald-300">Verification complete!</h3>
                      <p className="mt-0.5 text-sm leading-relaxed text-[var(--text-muted)]">
                        You are now signed in as <span className="font-semibold text-[var(--text-main)]">{email}</span>. Your workspace and testing profile are ready.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleContinue}
                  className="w-full rounded-full bg-[#1f3a6b] px-5 py-3 text-sm font-semibold text-white shadow-warm-sm transition hover:bg-[#182f56] active:translate-y-0.5 dark:bg-[#dbbf95] dark:text-[#15203a] dark:hover:bg-[#ecdcc2] cursor-pointer"
                >
                  Continue to {destinationLabel} →
                </button>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <button
                  type="button"
                  onClick={handleVerify}
                  className="w-full rounded-full bg-[#1f3a6b] px-5 py-3 text-sm font-semibold text-white shadow-warm-sm transition hover:bg-[#182f56] active:translate-y-0.5 dark:bg-[#dbbf95] dark:text-[#15203a] dark:hover:bg-[#ecdcc2] cursor-pointer"
                >
                  Confirm & activate account →
                </button>

                <p className="text-center text-sm text-[var(--text-subtle)]">
                  Instant activation. No waiting required.
                </p>
              </div>
            )}

            <div className="mt-6 border-t border-[var(--border-main)] pt-4">
              <Link
                className="inline-flex text-sm font-medium text-[var(--text-subtle)] hover:text-[var(--text-main)] transition-colors"
                to="/"
              >
                ← Back to BuildBoard
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </MotionConfig>
  )
}