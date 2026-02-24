import React, { useState } from 'react';
import { 
  Settings, ShieldCheck, UserCog, Eye, EyeOff, ArrowLeft 
} from 'lucide-react';

export default function Auth({ onNavigate, onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [password, setPassword] = useState("");
  
  // Local state to capture inputs before sending to Parent
  const [localUser, setLocalUser] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const [strength, setStrength] = useState({ label: "", color: "" });

  const handlePasswordChange = (val) => {
    setPassword(val);
    if (!val) {
      setStrength({ label: "", color: "" });
      return;
    }
    if (val.length < 5) {
      setStrength({ label: "Weak", color: "text-red-500" });
    } else if (val.length < 8) {
      setStrength({ label: "Medium", color: "text-yellow-500" });
    } else {
      setStrength({ label: "Strong", color: "text-green-500" });
    }
  };

  const handleForgot = () => {
    alert(`A reset link has been sent to ${localUser.email || "your email address"}!`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // This pushes data to handleAuth in App.jsx for DB simulation and navigation
    onAuthSuccess({
      firstName: localUser.firstName,
      lastName: localUser.lastName,
      email: localUser.email,
      isExisting: isLogin
    });
  };

  const resetAndHome = () => {
    onNavigate(1);
  };

  return (
    <div className="flex min-h-screen lg:h-screen flex-col lg:flex-row bg-white overflow-x-hidden font-sans">
      
      {/* LEFT BRANDING SECTION - Matches Hero Theme */}
      <div className="flex-[1.1] bg-[#b1a6e0] p-8 lg:p-16 xl:p-20 flex flex-col justify-center text-white shrink-0">
        <div className="mb-10 lg:mb-14">
          {/* Logo scaled and inverted for branding section visibility */}
          <img src="/logo-png.png" alt="Logo" className="h-16 lg:h-20 w-auto object-contain brightness-0 invert" />
        </div>
        
        <h2 className="text-3xl lg:text-5xl font-black mb-10 lg:mb-16 leading-tight lg:max-w-md tracking-tighter">
          Your Journey to Financial Freedom.
        </h2>

        <div className="space-y-8 lg:space-y-10">
          {[
            { i: <Settings size={28} />, t: "Smart Automation", d: "Let our system track for you automatically." },
            { i: <ShieldCheck size={28} />, t: "Privacy First", d: "Your data is always encrypted and private." },
            { i: <UserCog size={28} />, t: "Collaborative Mode", d: "Share with your household for full transparency." }
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-5">
              <div className="p-3 bg-white/20 rounded-2xl shrink-0">{item.i}</div>
              <div>
                <h6 className="font-bold text-lg lg:text-xl text-white leading-tight">{item.t}</h6>
                <p className="text-xs lg:text-sm opacity-90 text-white mt-1.5 leading-snug">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="flex-1 p-6 lg:p-12 xl:p-20 flex flex-col justify-center items-center bg-white">
        <div className="w-full max-w-[400px] lg:max-w-lg flex flex-col items-center">
          
          <h3 className="text-[#6a5acd] text-3xl lg:text-5xl font-black text-center mb-10 lg:mb-16 w-full tracking-tighter">
            {isLogin ? "Welcome Back!" : "Create Your Profile"}
          </h3>

          <form className="w-full space-y-5 lg:space-y-6 flex flex-col" onSubmit={handleSubmit}>
            
            {!isLogin && (
              <div className="flex flex-wrap sm:flex-nowrap gap-4 w-full">
                <input 
                  type="text" 
                  placeholder="First Name" 
                  value={localUser.firstName}
                  onChange={(e) => setLocalUser({...localUser, firstName: e.target.value})}
                  className="w-full sm:flex-1 p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm lg:text-base outline-none focus:ring-2 focus:ring-[#6a5acd] transition-all" 
                  required 
                />
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  value={localUser.lastName}
                  onChange={(e) => setLocalUser({...localUser, lastName: e.target.value})}
                  className="w-full sm:flex-1 p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm lg:text-base outline-none focus:ring-2 focus:ring-[#6a5acd] transition-all" 
                  required 
                />
              </div>
            )}

            <input 
              type="email" 
              placeholder="Email Address" 
              value={localUser.email}
              onChange={(e) => setLocalUser({...localUser, email: e.target.value})}
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm lg:text-base outline-none focus:ring-2 focus:ring-[#6a5acd] transition-all" 
              required 
            />

            <div className="relative w-full">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm lg:text-base outline-none focus:ring-2 focus:ring-[#6a5acd] transition-all"
                required 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6a5acd] transition-colors"
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>

            {/* Password Utility Links */}
            {isLogin && (
              <button 
                type="button" 
                onClick={handleForgot}
                className="text-xs text-[#6a5acd] font-bold block ml-auto hover:underline"
              >
                Forgot Password?
              </button>
            )}

            {!isLogin && (
              <div className="w-full min-h-[24px]">
                <p className="text-[10px] lg:text-xs text-[#6a5acd] font-bold uppercase tracking-tight">
                  Minimum 8 characters required.
                </p>
                {strength.label && (
                  <p className={`text-[10px] lg:text-xs font-black uppercase mt-1.5 ${strength.color}`}>
                    Strength: {strength.label}
                  </p>
                )}
              </div>
            )}

            <label className="flex items-start gap-4 cursor-pointer py-2 w-full">
              <input 
                type="checkbox" 
                className="w-6 h-6 mt-0.5 accent-[#6a5acd] shrink-0" 
                checked={agree} 
                onChange={(e) => setAgree(e.target.checked)} 
                required
              />
              <span className="text-[11px] lg:text-sm text-gray-500 leading-tight">
                By signing up, you agree to our <span className="underline font-medium">Terms</span> and <span className="underline font-medium">Privacy Policy</span>.
              </span>
            </label>

            <button 
              disabled={!agree}
              type="submit" 
              className="w-full bg-[#6a5acd] text-white py-5 rounded-3xl font-black text-lg lg:text-xl shadow-2xl active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLogin ? "Sign-in" : "Create Account"}
            </button>

            <button 
              type="button" 
              onClick={() => { setIsLogin(!isLogin); setLocalUser({firstName: '', lastName: '', email: ''}); setPassword(""); }} 
              className="w-full text-[#6a5acd] border-2 border-[#6a5acd] py-4 rounded-full font-bold text-xs lg:text-sm mt-3 hover:bg-[#6a5acd]/5 transition-all text-center"
            >
              {isLogin ? "New User? Create Account!" : "Already Existing User? Login!"}
            </button>

            <button 
              type="button" 
              onClick={resetAndHome}
              className="w-full text-center text-gray-400 font-bold text-xs lg:text-sm mt-6 underline hover:text-[#6a5acd] transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18}/> Back to Home
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}