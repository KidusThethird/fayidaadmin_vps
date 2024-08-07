"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { apiUrl } from "../../api_config";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import useRefetchStore from "@/store/autoFetch";
import { useEffect } from "react";

const noSymbolsRegex = /^[a-zA-Z0-9 ]*$/;
const formSchema = z.object({
  //  blogIndex: z.coerce.number().min(1, { message: "Index cannot be empty!" }),
  // .refine((value) => noSymbolsRegex.test(value), {
  //   message: "Index can not contain symbols!",
  // }),

  name: z.string().min(1, { message: "Name cannot be empty!" }),
  index: z.coerce.number(),

  // writtenBy: z.string().min(1, { message: "Writer cannot be empty!" }),

  // text: z.string().min(1, { message: "Main Text cannot be empty!" }),
});

/// api call to post

////////////////////

export default function AddCategoryList() {
  const { push } = useRouter();
  const { toast } = useToast();

  const setKeywordFetch = useRefetchStore((state) => state.setKeywordFetch);
  const keywordFetch = useRefetchStore((state) => state.keyWordFetch);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      index: 0,
    },
  });

  /// api call to post
  const handleSectionPost = async (formData: any) => {
    console.log("Form Data: " + JSON.stringify(formData));

    // console.log("Keyword Change to: " + keywordFetch);
    try {
      const response = await fetch(`${apiUrl}/categorylist/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        //   push("/settings/blogs");
        // console.log("Course Added");
        // setKeywordFetch(!keywordFetch);
        toast({
          title: "Success!",
          description: "List Added!",
        });
      } else {
        // File deletion failed
        console.error("Failed to add folder");
      }
    } catch (error) {
      console.error("Error adding Folder", error);
    }
  };

  ////////////////////
  function onSubmit(values: z.infer<typeof formSchema>) {
    //console.log(values.courseName);
    handleSectionPost(values);
  }

  return (
    <div>
      <LoadProfileAuth />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex w-full space-x-5"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex space-x-5">
                <FormLabel className="my-auto">List Name</FormLabel>
                <FormControl className="my-auto">
                  <div className="w-1/2  h-fit">
                    <Input
                      className="w-[400px]"
                      placeholder="type the list name here ..."
                      {...field}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="index"
            render={({ field }) => (
              <FormItem className="flex space-x-5">
                <FormLabel className="my-auto">Index</FormLabel>
                <FormControl className="my-auto">
                  <div className="w-1/2  h-fit">
                    <Input
                      type="number"
                      className="w-[50px]"
                      placeholder="0.."
                      {...field}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="h-fit my-auto  ">
            <Button type="submit" className="my-auto ">
              Add
            </Button>{" "}
          </div>
        </form>
      </Form>
    </div>
  );
}
