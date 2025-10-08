import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { login, register } from '@/lib/auth';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict "Full Name" to letters and spaces only
    if (name === 'name' && !/^[A-Za-z\s]*$/.test(value)) return;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!isLogin && !formData.name.trim()) return 'Full name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return 'Please enter a valid email address';
    if (formData.password.length < 6)
      return 'Password must be at least 6 characters long';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const result = isLogin
        ? await login(formData.email, formData.password)
        : await register(formData.name, formData.email, formData.password);

      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Authentication failed');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-nature flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-eco">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-primary rounded-full">
              <Leaf className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            {isLogin ? 'Welcome Back' : 'Join EcoSteps'}
          </CardTitle>
          <CardDescription>
            {isLogin
              ? 'Track your carbon footprint and make a difference.'
              : 'Start your journey to a sustainable future.'}
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit} noValidate>
          <CardContent className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <p className="text-destructive text-sm text-center">{error}</p>}
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
            </Button>

            <button
              type="button"
              onClick={() => {
                setIsLogin((prev) => !prev);
                setError('');
              }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
