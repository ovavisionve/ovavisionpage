import { useMemo } from "react";
import { Check, X } from "lucide-react";

interface PasswordStrengthIndicatorProps {
  password: string;
}

interface Requirement {
  label: string;
  test: (password: string) => boolean;
}

const requirements: Requirement[] = [
  { label: "Mínimo 6 caracteres", test: (p) => p.length >= 6 },
  { label: "Una letra mayúscula", test: (p) => /[A-Z]/.test(p) },
  { label: "Una letra minúscula", test: (p) => /[a-z]/.test(p) },
  { label: "Un número", test: (p) => /[0-9]/.test(p) },
  { label: "Un carácter especial (!@#$%)", test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
];

const getStrengthLevel = (score: number): { label: string; color: string; bgColor: string } => {
  if (score <= 1) return { label: "Muy débil", color: "text-red-500", bgColor: "bg-red-500" };
  if (score === 2) return { label: "Débil", color: "text-orange-500", bgColor: "bg-orange-500" };
  if (score === 3) return { label: "Regular", color: "text-yellow-500", bgColor: "bg-yellow-500" };
  if (score === 4) return { label: "Fuerte", color: "text-lime-500", bgColor: "bg-lime-500" };
  return { label: "Muy fuerte", color: "text-green-500", bgColor: "bg-green-500" };
};

const PasswordStrengthIndicator = ({ password }: PasswordStrengthIndicatorProps) => {
  const analysis = useMemo(() => {
    const results = requirements.map((req) => ({
      ...req,
      passed: req.test(password),
    }));
    const score = results.filter((r) => r.passed).length;
    const strength = getStrengthLevel(score);
    return { results, score, strength };
  }, [password]);

  if (!password) return null;

  return (
    <div className="mt-3 space-y-3">
      {/* Strength bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Fortaleza:</span>
          <span className={`text-xs font-medium ${analysis.strength.color}`}>
            {analysis.strength.label}
          </span>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                level <= analysis.score ? analysis.strength.bgColor : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Requirements list */}
      <div className="grid grid-cols-1 gap-1">
        {analysis.results.map((req, index) => (
          <div
            key={index}
            className={`flex items-center gap-1.5 text-xs transition-colors ${
              req.passed ? "text-green-500" : "text-muted-foreground"
            }`}
          >
            {req.passed ? (
              <Check className="w-3 h-3" />
            ) : (
              <X className="w-3 h-3" />
            )}
            <span>{req.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
