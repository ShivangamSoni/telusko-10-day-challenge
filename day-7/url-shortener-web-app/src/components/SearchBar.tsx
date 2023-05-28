'use client';

import Image from 'next/image';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, InferType } from 'yup';

import BackIcon from '@/assets/back.svg';

const FormSchema = object({
  url: string()
    .required("Whoops, can't be empty")
    .url(
      'Not a Valid URL. Try something like: https://www.linkedin.com/in/shivangam-soni/',
    ),
});

type FormState = InferType<typeof FormSchema>;

export default function SearchBar({
  label,
  onSubmit,
}: {
  label: string;
  onSubmit: (url: string) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormState>({
    resolver: yupResolver(FormSchema),
  });

  function submitHandler({ url }: FormState) {
    onSubmit(url);
    reset(
      { url: '' },
      {
        keepErrors: false,
      },
    );
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="w-full bg-bg-bar py-3 px-6 rounded-full flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="w-4 aspect-square bg-bar-red rounded-full"></span>
          <span className="w-4 aspect-square bg-bar-yellow rounded-full"></span>
          <span className="w-4 aspect-square bg-bar-green rounded-full"></span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-5 bg-bar-white aspect-square p-0.5 rounded-sm shadow-sm">
            <Image src={BackIcon} alt="" />
          </span>
          <span className="w-5 bg-bar-white aspect-square p-0.5 rounded-sm shadow-sm rotate-180">
            <Image src={BackIcon} alt="" />
          </span>
        </div>

        <div className="flex-1 relative">
          <label htmlFor="url" className="sr-only">
            {label}
          </label>
          <input
            id="url"
            className="w-full rounded-full pl-8 px-4 py-1"
            placeholder="https://www.example.com/"
            {...register('url')}
          />
          <span className="absolute top-1/2 left-2 -translate-y-1/2 w-4 aspect-square bg-bar-blue rounded-full"></span>
          {errors.url && errors.url.message && (
            <span className="absolute left-0 top-full text-sm text-primary-red pl-8 py-1">
              {errors.url.message}
            </span>
          )}
        </div>
      </div>
    </form>
  );
}
