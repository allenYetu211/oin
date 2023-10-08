/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-10-08 11:11:31
 * @LastEditTime: 2023-10-08 16:31:17
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/yoota/app/page.tsx
 */
'use client';

import { Button, Text, Card } from '@libs/ui';

export default function Index() {
  return (
    <>
      <Card>
        <Button
          onClick={() => {
            console.log('button');
          }}
        >
          <Text>Button</Text>
        </Button>
      </Card>
    </>
  );
}
