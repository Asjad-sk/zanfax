'use client';
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { storage } from "../setup/firebase";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { productSchema } from "@/zodValidation/productSchema";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";



export default function CreateProduct() {
  type FormFieldNames = "name" | "description" | "price" | "category" | "sizes" | "color" | "stock" | "images" | "brand" | "rating" | "reviews";
  type inputType = "string" | "number";
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      sizes: [],
      color: [],
      stock: 0,
      images: [],
      brand: "",
      rating: undefined,
      reviews: [],
    },
  });

  const router = useRouter();
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  const uploadImage = async (file: File) => {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle progress updates
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
        },
        (error) => {
          // Handle unsuccessful uploads
          reject(error);
        },
        async () => {
          // Handle successful uploads on complete
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  };

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    setSubmitting(true);
    try {
      const transformedData = {
        ...data,
        price: parseFloat(data.price as any), // Convert to number
        stock: parseInt(data.stock as any, 10), // Convert to number
        sizes: Array.isArray(data.sizes) ? data.sizes : [], // Ensure sizes is an array
        color: Array.isArray(data.color) ? data.color : [], // Ensure color is an array
        images: imageUrls, // Include uploaded image URLs
      };

      const response = await axios.post<any>("/api/addProduct", transformedData);
      console.log(response.data)
      toast({
        title: "Success",
        description: "Product added successfully.",
      });
      router.replace(`getProduct/${response.data._id}`);
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "There was an error submitting the form.",
        variant: "destructive",

      });
    } finally {
      setSubmitting(false);
    }
  };


  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: any = event.target.files;
    if (!files) return;

    const newImageUrls: string[] = []; // Array to hold new image URLs

    for (const file of files) {
      try {
        const url = await uploadImage(file);
        newImageUrls.push(url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    // Update imageUrls state with new URLs
    setImageUrls(prev => [...prev, ...newImageUrls]);
  };

  const formInput = (name: FormFieldNames, placeholder: string, type: inputType) => {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{placeholder}</FormLabel>
            <FormControl>
              <Input
                type={type}
                placeholder={placeholder}
                {...field}
                // Handle type-specific input changes
                onChange={(e) => {
                  if (type === "number") {
                    field.onChange(e.target.valueAsNumber);
                  } else {
                    field.onChange(e.target.value);
                  }
                }}
              />
            </FormControl>
            {/* <FormDescription>
              This is your {placeholder}.
            </FormDescription> */}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };


  return (
    <div className=" h-[100vh] border border-black flex flex-col justify-center ">
      <div className=" text-center mb-8 text-4xl from-neutral-900">
        Add product
      </div>
      <Card className=" w-4/5 h-[50vh] mx-auto flex justify-center py-4 px-4 overflow-y-auto overflow-x-hidden rounded-md ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full  ">
            {formInput("name", "Name", "string")}
            {formInput("description", "Description", "string")}
            {formInput("price", "Price", "number")}
            {formInput("stock", "Stock", "number")}

            {/* category */}

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                  <FormField
      control={form.control}
  name="category"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Category</FormLabel>
      <FormControl>
        <Select
          onValueChange={field.onChange} // Trigger form's change handler
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent className="bg-slate-200">
            <SelectItem value="Hoodies">Hoodies</SelectItem>
            <SelectItem value="Polo">Polo</SelectItem>
            <SelectItem value="Sweat-Shirt">SweatShirt</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


                  </FormControl>
                  {/* <FormDescription>
        Enter colors as a comma-separated list (e.g., red, blue, green).
      </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField

              control={form.control}
              name="sizes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sizes</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter sizes separated by commas"
                      {...field}
                      value={field.value.join(",")} // Convert array to comma-separated string
                      onChange={(e) => field.onChange(e.target.value.split(",").map(size => size.trim()))}
                    />
                  </FormControl>
                  {/* <FormDescription>
        Enter sizes as a comma-separated list (e.g., XS, S, M, L).
      </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colors</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter colors separated by commas"
                      {...field}
                      value={field.value.join(",")} // Convert array to comma-separated string
                      onChange={(e) => field.onChange(e.target.value.split(",").map(color => color.trim()))}
                    />
                  </FormControl>
                  {/* <FormDescription>
        Enter colors as a comma-separated list (e.g., red, blue, green).
      </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />




            {/* Add image upload input */}
            <FormField
              control={form.control}
              name="images"
              render={() => (
                <FormItem>
                  <FormLabel>Upload Images</FormLabel>
                  <FormControl>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </FormControl>
                  {/* <FormDescription>
                You can upload multiple images here.
              </FormDescription> */}
                  <FormMessage />
                  {/* Display upload progress */}
                  <div className="mt-2">
                    {Object.entries(uploadProgress).map(([filename, progress]) => (
                      <div key={filename} className="mb-1">
                        <p>{filename}: {Math.round(progress)}%</p>
                        <div className="relative w-full bg-gray-200 rounded">
                          <div
                            className="absolute top-0 left-0 h-full bg-blue-600 rounded"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={submitting} className="w-full my-4">
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>

      </Card>
    </div>


  );
}

