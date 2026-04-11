import OnboardingWizard from '@/components/onboarding/OnboardingWizard'

export const metadata = {
  title: 'Set up your profile | 30 Days in Australia',
}

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-white py-8">
      <OnboardingWizard />
    </div>
  )
}
