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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

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
              ? 'Track your carbon footprint and make a difference'
              : 'Start your journey to a sustainable future'}
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className="pl-10"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label> 
              <div className="relative ">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-12"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-destructive text-sm text-center">{error}</p>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
            </Button>

            <button
              type="button"
              onClick={() => setIsLogin((prev) => !prev)}
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
