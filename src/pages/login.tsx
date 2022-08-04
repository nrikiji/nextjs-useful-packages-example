import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/user";
import { Layout } from "@/components/layout";
import { useAppDispatch } from "@/app/hooks";
import { setToken } from "@/features/auth/authSlice";
import { useRouter } from "next/router";

type FormState = {
  email: string;
  password: string;
};

const Login: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState } = useForm<FormState>({ mode: "onChange" });
  const { mutate, isError } = useMutation((state: FormState) => login(state.email, state.password), {
    onSuccess: (data) => {
      dispatch(setToken(data.token));
      router.replace("/users");
    },
  });

  return (
    <Layout title="Login">
      <form onSubmit={handleSubmit((values) => mutate(values))}>
        {isError && <span data-testid="error">ログインできませんでした</span>}
        {/* Email */}
        <div>
          <input placeholder="Email" {...register("email", { required: "required" })} />
          <span>{formState.errors.email && formState.errors.email.message}</span>
        </div>
        {/* Password */}
        <div>
          <input placeholder="Password" {...register("password", { required: "required" })} />
          <span>{formState.errors.password && formState.errors.password.message}</span>
        </div>
        {/* Submit */}
        <input type="submit" value="Login" disabled={!formState.isDirty || !formState.isValid} />
        eve.holt@reqres.in / cityslicka
      </form>
    </Layout>
  );
};

export default Login;
