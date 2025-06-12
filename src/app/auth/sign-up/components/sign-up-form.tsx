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
import { CreateUserDto, CreateUserDtoSchema } from "@/lib/data/dto/users";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { createUserAction } from "@/app/auth/sign-up/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const SignUpForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateUserDtoSchema>>({
    resolver: zodResolver(CreateUserDtoSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  const onSubmit = async (data: CreateUserDto): Promise<void> => {
    try {
      const response = await createUserAction(data);
      if (response.success) {
        router.push("/auth/sign-up/success");
      } else {
        toast(`Error when signing up: ${response.error}`, {
          style: {
            background: "orange",
          },
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast("An error occurred while signing up", {
        style: {
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
                name="firstName"
                render={({ field }) => (
                  <FormItem className="min-w-[300px]">
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="min-w-[300px]">
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="min-w-[300px]">
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input {...field} className="w-full" />
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
