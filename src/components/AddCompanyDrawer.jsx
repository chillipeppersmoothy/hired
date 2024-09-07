/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { zodCompanySchema } from "../validations/zod";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Input } from "./ui/input";
import useFetch from "../hooks/useFetch";
import { addNewCompany } from "../api/apiCompanies";
import { BarLoader } from "react-spinners";
import { useEffect } from "react";

const AddCompanyDrawer = ({ fetchCompanies }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodCompanySchema),
  });

  const {
    fn: fnAddCompany,
    data: dataAddCompany,
    loading: loadingAddCompany,
    error: errorAddCompany,
  } = useFetch(addNewCompany);

  const onSubmit = (data) => {
    fnAddCompany({ ...data, logo: data.logo[0] });
  };

  useEffect(() => {
    if (dataAddCompany?.length > 0) {
      fetchCompanies();
    }
  }, [loadingAddCompany]);

  return (
    <Drawer>
      <DrawerTrigger>
        <Button type="button" size="sm" variant="secondary">
          Add Company
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add a new company</DrawerTitle>
        </DrawerHeader>

        <form className="flex gap-2 p-4 pb-0">
          <Input placeholder="Company name" {...register("name")} />
          <Input
            type="file"
            accept="image/*"
            className="file:text-gray-300"
            {...register("logo")}
          />
          <Button
            type="button"
            onClick={handleSubmit(onSubmit)}
            variant="blue"
            className="w-40"
          >
            Add
          </Button>
        </form>
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        {errors.logo && <p className="text-red-500">{errors.logo.message}</p>}
        {errorAddCompany?.message && (
          <p className="text-red-500">{errorAddCompany?.message}</p>
        )}

        {loadingAddCompany && (
          <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
        )}

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="destructive" type="button">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddCompanyDrawer;
