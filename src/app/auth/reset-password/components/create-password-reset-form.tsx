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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  CreatePasswordResetDto,
  CreatePasswordResetDtoSchema,
} from "@/lib/data/dto/password-reset";
import { createPasswordResetAction } from "@/app/auth/reset-password/actions";

export const CreatePasswordResetForm = () => {
  const form = useForm<z.infer<typeof CreatePasswordResetDtoSchema>>({
    resolver: zodResolver(CreatePasswordResetDtoSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: CreatePasswordResetDto): Promise<void> => {
    try {
      await createPasswordResetAction(data.email);
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
