
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { DEMO_USERS } from "../api/mockApi";
import { useAuth } from "../auth/useAuth";
import { Spinner } from "../Components/Spinner";


// Renders demo account choices and starts an authenticated session.
const Login = () => {
  const { user, login, loading, restoring } = useAuth();
  const navigate = useNavigate();
  const [pending, setPending] = useState(null);

  // If already logged in, skip straight to dashboard
  useEffect(() => {
    if (!restoring && user) navigate("/dashboard", { replace: true });
  }, [restoring, user, navigate]);


  // Starts login for a selected demo account and handles failures visibly.
  const handleLogin = async (username) => {
    setPending(username);
    try {
      await login(username);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(error?.message ?? "Could not sign you in");
    } finally {
      setPending(null);
    }
  };
  return (
    <div className="grid min-h-screen place-items-center bg-obsidian px-4 py-12">
      <div className="   w-full max-w-xl ">
        <div className="border  border-l
        [border-image:linear-gradient(180deg,transparent,#2a2a2a_20%,#2a2a2a_80%,transparent)_1] card-padded  card-shadow">
          <p className="  text-heading-lg font-author">FreightFox</p>
          <h1 className=" text-xl font-inter mt-2">Choose a demo account</h1>
          <p className="  text-caption text-neutral-400  mt-2">
            Each account unlocks a different set of pages and actions.
          </p>

          <ul className="mt-6 flex flex-col divide-y divide-line">
            {DEMO_USERS.map((demo) => (
              <li key={demo.username}>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleLogin(demo.username)}
                  className="group flex w-full items-center justify-between px-3 py-3.5 duration-700
                  "
                >
                  <span className="flex flex-col items-start gap-0.5">
                    <span className=" tracking-heading  text-heading font-author transition-colors group-hover:text-ink">{demo.name}</span>
                    <span className="caption">{demo.role}</span>
                  </span>
                  {pending === demo.username ? (
                    <Spinner label={`Signing in as ${demo.name}`} />
                  ) : (
                    <ArrowRight
                      className="size-4 text-subtext transition-colors group-hover:text-ink"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>


      </div>
    </div>
  )
}

export default Login
