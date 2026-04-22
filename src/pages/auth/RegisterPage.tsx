import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import { Button, Input } from '@/shared/ui';
import {
  AuthFooterLink,
  AuthHero,
  SocialAuthGroup,
} from '@/components/auth/AuthShared';
import { PasswordStrengthIndicator, usePasswordValidation } from '@/components/auth/PasswordStrengthIndicator';
import { TermsModal } from '@/components/auth/TermsModal';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  const { allPassed: isPasswordValid } = usePasswordValidation(password);
  const isFormValid = email.length > 0 && isPasswordValid && acceptedTerms;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    navigate('/login', {
      replace: false,
      state: {
        prefills: {
          email,
          password,
          role: 'professional',
          fromRegister: true,
        },
      },
    });
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>
      </div>

      <AuthHero
        eyebrow="Únete a EthosHub"
        title="Crea tu cuenta profesional"
        description="Construye tu portafolio digital y conecta con la comunidad tech."
      />

      <motion.section
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl"
      >
        <div className="border-b border-border bg-gradient-to-b from-primary/5 to-transparent px-5 py-6 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-primary">Registro</p>
              <h2 className="mt-1 text-3xl font-bold tracking-tight text-foreground">
                Crear cuenta
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Solo necesitas un email y una contraseña segura para comenzar.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 px-5 py-6 sm:px-8 sm:py-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="register-email" className="mb-2 block text-sm font-semibold text-foreground">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="register-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  autoComplete="email"
                  className="h-12 rounded-xl border-border bg-background pl-11 pr-4 transition-all focus:border-ethoshub-blue focus:ring-2 focus:ring-ethoshub-blue/20"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="register-password" className="mb-2 block text-sm font-semibold text-foreground">
                Contraseña
              </label>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Crea una contraseña segura"
                  autoComplete="new-password"
                  className="h-12 rounded-xl border-border bg-background pl-11 pr-12 transition-all focus:border-ethoshub-blue focus:ring-2 focus:ring-ethoshub-blue/20"
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 inline-flex -translate-y-1/2 cursor-pointer rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Password Strength Indicator */}
            <PasswordStrengthIndicator password={password} />

            {/* Terms Checkbox */}
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm transition-colors hover:bg-muted/50">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-muted-foreground">
                Acepto los{' '}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setTermsModalOpen(true);
                  }}
                  className="font-semibold text-primary underline-offset-2 hover:underline"
                >
                  Términos y Condiciones
                </button>
              </span>
            </label>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!isFormValid}
              className="h-12 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
            >
              Crear cuenta
            </Button>

            {/* Info Notice */}
            <div className="rounded-xl border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-warning">
              Este formulario es demostrativo. Al continuar, serás redirigido al login con tus datos precargados.
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              O regístrate con
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Social Auth - At the bottom */}
          <SocialAuthGroup
            googleLabel="Registrarse con Google"
            githubLabel="Registrarse con GitHub"
          />

          <AuthFooterLink prompt="¿Ya tienes cuenta?" cta="Iniciar sesión" to="/login" />
        </div>
      </motion.section>

      {/* Terms Modal */}
      <TermsModal isOpen={termsModalOpen} onClose={() => setTermsModalOpen(false)} />
    </div>
  );
}
