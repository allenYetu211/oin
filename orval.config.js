/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-10-11 11:26:02
 * @LastEditTime: 2023-10-11 15:36:47
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/orval.config.js
 */
module.exports = {
  'petstore-file': {
    input: './openapi/Service.openapi.json',
    output: {
      target: './libs/request/src/lib/http.ts',
      override: {
        mutator: {
          path: './libs/request/src/lib/orval-request.ts',
          name: 'customInstance',
        },
      },

      // target: './openapi/petstore.ts',
      // override: {
      //   mutator: {
      //     path: './openapi/custom-instance.ts',
      //     name: 'customInstance',
      //   },
      // },

      // target: './openapi/request009.ts',
      // override: {
      //   mutator: {
      //     path: './openapi/request.ts',
      //     name: 'request',
      //   },
      // },
    },
  },
};
