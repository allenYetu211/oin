/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-10-08 16:50:39
 * @LastEditTime: 2023-10-11 15:41:04
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/yoota/view/login/index.tsx
 */

'use client';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, Text, Button } from '@libs/ui';
import { Input } from '@nextui-org/react';
import { useForm, SubmitHandler } from 'react-hook-form';
// import { request } from '@yoota/request';
import { postAuthLogin } from '@yoota/request';
import { useRequest, useUpdateEffect } from 'ahooks';
import { FC } from 'react';
import { setAuthOinState } from '@oin/store';

/**
 * ------------------------------------------------------------------------------------------
 * 视图
 * ------------------------------------------------------------------------------------------
 */
export const LoginView = () => {
  const { data, error, runAsync, loading } = useRequest(
    (submitdata) => {
      return postAuthLogin(submitdata);
    },

    {
      manual: true,
    }
  );

  //  提交登录表单
  const onFromSubmit = async (submitValue: IFormInput) => {
    await runAsync(submitValue);
  };

  useUpdateEffect(() => {
    console.log('useUpdateEffect data', data);
    if (201 === data?.statusCode) {
      setAuthOinState({
        'oin-token': data?.data.access_token,
      });
    }
  }, [data]);

  return (
    <div className="w-[300px] absolute right-[10%] top-[50%] -translate-y-[50%]">
      <Card
        className="min-h-[300px]"
        header={
          <div className="w-full justify-center items-center flex">
            <Text variant="h2">Oin</Text>
          </div>
        }
      >
        <FromLogin onFromSubmit={onFromSubmit} loading={loading} />
      </Card>
    </div>
  );
};

/**
 * ------------------------------------------------------------------------------------------
 * 账号密码 登录表单 提交验证
 * ------------------------------------------------------------------------------------------
 */

interface IFormInput {
  username: string;
  password: string;
}

const LoginSchema: ZodType<IFormInput> = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
});

type FormValues = 'username' | 'password';

const formScheme: {
  [key in FormValues]: string;
} = {
  username: 'informat2ion',
  password: 'all2en@xxx.com',
};

const FromLogin: FC<{
  loading: boolean;
  onFromSubmit: (data: IFormInput) => void;
}> = ({ onFromSubmit, loading }) => {
  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: formScheme,
    // @ts-ignore
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    onFromSubmit(data);
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          {...register('username')}
          size="sm"
          type="text"
          label="UserName"
          labelPlacement="inside"
          defaultValue={formScheme['username']}
        />
        {errors.username && <Text textColor="error">UserName is Emtry</Text>}
      </div>

      <div>
        <Input
          {...register('password')}
          size="sm"
          className="h-[40px]"
          label="Password"
          type="password"
          defaultValue={formScheme['password']}
        />
        {errors.password && <Text textColor="error">Password is Emtry</Text>}
      </div>

      <Button type="submit" isLoading={loading}>
        Submit
      </Button>
    </form>
  );
};
