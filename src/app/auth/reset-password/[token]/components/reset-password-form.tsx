"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResetPasswordDto,
  ResetPasswordDtoSchema,
} from "@/lib/data/dto/password-reset";
import { toast } from "sonner";
import { resetPasswordAction } from "@/app/auth/reset-password/[token]/actions";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ResetPasswordForm = {
  token: string;
};

export const ResetPasswordForm = ({ token }: ResetPasswordForm) => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(ResetPasswordDtoSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: ResetPasswordDto) => {
    try {
      await resetPasswordAction(token, data.password);
      toast.success("Password reset successfully", {
        style: {
          color: "oklch(0.985 0 0)",
          background: "green",
        },
      });
      router.push("/auth/login");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast("An error occurred when resetting your password", {
        style: {
          color: "oklch(0.985 0 0)",
          background: "red",
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center py-2">
      <Card className="bg-background text-foreground">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="min-w-[300px]">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} className="w-full" type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem className="min-w-[300px]">
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input {...field} className="w-full" type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full sm:w-auto">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
