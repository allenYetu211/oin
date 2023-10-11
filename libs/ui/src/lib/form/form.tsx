/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-10-08 17:52:46
 * @LastEditTime: 2023-10-09 10:09:42
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/libs/ui/src/lib/form/form.tsx
 */
'use client';

import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  FieldValues,
} from 'react-hook-form';

enum GenderEnum {
  female = 'female',
  male = 'male',
  other = 'other',
}

interface IFormInput {
  firstName: String;
  gender: GenderEnum;
}

type FormProps<T extends FieldValues> = {
  children: ({ register }: { register: UseFormRegister<T> }) => JSX.Element;
  onHandleSubmit: (data: T) => void;
};

export const Form = <T extends FieldValues>({
  children,
  onHandleSubmit,
}: FormProps<T>) => {
  const { register, handleSubmit } = useForm<T>();
  const onSubmit: SubmitHandler<T> = onHandleSubmit;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {children({ register })}
      <button type="submit">Submit</button>
    </form>
  );
};
