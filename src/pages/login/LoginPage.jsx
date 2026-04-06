import { useForm, Controller } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { LeftArrowIcon } from "../../assets/icons";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../features/auth/hooks/useAuthUser";

function LoginPage() {
  const navigate = useNavigate();
  const { mutate: login, isPending, isError, error } = useLogin();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data, {
      onSuccess: () => {
        navigate("/profile", { replace: true });
      },
    });
  };

  return (
    <div className="w-full h-full">
      <div className="h-full relative flex flex-col items-center justify-center px-4">
        {/* Back button */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-1 text-base font-semibold text-gray-900 fixed top-10 left-5"
        >
          <LeftArrowIcon />
          <span>Orqaga</span>
        </button>
        <div className="max-w-md w-full">
          <div className="mb-5 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Kirish</h1>
            <p className="text-sm text-gray-500">Hisobingizga kiring</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl p-8 flex flex-col gap-5"
          >
            {isError && (
              <div className="flex items-center gap-2 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
                <span>⚠️</span>
                <span>{error?.message ?? "Login failed"}</span>
              </div>
            )}

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">
                Telefon raqam
              </label>
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: "Telefon raqam kiritilishi shart",
                  minLength: { value: 9, message: "Noto'g'ri telefon raqam" },
                }}
                render={({ field: { onChange, value } }) => (
                  <PatternFormat
                    format="+998 ## ### ## ##"
                    mask=" "
                    placeholder="+998 90 123 45 67"
                    value={value}
                    onValueChange={(values) => onChange(values.value)}
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200
                    focus:ring-2 focus:ring-primary/30 focus:border-primary
                    ${
                      errors.phone
                        ? "border-red"
                        : "border-zinc-700 bg-zinc-50-50 hover:border-primary/30"
                    }`}
                  />
                )}
              />
              {errors.phone && (
                <p className="text-xs text-red mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-zinc-800">
                Parol
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200
                focus:ring-2 focus:ring-primary/30 focus:border-primary
                ${
                  errors.password
                    ? "border-red"
                    : "border-zinc-700 bg-zinc-50-50 hover:border-primary/30"
                }`}
                {...register("password", {
                  required: "Parol kiritilishi shart",
                  minLength: { value: 6, message: "Kamida 6 ta belgi" },
                })}
              />
              {errors.password && (
                <p className="text-xs text-red mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed
              text-white font-semibold text-sm py-3.5 rounded-xl
              transition-all duration-200 active:scale-[0.98] mt-2"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Kirish...
                </span>
              ) : (
                "Kirish"
              )}
            </button>

            {/* ✅ Signup route */}
            <p className="text-center text-sm text-gray-500">
              Hisobingiz yo'qmi?{" "}
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="text-primary font-semibold hover:underline"
              >
                Ro'yxatdan o'tish
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
