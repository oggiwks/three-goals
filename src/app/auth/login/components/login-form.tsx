"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { LoginUserDto, LoginUserDtoSchema } from "@/lib/data/dto/users";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginUserAction } from "@/app/auth/login/actions";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export const LoginForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginUserDtoSchema>>({
    resolver: zodResolver(LoginUserDtoSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginUserDto): Promise<void> => {
    try {
      const response = await loginUserAction(data);
      if (response.success) {
        toast("Login successful", {
          style: {
            color: "oklch(0.985 0 0)",
          },
        });
        router.push("/");
      } else {
        toast(response.error, {
          style: {
            color: "oklch(0.985 0 0)",
            background: "orange",
          },
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast("An error occurred while signing up", {
        style: {
          color: "oklch(0.985 0 0)",
          background: "red",
        },
      });
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-4 justify-center items-center py-2">
      <Card className="bg-background text-foreground">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="min-w-[300px]">
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="email"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="min-w-[300px]">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          autoComplete="current-password"
                          className="w-full"
                          type={showPassword ? "text" : "password"}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-2">
                <Button type="submit" className="w-full sm:w-auto">
                  Submit
                </Button>
                <Link href="/auth/reset-password">Reset password</Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
