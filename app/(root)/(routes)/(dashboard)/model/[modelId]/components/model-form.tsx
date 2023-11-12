"use client";
import React from "react";
import { Make, Model } from "@prisma/client";

import { useParams, useRouter } from "next/navigation";
import Heading from "@/components/heading";
import * as z from "zod";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageUpload from "@/components/image-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ModelFormProps {
  initialData: Model | null;
  makes:Make[],
}

const formSchema = z.object({
  name: z.string().min(1),
  makeId: z.string().min(1),
});

type ModelFormValues = z.infer<typeof formSchema>;
const ModelForm: React.FC<ModelFormProps> = ({ initialData,makes }) => {
  const router = useRouter();
  const params = useParams();

  const form = useForm<ModelFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      makeId: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const toastMessage = initialData
    ? "model successfully edited"
    : "model was successfully added";
  const action = initialData ? "Edit" : "Add";
  const onSubmit = async (data: ModelFormValues) => {
    try {
      if (initialData) {
        await axios.patch(`/api/model/${params.typeId}`, data);
      } else {
        await axios.post("/api/model", data);
      }
      form.reset();
      router.refresh();
      
      toast({
        title: "Success!",
        description: toastMessage,
      });
    } catch (error) {
      console.error("Err:", error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };
  const onDelete = async () => {
    try {
      await axios.delete(`/api/model/${params.typeId}`);
      router.refresh();
      router.push("/model");
      toast({
        title: "Success",
        description: "Model deleted successfully!",
        duration: 4000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "something went wrong while trying to delete!",
        variant: "destructive",
      });
    }
  };
  return (
    <>
      <div className=" flex justify-between items-center">
        <Heading
          title="This is the form to fill for the car model"
          desc="e.g gle63"
        />
        {initialData && (
          <Button onClick={onDelete} variant="destructive">
            <Trash className=" w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" w-full space-y-8 "
        >
          <div className=" grid grid-cols-3 gap-8 ">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name:</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Model name.."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="makeId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Make of the car:</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select the make of the car"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {makes.map(make=>(
                        <SelectItem key={make.id} value={make.id}>
                            {make.name}
                        </SelectItem>
                      ))}
                      </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className=" w-full flex justify-center items-center mt-3">
            <Button variant="secondary" type="submit" disabled={isLoading}>
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ModelForm;
