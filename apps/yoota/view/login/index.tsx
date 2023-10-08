/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-10-08 16:50:39
 * @LastEditTime: 2023-10-08 18:45:27
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/yoota/view/login/index.tsx
 */

'use client';
import { Form, Card, Text, Button } from '@libs/ui';

interface LoginValuesTyps {
  username: string;
  password: string;
}

export const LoginView = () => {
  return (
    <div className="w-[300px] absolute right-[10%] top-[50%] -translate-y-[50%]">
      <Card
        className="min-h-[300px]"
        header={
          <div className="w-full justify-center items-center flex">
            <Text textColor="black" variant="h2">
              Oin
            </Text>
          </div>
        }
      >
        <Form<LoginValuesTyps>
          onHandleSubmit={(data) => {
            console.log('submit', data);
          }}
        >
          {({ register }) => (
            <div>
              <input {...register('username')} placeholder="username" />
              <input {...register('password')} placeholder="password" />
              <Button type="submit"> Submit </Button>
            </div>
          )}
        </Form>
      </Card>
    </div>
  );
};
